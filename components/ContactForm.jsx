'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Alert,
  Checkbox,
  FormControlLabel,
  Card,
  CardContent,
  Stack,
  Box,
} from '@mui/material';
import { federationContacts } from '@/lib/contacts';

// Лимиты длины должны совпадать со схемой бекенда (backend/server.js)
const contactSchema = z.object({
  name: z
    .string().trim()
    .min(2, 'Имя должно содержать минимум 2 символа')
    .max(200, 'Имя не должно превышать 200 символов'),
  email: z.string().trim().email('Некорректный email адрес').max(320, 'Email слишком длинный'),
  phone: z.string().trim().max(50, 'Телефон не должен превышать 50 символов').refine(value => !value || (/^[+\d\s()-]+$/.test(value) && value.replace(/\D/g, '').length >= 10 && value.replace(/\D/g, '').length <= 15), 'Введите телефон: от 10 до 15 цифр').optional(),
  organization: z.string().trim().max(300, 'Название организации не должно превышать 300 символов').optional(),
  message: z
    .string().trim()
    .min(10, 'Сообщение должно содержать минимум 10 символов')
    .max(5000, 'Сообщение не должно превышать 5000 символов'),
  consent: z.boolean().refine((val) => val === true, 'Необходимо согласие на обработку данных'),
  website: z.string().optional(),
});

// Адрес бекенда форм; пустая строка = тот же домен (режим разработки)
const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

export default function ContactForm({ type = 'contact' }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      organization: '',
      message: '',
      consent: false,
      website: '',
    },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          type,
          consentVersion: '2026-09-11',
        }),
      });

      const result = await response.json().catch(() => null);
      if (response.ok && result?.success === true) {
        setSubmitStatus('success');
        reset();
      } else {
        setErrorMessage(response.status === 429 ? 'Слишком много попыток. Повторите отправку через 10 минут.' : `Не удалось отправить обращение. Попробуйте позже или напишите на ${federationContacts.email}.`);
        setSubmitStatus('error');
      }
    } catch {
      setErrorMessage(`Нет ответа от сервера. Проверьте соединение или напишите на ${federationContacts.email}.`);
      setSubmitStatus('error');
    } finally {
      clearTimeout(timeout);
      setIsSubmitting(false);
    }
  };

  const getFormTitle = () => {
    switch (type) {
      case 'partner':
        return 'Стать партнером';
      case 'join':
        return 'Вступить в федерацию';
      default:
        return 'Написать нам';
    }
  };

  return (
    <Card sx={{ scrollMarginTop: 100 }}>
      <CardContent sx={{ p: { xs: 3, md: 4 } }}>
        <Typography variant="h5" component="h2" color="primary" sx={{ fontWeight: 600, mb: 4 }}>
          {getFormTitle()}
        </Typography>

        {submitStatus === 'success' && (
          <Alert severity="success" sx={{ mb: 3 }}>
            Спасибо! Ваша заявка отправлена. Мы свяжемся с вами в ближайшее время.
          </Alert>
        )}

        {submitStatus === 'error' && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {errorMessage}
          </Alert>
        )}

        <form noValidate onSubmit={handleSubmit(onSubmit)} aria-busy={isSubmitting}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>Поля со звёздочкой обязательны. Телефон и организацию можно не указывать.</Typography>
          {/* Honeypot: люди поле не видят, боты заполняют — бекенд такие заявки отбрасывает */}
          <Controller
            name="website"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
              />
            )}
          />
          <Stack spacing={3}>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  ref={undefined}
                  inputRef={field.ref}
                  label="Имя"
                  autoComplete="name"
                  required
                  fullWidth
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              )}
            />

            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  ref={undefined}
                  inputRef={field.ref}
                  label="Email"
                  autoComplete="email"
                  type="email"
                  required
                  fullWidth
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              )}
            />

            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  ref={undefined}
                  inputRef={field.ref}
                  label="Телефон"
                  autoComplete="tel"
                  type="tel"
                  fullWidth
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
                />
              )}
            />

            <Controller
              name="organization"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  ref={undefined}
                  inputRef={field.ref}
                  label="Организация"
                  autoComplete="organization"
                  fullWidth
                  error={!!errors.organization}
                  helperText={errors.organization?.message}
                />
              )}
            />

            <Controller
              name="message"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  ref={undefined}
                  inputRef={field.ref}
                  label="Сообщение"
                  required
                  multiline
                  rows={5}
                  fullWidth
                  error={!!errors.message}
                  helperText={errors.message?.message}
                />
              )}
            />

            <Controller
              name="consent"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={<Checkbox name={field.name} inputRef={field.ref} onBlur={field.onBlur} onChange={(_, checked) => field.onChange(checked)} checked={field.value} slotProps={{ input: { 'aria-describedby': errors.consent ? 'consent-error' : undefined, 'aria-invalid': !!errors.consent } }} />}
                  label={
                    <Typography variant="body2">
                      Я даю согласие на{' '}
                      <a href="/consent" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>
                        обработку персональных данных
                      </a>{' '}
                      <span style={{ color: 'red' }}>*</span>
                    </Typography>
                  }
                />
              )}
            />
            {errors.consent && (
              <Typography id="consent-error" variant="caption" color="error" role="alert">
                {errors.consent.message}
              </Typography>
            )}

            <Box sx={{ color: 'text.secondary', fontSize: '.8rem' }}>Порядок работы с данными описан в <a href="/privacy" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>политике обработки персональных данных</a>.</Box>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Отправка...' : 'Отправить'}
            </Button>
          </Stack>
        </form>
      </CardContent>
    </Card>
  );
}

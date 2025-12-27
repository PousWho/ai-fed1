'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  Checkbox,
  FormControlLabel,
  Card,
  CardContent,
  Stack,
} from '@mui/material';

const contactSchema = z.object({
  name: z.string().min(2, 'Имя должно содержать минимум 2 символа'),
  email: z.string().email('Некорректный email адрес'),
  phone: z.string().optional(),
  organization: z.string().optional(),
  message: z.string().min(10, 'Сообщение должно содержать минимум 10 символов'),
  consent: z.boolean().refine((val) => val === true, 'Необходимо согласие на обработку данных'),
});

export default function ContactForm({ type = 'contact' }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('idle');

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
    },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          type,
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        reset();
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
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
        return 'Оставить заявку';
    }
  };

  return (
    <Card>
      <CardContent sx={{ p: 4 }}>
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
            Произошла ошибка при отправке формы. Пожалуйста, попробуйте еще раз.
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Имя"
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
                  label="Email"
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
                  label="Телефон"
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
                  label="Организация"
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
                  control={<Checkbox {...field} checked={field.value} />}
                  label={
                    <Typography variant="body2">
                      Я согласен на обработку персональных данных <span style={{ color: 'red' }}>*</span>
                    </Typography>
                  }
                />
              )}
            />
            {errors.consent && (
              <Typography variant="caption" color="error">
                {errors.consent.message}
              </Typography>
            )}

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

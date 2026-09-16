'use client';

import { vicePresidents } from '@/lib/leadership';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Box, Container, Typography, Card, CardContent, Grid, Stack, IconButton } from '@mui/material';
import PageIntro from '@/components/PageIntro';
import GradientText from '@/components/GradientText';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const fadeScale = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
};

function PartnersSlider() {
  // dark: true — у логотипа белая заливка (сделан для тёмной подложки),
  // на светлой карточке иначе становится невидимым.
  const partners = [
    { name: 'Автошкола Вектор', logo: '/partners/Vector.png', dark: true },
    { name: 'ММА Союз России', logo: '/partners/MMAUnionofRussia.png' },
    { name: 'Novikov', logo: '/partners/novikov.png', dark: true },
    { name: 'Praktikum', logo: '/partners/praktikum.png', dark: true },
    { name: 'Чемпион', logo: '/partners/Champion.png' },
    { name: 'ФЦБ', logo: '/partners/FCB.png' },
    { name: 'Газпром', logo: '/partners/Gazprom.png' },
    { name: 'Благотворительный фонд', logo: '/partners/CharitableFoundation.png' },
    { name: 'СИБИТ', logo: '/partners/СИБИТ_ЛОГОТИП.png' },
    { name: 'Партнер', logo: '/partners/logo.png' },
    { name: 'Партнер', logo: '/partners/logo-2.png' },
    { name: 'Партнер', logo: '/partners/logo-2-2.png' },
    { name: 'Партнер', logo: '/partners/logo-Photoroom.png' },
    { name: 'Партнер', logo: '/partners/MainLogo-ClWcpPWu.png', dark: true },
    { name: 'Партнер', logo: '/partners/__-____-07.png', dark: true },
  ];

  // Дублируем массив для бесконечного слайдера
  const duplicatedPartners = [...partners, ...partners];
  return (
    <Box sx={{ position: 'relative', overflow: 'hidden', width: '100%', py: 2 }}>
      <Box
        sx={{
          display: 'flex',
          gap: 3,
          width: 'fit-content',
          animation: 'partners-slide 45s linear infinite', // 45s = 3s на элемент * 15 элементов
        }}
      >
        {duplicatedPartners.map((partner, index) => (
          <Box
            key={index}
            sx={{
              minWidth: '250px',
              flexShrink: 0,
            }}
          >
            <Card
              sx={{
                height: '120px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                p: 2,
                bgcolor: partner.dark ? '#1a1d21 !important' : 'transparent',
                boxShadow: 'none',
                border: '1px solid',
                borderColor: 'divider',
                '&:hover': {
                  transform: 'none',
                  translateY: '0',
                  borderColor: 'primary.main',
                  backgroundColor: partner.dark ? '#1a1d21 !important' : 'transparent',
                },
              }}
            >
              <Box
                sx={{
                  width: '100%',
                  height: '100%',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  fill
                  style={{ objectFit: 'contain', padding: '16px' }}
                  unoptimized
                />
              </Box>
            </Card>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default function AboutPage() {
  const [currentCertificateIndex, setCurrentCertificateIndex] = useState(0);

  const whatWeDo = [
    'Разрабатываем и проводим образовательные программы',
    'Запускаем пилотные проекты',
    'Помогаем внедрять ИИ в организациях',
    'Объединяем экспертов, бизнес и государство',
    'Создаем и масштабируем технологические решения',
  ];

  const certificates = [
    {
      title: 'Благодарственное письмо за значительный вклад в реализацию проекта «Коик»',
      image: '/certificates/Cert 0-cropped.png',
    },
    {
      title: 'Благодарность за помощь в организации и проведении ИТ-кубка «ПроТехно»',
      image: '/certificates/Cert 21.png',
    },
    {
      title: 'Сертификат конференции «Искусственный интеллект и общество» за доклад «Вайбкодинг в образовании»',
      image: '/certificates/Cert 22.png',
    },
    {
      title: 'Благодарность за разработку программы по внедрению ИИ и нейросетей в профсоюзную работу',
      image: '/certificates/Cert 1.png',
    },
    {
      title: 'Благодарность за сотрудничество, способствующее активной поддержке предпринимательства в Алтайском крае',
      image: '/certificates/Cert 2-cropped.png',
    },
    {
      title: 'Благодарность за проведение образовательного блока на "Школе лидера" от "Движение первых"',
      image: '/certificates/Cert 3.png',
    },
    {
      title: 'Благодарность за помощь в подготовке и проведении мероприятия "Марафон с наставником 4.0"',
      image: '/certificates/Cert 4.png',
    },
    {
      title: 'Благодарность за помощь в организации и проведении регионального форума "Мой бизнес 2024"',
      image: '/certificates/Cert 5.png',
    },
    {
      title: 'Благодарность за участие в ежегодной конференции и выставке "TechWeek 2021"',
      image: '/certificates/Cert 6.png',
    },
    {
      title: 'Благодарность за выступление на образовательной площадке "Искусственный интеллект" фестиваля "Ягель"',
      image: '/certificates/Cert 7.png',
    },
    {
      title: 'Благодарность за высокий профессионализм и плодотворное сотрудничество с ООО "Ваш Бизнес Помощник"',
      image: '/certificates/Cert 8.png',
    },
    {
      title: 'Благодарность за плодотворное сотрудничество и вклад в развитие предпринимательства в стране',
      image: '/certificates/Cert 9.png',
    },
    {
      title: 'Сертификат об участии в конференции и выставке "TechWeek 2024"',
      image: '/certificates/Cert 10.png',
    },
    {
      title: 'Благодарность за участие в конференции "TechWeek 2024"',
      image: '/certificates/Cert 11.png',
    },
    {
      title: 'Сертификат об участии в качестве экспонента конференции "TechWeek 2024"',
      image: '/certificates/Cert 12.png',
    },
    {
      title: 'CEO Агентство искусственного интеллекта «AIMY»',
      image: '/certificates/Cert 13.png',
    },
    {
      title: 'Обладатели золотой медали международного выставочного центра «Интерсиб» 2025',
      image: '/certificates/Cert 14.png',
    },
    {
      title: 'Призеры международного фестиваля «Старт в науку» 2025',
      image: '/certificates/Cert 15.png',
    },
    {
      title: 'Президент Федерации искусственного интеллекта',
      image: '/certificates/Cert 16.png',
    },
    {
      title: 'Призеры хакатона 2025 среди 100 команд 2 место',
      image: '/certificates/Cert 17.png',
    },
    {
      title: 'Сертификат участника I-й волны Марафона цифровых решений 2025',
      image: '/certificates/Cert 18.png',
    },
    {
      title: 'Благодарность за вклад в программу «Искусственный интеллект: внедрение и управление»',
      image: '/certificates/Cert 19.png',
    },
    {
      title: 'Благодарность за организацию образовательной платформы «Искусственный интеллект в образовании»',
      image: '/certificates/Cert 20.png',
    },
  ];

  const currentCertificate = certificates[currentCertificateIndex];

  const handleNext = () => {
    setCurrentCertificateIndex((prev) => (prev + 1) % certificates.length);
  };

  const handlePrev = () => {
    setCurrentCertificateIndex((prev) => (prev - 1 + certificates.length) % certificates.length);
  };

  const formatWork = [
    'Программы',
    'Проекты',
    'Пилоты',
    'Образовательные треки',
    'Соревнования и мероприятия',
  ];

  const howWeWork = [
    'Через практику',
    'Через реальные кейсы',
    'Через совместные проекты',
    'Через обучение и сопровождение',
  ];

  return (
    <Box sx={{ width: '100%', pt: 2 }}>
      <Container maxWidth="lg"><PageIntro visual="about" title="О Федерации" description="Объединяем бизнес, разработчиков, науку и образование для практического развития искусственного интеллекта в России." /></Container>

      {/* Миссия */}
      <Box sx={{ width: '100%', pt: { xs: 9, md: 14 }, pb: { xs: 5, md: 7 }, display: 'flex', justifyContent: 'center' }}>
        <Container maxWidth="md">
          <motion.div
            initial="hidden" 
            whileInView="visible" 
            variants={fadeUp} 
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <Card>
              <CardContent sx={{ p: 4, textAlign: 'center' }}>
                <Typography variant="h4" color="primary" sx={{ fontWeight: 600, mb: 2 }}>Миссия</Typography>
                <Typography variant="body1" color="text.secondary">
                  Создавать условия, в которых искусственный интеллект становится рабочим инструментом для развития экономики, образования и общества.
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Container>
      </Box>

      {/* Что мы делаем */}
      <Box sx={{ width: '100%', py: { xs: 4, md: 6 }, display: 'flex', justifyContent: 'center' }}>
        <Container maxWidth="lg">
          <motion.div
            initial="hidden" 
            whileInView="visible" 
            variants={fadeUp} 
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <GradientText variant="h3" component="h2" sx={{ display: 'block', textAlign: 'center', mb: { xs: 5, md: 7 } }}>Что мы делаем</GradientText>
          </motion.div>
          <Stack spacing={2} sx={{ maxWidth: '700px', mx: 'auto' }}>
              {whatWeDo.map((item, index) => (
              <motion.div
                  key={index} 
                  initial="hidden" 
                  whileInView="visible" 
                  variants={fadeUp} 
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1], delay: index * 0.1 }}
                >
                <Card>
                  <CardContent sx={{ p: 2, display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                    <CheckCircleIcon color="primary" sx={{ mt: 0.5 }} />
                    <Typography variant="body1">{item}</Typography>
                  </CardContent>
                </Card>
              </motion.div>
              ))}
          </Stack>
        </Container>
      </Box>

      {/* Формат работы */}
      <Box sx={{ width: '100%', py: { xs: 4, md: 6 }, display: 'flex', justifyContent: 'center' }}>
        <Container maxWidth="xl">
          <motion.div
            initial="hidden" 
            whileInView="visible" 
            variants={fadeUp} 
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <GradientText variant="h3" component="h2" sx={{ display: 'block', textAlign: 'center', mb: { xs: 5, md: 7 } }}>Формат работы</GradientText>
          </motion.div>
          <Grid container spacing={3} justifyContent="center">
              {formatWork.map((item, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                <motion.div
                  variants={fadeScale}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1], delay: index * 0.15 }}
                >
                  <Card sx={{ textAlign: 'center', height: '100%' }}>
                    <CardContent sx={{ p: 3 }}>
                      <Typography variant="h6" sx={{ fontWeight: 500 }}>{item}</Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
              ))}
          </Grid>
        </Container>
      </Box>

      {/* Как мы работаем */}
      <Box sx={{ width: '100%', py: { xs: 4, md: 6 }, display: 'flex', justifyContent: 'center' }}>
        <Container maxWidth="xl">
          <motion.div
            initial="hidden" 
            whileInView="visible" 
            variants={fadeUp} 
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <GradientText variant="h3" component="h2" sx={{ display: 'block', textAlign: 'center', mb: { xs: 5, md: 7 } }}>Как мы работаем</GradientText>
          </motion.div>
          <Grid container spacing={3} justifyContent="center">
              {howWeWork.map((item, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                <motion.div
                  variants={fadeScale}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1], delay: index * 0.15 }}
                >
                  <Card sx={{ textAlign: 'center', height: '100%' }}>
                    <CardContent sx={{ p: 3 }}>
                      <Typography variant="h6" sx={{ fontWeight: 500 }}>{item}</Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
              ))}
          </Grid>
        </Container>
      </Box>

      {/* Президент федерации */}
      <Box sx={{ width: '100%', pt: { xs: 4, md: 6 }, pb: { xs: 9, md: 12 }, display: 'flex', justifyContent: 'center' }}>
        <Container maxWidth="lg">
          <Box sx={{ mb: { xs: 5, md: 7 } }}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={fadeUp}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <GradientText variant="h3" component="h2" sx={{ display: 'block', textAlign: 'center' }}>Президент федерации</GradientText>
            </motion.div>
          </Box>
          <motion.div
            initial="hidden" 
            whileInView="visible" 
            variants={fadeScale} 
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            sx={{ mt: { xs: 4, md: 6 } }}
          >
            <Card sx={{ 
              backgroundColor: '#ffffff !important',
              color: '#212529 !important',
              '& .MuiTypography-root': {
                color: 'inherit !important',
              },
              '& .MuiTypography-body1, & .MuiTypography-body2, & .MuiTypography-h1, & .MuiTypography-h2, & .MuiTypography-h3, & .MuiTypography-h4, & .MuiTypography-h5, & .MuiTypography-h6': {
                color: 'inherit !important',
              },
              '& [class*="MuiTypography-colorPrimary"]': {
                color: 'primary.main !important',
              },
              '& [class*="MuiTypography-colorSecondary"]': {
                color: 'text.secondary !important',
              },
              '&:hover': { 
                transform: 'none !important',
                translateY: '0 !important',
                boxShadow: '0 4px 16px rgba(0, 86, 179, 0.1), 0 2px 8px rgba(0, 0, 0, 0.05) !important',
                backgroundColor: '#ffffff !important',
                borderColor: 'rgba(0, 86, 179, 0.2) !important',
                '& .MuiTypography-root': {
                  color: 'inherit !important',
                },
              } 
            }}>
              <Box sx={{ display: { xs: 'block', md: 'flex' } }}>
                <Box 
                  sx={{ 
                    width: { xs: '100%', md: '40%' },
                    bgcolor: 'grey.200',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: 4,
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  <Box
                    sx={{
                      width: { xs: 280, md: 350 },
                      height: { xs: 280, md: 350 },
                      position: 'relative',
                      borderRadius: 2,
                      overflow: 'hidden',
                      border: '4px solid',
                      borderColor: 'primary.main',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                    }}
                  >
                    <Image
                      src="/president.jpeg"
                      alt="Юрий Головко - Президент федерации"
                      fill
                      style={{ objectFit: 'cover' }}
                      priority
                    />
                  </Box>
                </Box>
                <Box sx={{ width: { xs: '100%', md: '60%' }, p: 4 }}>
                  <Typography 
                    variant="h4" 
                    sx={{ 
                      fontWeight: 700, 
                      mb: 3,
                      textAlign: { xs: 'center', md: 'left' },
                      color: 'primary.main'
                    }}
                  >
                    Юрий Головко
                  </Typography>
                  <Stack spacing={2} sx={{ mb: 4 }}>
                    <Typography 
                      variant="body1" 
                      color="text.secondary"
                      sx={{ textAlign: { xs: 'center', md: 'left' } }}
                    >
                      <strong>Предприниматель и практик.</strong>
                    </Typography>
                    <Typography 
                      variant="body1" 
                      color="text.secondary"
                      sx={{ textAlign: { xs: 'center', md: 'left' } }}
                    >
                      Эксперт в области искусственного интеллекта, автоматизации и цифровых решений.
                    </Typography>
                    <Typography 
                      variant="body1" 
                      color="text.secondary"
                      sx={{ textAlign: { xs: 'center', md: 'left' } }}
                    >
                      Опыт запуска и масштабирования международных проектов, работы с бизнесом, государством и образовательными организациями.
                    </Typography>
                  </Stack>
                  <Card 
                    sx={{ 
                      bgcolor: '#ffffff !important',
                      border: '1px solid',
                      borderColor: 'primary.200',
                      p: 3,
                      color: '#212529 !important',
                      '& .MuiTypography-root': {
                        color: 'inherit !important',
                      },
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.02)',
                        boxShadow: '0 8px 24px rgba(0, 57, 166, 0.15)',
                        backgroundColor: '#ffffff !important',
                        '& .MuiTypography-root': {
                          color: 'inherit !important',
                        },
                      }
                    }}
                  >
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        fontStyle: 'italic',
                        color: 'text.primary',
                        textAlign: { xs: 'center', md: 'left' }
                      }}
                    >
                      «Федерация для меня — это не формальность, а инструмент реальных изменений, точка сборки людей, идей и технологий, которые двигают страну вперед.»
                    </Typography>
                  </Card>
                </Box>
              </Box>
            </Card>
          </motion.div>
        </Container>
      </Box>

      {/* Руководство Федерации */}
      <Box sx={{ width: '100%', pt: { xs: 8, md: 10 }, pb: { xs: 4, md: 6 }, display: 'flex', justifyContent: 'center' }}>
        <Container maxWidth="lg">
          <Box sx={{ mb: { xs: 5, md: 7 } }}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={fadeUp}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <GradientText variant="h3" component="h2" sx={{ display: 'block', textAlign: 'center' }}>
                Руководство Федерации
              </GradientText>
            </motion.div>
          </Box>
          <Grid container spacing={4} justifyContent="center">
            {vicePresidents.map((person, index) => (
              <Grid size={{ xs: 12, sm: 8, md: 6 }} key={person.name}>
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  variants={fadeScale}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1], delay: index * 0.15 }}
                >
                  <Card
                    sx={{
                      height: '100%',
                      textAlign: 'center',
                      p: 3,
                      backgroundColor: '#ffffff !important',
                      color: '#212529 !important',
                      '& .MuiTypography-root': { color: 'inherit !important' },
                      '&:hover': {
                        transform: 'none !important',
                        backgroundColor: '#ffffff !important',
                        '& .MuiTypography-root': { color: 'inherit !important' },
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: 160,
                        height: 160,
                        mx: 'auto',
                        mb: 3,
                        position: 'relative',
                        borderRadius: '50%',
                        overflow: 'hidden',
                        border: '3px solid',
                        borderColor: 'primary.main',
                      }}
                    >
                      <Image src={person.photo} alt={person.name} fill style={{ objectFit: 'cover' }} />
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: 'primary.main !important' }}>
                      {person.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#6c757d !important' }}>
                      {person.role}
                    </Typography>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Наши партнёры */}
      <Box sx={{ width: '100%', py: { xs: 4, md: 6 }, display: 'flex', justifyContent: 'center' }}>
        <Container maxWidth="lg">
          <Box sx={{ mb: { xs: 5, md: 7 } }}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={fadeUp}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <GradientText variant="h3" component="h2" sx={{ display: 'block', textAlign: 'center' }}>
                Наши партнёры
              </GradientText>
            </motion.div>
          </Box>
          <PartnersSlider />
        </Container>
      </Box>

      {/* Сертификаты и благодарности */}
      <Box sx={{ width: '100%', py: { xs: 4, md: 6 }, display: 'flex', justifyContent: 'center' }}>
        <Container maxWidth="lg">
          <Box sx={{ mb: { xs: 5, md: 7 } }}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={fadeUp}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <GradientText variant="h3" component="h2" sx={{ display: 'block', textAlign: 'center' }}>
                Сертификаты и благодарности
              </GradientText>
            </motion.div>
          </Box>
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeScale}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <Card sx={{ 
              position: 'relative', 
              overflow: 'hidden',
              '&:hover': {
                transform: 'none',
                translateY: '0',
              }
            }}>
              <Box sx={{ position: 'relative', width: '100%', minHeight: { xs: '350px', md: '500px' }, display: 'flex', alignItems: 'center', justifyContent: 'center', p: { xs: 2, md: 4 } }}>
                {/* Кнопка назад */}
                <IconButton
                  aria-label="Предыдущая награда"
                  onClick={handlePrev}
                  sx={{
                    position: 'absolute',
                    left: { xs: 8, md: 16 },
                    top: '50%',
                    transform: 'translateY(-50%)',
                    zIndex: 2,
                    bgcolor: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(10px)',
                    '&:hover': {
                      bgcolor: 'rgba(255, 255, 255, 1)',
                    },
                  }}
                >
                  <ArrowBackIosIcon />
                </IconButton>

                {/* Изображение сертификата */}
                <Box
                  sx={{
                    width: '100%',
                    maxWidth: '800px',
                    height: { xs: '300px', md: '500px' },
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Box
                    sx={{
                      width: '100%',
                      height: '100%',
                      position: 'relative',
                      borderRadius: 2,
                      overflow: 'hidden',
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                      bgcolor: 'grey.100',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Image
                      src={currentCertificate.image}
                      alt={currentCertificate.title}
                      fill
                      style={{ objectFit: 'contain' }}
                      unoptimized
                    />
                  </Box>
                </Box>

                {/* Кнопка вперед */}
                <IconButton
                  aria-label="Следующая награда"
                  onClick={handleNext}
                  sx={{
                    position: 'absolute',
                    right: { xs: 8, md: 16 },
                    top: '50%',
                    transform: 'translateY(-50%)',
                    zIndex: 2,
                    bgcolor: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(10px)',
                    '&:hover': {
                      bgcolor: 'rgba(255, 255, 255, 1)',
                    },
                  }}
                >
                  <ArrowForwardIosIcon />
                </IconButton>
              </Box>

              {/* Описание */}
              <CardContent sx={{ textAlign: 'center', pt: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, minHeight: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', px: 2 }}>
                  {currentCertificate.title}
                </Typography>
                
                {/* Индикаторы точек */}
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                  {certificates.map((_, index) => (
                    <Box
                      key={index}
                      component="button"
                      type="button"
                      aria-label={`Показать награду ${index + 1}`}
                      aria-pressed={index === currentCertificateIndex}
                      onClick={() => setCurrentCertificateIndex(index)}
                      sx={{
                        width: 10,
                        height: 10,
                        borderRadius: '50%',
                        bgcolor: index === currentCertificateIndex ? 'primary.main' : 'grey.400',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          bgcolor: index === currentCertificateIndex ? 'primary.dark' : 'grey.600',
                          transform: 'scale(1.2)',
                        },
                      }}
                    />
                  ))}
                </Box>
                
                <Typography variant="body2" color="text.secondary">
                  {currentCertificateIndex + 1} / {certificates.length}
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Container>
      </Box>
    </Box>
  );
}

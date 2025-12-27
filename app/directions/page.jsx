'use client';

import { motion } from 'framer-motion';
import { Box, Container, Typography, Card, CardContent, Grid } from '@mui/material';
import GradientText from '@/components/GradientText';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const fadeScale = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
};

export default function DirectionsPage() {
  const directions = [
    {
      title: 'Образование',
      description: 'Мы обучаем не теории, а тому, как ИИ реально помогает в работе. Программы адаптированы под разный уровень подготовки и задачи.',
      icon: '🎓',
    },
    {
      title: 'Бизнес',
      description: 'Помогаем компаниям находить точки применения ИИ, запускать пилоты и получать результат.',
      icon: '💼',
    },
    {
      title: 'Государство и регионы',
      description: 'Сопровождаем цифровые проекты, готовим специалистов, помогаем выстраивать долгосрочные программы развития.',
      icon: '🏛️',
    },
    {
      title: 'Мероприятия',
      description: 'Проводим форумы, хакатоны, турниры и интенсивы, где участники работают с реальными задачами.',
      icon: '📅',
    },
  ];

  return (
    <Box sx={{ width: '100%', pt: 2 }}>
      {/* Заголовок */}
      <Box sx={{ width: '100%', py: 10, display: 'flex', justifyContent: 'center' }}>
        <Container maxWidth="lg">
          <motion.div
            initial="hidden" 
            whileInView="visible" 
            variants={fadeUp} 
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <GradientText variant="h2" component="h1" sx={{ display: 'block', textAlign: 'center' }}>Направления деятельности</GradientText>
          </motion.div>
        </Container>
      </Box>

      {/* Направления */}
      <Box sx={{ width: '100%', py: 10, display: 'flex', justifyContent: 'center' }}>
        <Container maxWidth="xl">
          <Grid container spacing={3} justifyContent="center">
            {directions.map((direction, index) => (
              <Grid item xs={12} md={6} key={index}>
                <motion.div
                  variants={fadeScale}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1], delay: index * 0.15 }}
                >
                  <Card sx={{ height: '100%', textAlign: 'center' }}>
                    <CardContent sx={{ p: 4 }}>
                      <Typography variant="h2" sx={{ mb: 2 }}>{direction.icon}</Typography>
                      <Typography variant="h5" component="h2" color="primary" sx={{ fontWeight: 600, mb: 2 }}>
                        {direction.title}
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        {direction.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}

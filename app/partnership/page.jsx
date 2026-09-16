'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Box, Container, Typography, Card, CardContent, Grid, Stack, List, ListItem, ListItemText, Button } from '@mui/material';
import PageIntro from '@/components/PageIntro';
import GradientText from '@/components/GradientText';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const fadeScale = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
};

export default function PartnershipPage() {
  const formats = [
    {
      title: 'Образовательное партнерство',
      description: 'Совместные программы обучения, обмен экспертизой, развитие образовательных проектов',
    },
    {
      title: 'Технологическое партнерство',
      description: 'Разработка и внедрение решений, совместные технологические проекты',
    },
    {
      title: 'Региональные проекты',
      description: 'Развитие цифровой инфраструктуры регионов, поддержка местных инициатив',
    },
    {
      title: 'Информационное сотрудничество',
      description: 'Обмен опытом, публикации, участие в мероприятиях и конференциях',
    },
  ];

  const benefits = [
    'Доступ к экспертизе',
    'Участие в проектах',
    'Развитие имиджа',
    'Подготовку кадров',
    'Совместные продукты и программы',
  ];

  return (
    <Box sx={{ width: '100%', pt: 2 }}>
      <Container maxWidth="lg"><PageIntro visual="partnership" title="Партнёрство" description="Соединяем экспертизу, технологии и инициативы. Открыты к совместным программам и проектам." /></Container>

      {/* Форматы партнерства */}
      <Box sx={{ width: '100%', py: { xs: 4, md: 6 }, display: 'flex', justifyContent: 'center' }}>
        <Container maxWidth="xl">
          <motion.div
            initial="hidden" 
            whileInView="visible" 
            variants={fadeUp} 
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <GradientText variant="h3" component="h2" sx={{ display: 'block', textAlign: 'center', mb: 5 }}>Форматы партнерства</GradientText>
          </motion.div>
          <Grid container spacing={3} justifyContent="center">
            {formats.map((format, index) => (
              <Grid size={{ xs: 12, md: 6 }} key={index}>
                <motion.div
                  variants={fadeScale}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1], delay: index * 0.15 }}
                >
                  <Card sx={{ height: '100%' }}>
                    <CardContent sx={{ p: 3, textAlign: 'center' }}>
                      <Typography variant="h6" component="h3" color="primary" sx={{ fontWeight: 600, mb: 2 }}>
                        {format.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {format.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Партнеры получают */}
      <Box sx={{ width: '100%', py: { xs: 4, md: 6 }, display: 'flex', justifyContent: 'center' }}>
        <Container maxWidth="md">
          <motion.div
            initial="hidden" 
            whileInView="visible" 
            variants={fadeUp} 
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <GradientText variant="h3" component="h2" sx={{ display: 'block', textAlign: 'center', mb: 5 }}>Партнеры получают</GradientText>
          </motion.div>
          <Card sx={{ maxWidth: '600px', mx: 'auto' }}>
            <CardContent sx={{ p: 4 }}>
              <List>
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial="hidden" 
                    whileInView="visible" 
                    variants={fadeUp} 
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1], delay: index * 0.1 }}
                  >
                    <ListItem sx={{ justifyContent: 'center', py: 1 }}>
                      <CheckCircleIcon color="primary" sx={{ mr: 2 }} />
                      <ListItemText 
                        primary={benefit}
                        primaryTypographyProps={{
                          variant: 'body1',
                        }}
                      />
                    </ListItem>
                  </motion.div>
                ))}
              </List>
            </CardContent>
          </Card>
        </Container>
      </Box>

      {/* CTA */}
      <Box sx={{ width: '100%', py: { xs: 4, md: 6 }, display: 'flex', justifyContent: 'center' }}>
        <Container maxWidth="lg">
          <motion.div
            initial="hidden" 
            whileInView="visible" 
            variants={fadeUp} 
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <Box sx={{ textAlign: 'center' }}>
              <Link href="/contacts?type=partner" style={{ textDecoration: 'none' }}>
                <Button variant="contained" color="primary" size="large">
                  Стать партнером
                </Button>
              </Link>
            </Box>
          </motion.div>
        </Container>
      </Box>
    </Box>
  );
}

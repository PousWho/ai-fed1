'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Box, Container, Typography, Card, CardContent, Grid, Stack, Link as MuiLink } from '@mui/material';
import Link from 'next/link';
import ContactForm from '@/components/ContactForm';
import GradientText from '@/components/GradientText';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const fadeScale = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
};

function ContactsContent() {
  const searchParams = useSearchParams();
  const type = searchParams.get('type');

  const formType = type === 'partner' ? 'partner' : type === 'join' ? 'join' : 'contact';

  return (
    <Box sx={{ width: '100%', pt: 2 }}>
      {/* Заголовок */}
      <Box sx={{ width: '100%', py: 10, display: 'flex', justifyContent: 'center' }}>
        <Container maxWidth="lg">
          <Stack spacing={3} sx={{ textAlign: 'center' }}>
            <motion.div
              initial="hidden" 
              whileInView="visible" 
              variants={fadeUp} 
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <GradientText variant="h2" component="h1">Контакты</GradientText>
            </motion.div>
            <motion.div
              initial="hidden" 
              whileInView="visible" 
              variants={fadeUp} 
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
            >
              <Card sx={{ maxWidth: '600px', mx: 'auto' }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="body1" sx={{ color: (theme) => theme.palette.mode === 'light' ? '#212529' : 'text.secondary', mb: 2, fontWeight: 500 }}>
                    Свяжитесь с нами, если вы:
                  </Typography>
                  <Stack spacing={1}>
                    <Typography variant="body2" sx={{ color: (theme) => theme.palette.mode === 'light' ? '#212529' : 'text.secondary' }}>• хотите стать партнером</Typography>
                    <Typography variant="body2" sx={{ color: (theme) => theme.palette.mode === 'light' ? '#212529' : 'text.secondary' }}>• заинтересованы в проектах</Typography>
                    <Typography variant="body2" sx={{ color: (theme) => theme.palette.mode === 'light' ? '#212529' : 'text.secondary' }}>• планируете внедрение ИИ</Typography>
                    <Typography variant="body2" sx={{ color: (theme) => theme.palette.mode === 'light' ? '#212529' : 'text.secondary' }}>• ищете образовательные программы</Typography>
                  </Stack>
                </CardContent>
              </Card>
            </motion.div>
          </Stack>
        </Container>
      </Box>

      {/* Контент */}
      <Box sx={{ width: '100%', py: 10, display: 'flex', justifyContent: 'center' }}>
        <Container maxWidth="xl">
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} lg={5}>
              <motion.div
                initial="hidden" 
                whileInView="visible" 
                variants={fadeScale} 
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <Card>
                  <CardContent sx={{ p: 4 }}>
                    <Typography variant="h5" component="h2" color="primary" sx={{ fontWeight: 600, mb: 4, textAlign: 'center' }}>
                      Контактная информация
                    </Typography>
                    <Stack spacing={3}>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                          Email:
                        </Typography>
                        <MuiLink href="mailto:ceo@aimy.expert" color="primary" underline="hover">
                          ceo@aimy.expert
                        </MuiLink>
                      </Box>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                          Социальные сети:
                        </Typography>
                        <Stack direction="row" spacing={3} justifyContent="center">
                          <MuiLink href="http://t.me/Gyurik5" target="_blank" rel="noopener noreferrer" color="primary" underline="hover">Telegram</MuiLink>
                          <MuiLink href="https://vk.com/yurigolovko" target="_blank" rel="noopener noreferrer" color="primary" underline="hover">VK</MuiLink>
                        </Stack>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>

            <Grid item xs={12} lg={5}>
              <motion.div
                initial="hidden" 
                whileInView="visible" 
                variants={fadeScale} 
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
              >
                <ContactForm type={formType} />
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}

export default function ContactsPage() {
  return (
    <Suspense fallback={<Box sx={{ minHeight: '100vh', py: 12, px: 4, textAlign: 'center' }}>Загрузка...</Box>}>
      <ContactsContent />
    </Suspense>
  );
}

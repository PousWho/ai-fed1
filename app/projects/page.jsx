'use client';

import { motion } from 'framer-motion';
import { Box, Container, Typography, Card, CardContent, Grid, Stack } from '@mui/material';
import GradientText from '@/components/GradientText';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const fadeScale = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
};

const projects = [
  {
    id: '1',
    name: 'Образовательная платформа ИИ',
    problem: 'Недостаток практических навыков работы с ИИ у студентов и преподавателей',
    target: 'Студенты, преподаватели, образовательные учреждения',
    result: 'Повышение уровня компетенций, готовность к работе с ИИ-инструментами',
  },
  {
    id: '2',
    name: 'Система автоматизации бизнес-процессов',
    problem: 'Ручная обработка больших объемов данных и документов',
    target: 'Средний и крупный бизнес',
    result: 'Сокращение времени на обработку данных на 60-80%, снижение ошибок',
  },
];

export default function ProjectsPage() {
  return (
    <Box sx={{ width: '100%', pt: 2 }}>
      {/* Заголовок */}
      <Box sx={{ width: '100%', py: 10, display: 'flex', justifyContent: 'center' }}>
        <Container maxWidth="lg">
          <Stack spacing={2} sx={{ textAlign: 'center' }}>
            <motion.div
              initial="hidden" 
              whileInView="visible" 
              variants={fadeUp} 
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <GradientText variant="h2" component="h1">Продукты и проекты</GradientText>
            </motion.div>
            <motion.div
              initial="hidden" 
              whileInView="visible" 
              variants={fadeUp} 
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
            >
              <Typography variant="body1" sx={{ color: (theme) => theme.palette.mode === 'light' ? '#212529' : 'text.secondary' }}>
                Мы создаем и развиваем собственные решения в области ИИ и автоматизации. 
                Каждый проект — это ответ на конкретную задачу.
              </Typography>
            </motion.div>
            <motion.div
              initial="hidden" 
              whileInView="visible" 
              variants={fadeUp} 
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.3 }}
            >
              <Typography variant="body2" sx={{ color: (theme) => theme.palette.mode === 'light' ? '#212529' : 'text.secondary', fontStyle: 'italic' }}>
                Раздел постоянно пополняется новыми кейсами и продуктами.
              </Typography>
            </motion.div>
          </Stack>
        </Container>
      </Box>

      {/* Проекты */}
      <Box sx={{ width: '100%', py: 10, display: 'flex', justifyContent: 'center' }}>
        <Container maxWidth="xl">
          <Grid container spacing={3} justifyContent="center">
            {projects.map((project, index) => (
              <Grid item xs={12} lg={6} key={project.id}>
                <motion.div
                  variants={fadeScale}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1], delay: index * 0.2 }}
                >
                  <Card sx={{ height: '100%' }}>
                    <CardContent sx={{ p: 4 }}>
                      <Typography variant="h4" component="h2" color="primary" sx={{ fontWeight: 600, mb: 4, textAlign: 'center' }}>
                        {project.name}
                      </Typography>
                      <Stack spacing={3}>
                        <Box>
                          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1, textAlign: 'center' }}>
                            Какую проблему решает:
                          </Typography>
                          <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center' }}>
                            {project.problem}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1, textAlign: 'center' }}>
                            Для кого предназначен:
                          </Typography>
                          <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center' }}>
                            {project.target}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1, textAlign: 'center' }}>
                            Какой результат дает:
                          </Typography>
                          <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center' }}>
                            {project.result}
                          </Typography>
                        </Box>
                      </Stack>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>

          {projects.length === 0 && (
            <motion.div
              initial="hidden" 
              whileInView="visible" 
              variants={fadeUp} 
              viewport={{ once: true }}
            >
              <Box sx={{ textAlign: 'center', py: 6 }}>
                <Typography variant="body1" color="text.secondary">
                  Проекты будут добавлены в ближайшее время
                </Typography>
              </Box>
            </motion.div>
          )}
        </Container>
      </Box>
    </Box>
  );
}

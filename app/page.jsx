'use client';

import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Card, 
  CardContent, 
  Grid,
  Stack
} from '@mui/material';
import { 
  FaBrain, FaCodeBranch, FaGlobe, FaUsers, FaBox,
  FaUniversity, FaSchool, FaBuilding, FaRoute, FaUserGraduate 
} from "react-icons/fa";
import GradientText from "@/components/GradientText";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
  },
};

const fadeScale = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
  },
};

export default function Home() {
  const directions = [
    { icon: <FaBrain size={30}/>, title: 'Образование', description: 'Практические программы по ИИ и цифровым навыкам для школьников, студентов, преподавателей и управленцев.' },
    { icon: <FaCodeBranch size={30}/>, title: 'Внедрение', description: 'Помогаем организациям внедрять ИИ в рабочие процессы — от аналитики и продаж до управления и поддержки.' },
    { icon: <FaGlobe size={30}/>, title: 'Регионы', description: 'Поддержка цифрового развития территорий, запуск пилотов, подготовка специалистов.' },
    { icon: <FaUsers size={30}/>, title: 'Кадры', description: 'Формирование кадрового резерва и подготовка специалистов нового поколения.' },
    { icon: <FaBox size={30}/>, title: 'Продукты', description: 'Разработка и тиражирование собственных платформ и решений.' },
  ];

  const targetAudience = [
    { icon: <FaUniversity size={28}/>, title: 'Государству', description: 'Методическая поддержка, кадры, цифровые проекты и пилоты.' },
    { icon: <FaSchool size={28}/>, title: 'Образованию', description: 'Современные программы, инструменты и практики для преподавателей и студентов.' },
    { icon: <FaBuilding size={28}/>, title: 'Бизнесу', description: 'Решения, которые дают измеримый результат и экономию времени.' },
    { icon: <FaRoute size={28}/>, title: 'Регионам', description: 'Экосистемный подход к развитию ИИ и цифровых компетенций.' },
    { icon: <FaUserGraduate size={28}/>, title: 'Молодежи', description: 'Навыки, которые реально пригодятся в профессии и жизни.' },
  ];

  return (
    <Box sx={{ width: '100%' }}>
      {/* Первый экран */}
      <motion.section 
        initial="hidden" 
        animate="visible" 
        variants={fadeUp}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <Box 
          sx={{ 
            minHeight: '90vh', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            textAlign: 'center',
            py: { xs: 8, md: 10 },
            pt: { xs: 'calc(80px - 10px)', md: 10 },
            px: 2
          }}
        >
          <Container maxWidth="md">
            <Stack spacing={3}>
              <Box sx={{ 
                position: 'relative',
                top: { xs: '-10px', md: 0 },
                mt: { xs: '-10px', md: 0 }
              }}>
                <Typography 
                  variant="h2" 
                  component="h1"
                  sx={{ 
                    fontWeight: 700, 
                    lineHeight: 1.2,
                    '& .federation-text': {
                      color: '#ffffff',
                      textShadow: '0 0 1px rgba(0, 0, 0, 0.3), 0 0 2px rgba(0, 0, 0, 0.2), 1px 1px 0 rgba(128, 128, 128, 0.5)',
                      WebkitTextStroke: '0.5px rgba(128, 128, 128, 0.3)',
                    },
                    '& .blue-text': {
                      color: 'primary.main',
                    },
                    '& .red-text': {
                      color: 'secondary.main',
                    },
                  }}
                >
                  <span className="federation-text">Федерация</span>{' '}
                  <span className="blue-text">искусственного</span>{' '}
                  <span className="red-text">интеллекта</span>
                </Typography>
              </Box>
              <Typography 
                variant="h6" 
                sx={{ 
                  fontSize: { xs: '1rem', md: '1.25rem' },
                  color: (theme) => theme.palette.mode === 'light' ? '#212529' : 'text.secondary'
                }}
              >
                Мы объединяем образование, бизнес и государство, чтобы ИИ работал в реальных задачах, а не в презентациях. Подготовка кадров. Внедрение решений. Масштабирование практик.
              </Typography>
              <Stack 
                direction={{ xs: 'column', sm: 'row' }} 
                spacing={2} 
                justifyContent="center"
                sx={{ mt: 4 }}
              >
                <Link href="/partnership" style={{ textDecoration: 'none' }}>
                  <Button variant="contained" color="primary" size="large">
                    Стать партнером
                  </Button>
                </Link>
                <Link href="/contacts?type=join" style={{ textDecoration: 'none' }}>
                  <Button variant="outlined" size="large" sx={{ borderColor: 'grey.300' }}>
                    Вступить в федерацию
                  </Button>
                </Link>
              </Stack>
            </Stack>
          </Container>
        </Box>
      </motion.section>

      {/* Зачем существует федерация */}
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
              <GradientText variant="h3">Зачем существует федерация</GradientText>
            </motion.div>
            <motion.div
              initial="hidden" 
              whileInView="visible" 
              variants={fadeUp} 
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
            >
              <Typography variant="body1" sx={{ color: (theme) => theme.palette.mode === 'light' ? '#212529' : 'text.secondary' }}>
                Искусственный интеллект уже влияет на экономику, образование и управление.
              </Typography>
            </motion.div>
            <motion.div
              initial="hidden" 
              whileInView="visible" 
              variants={fadeUp} 
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
            >
              <Typography variant="body1" sx={{ color: (theme) => theme.palette.mode === 'light' ? '#212529' : 'text.secondary' }}>
                Наша задача — сделать так, чтобы эти технологии были понятны, доступны и полезны людям, организациям и регионам.
              </Typography>
            </motion.div>
            <motion.div
              initial="hidden" 
              whileInView="visible" 
              variants={fadeUp} 
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.3 }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Федерация — это точка сборки экспертизы, практики и проектов.
              </Typography>
            </motion.div>
            <motion.div
              initial="hidden" 
              whileInView="visible" 
              variants={fadeUp} 
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.4 }}
            >
              <Typography variant="body1" sx={{ color: (theme) => theme.palette.mode === 'light' ? '#212529' : 'text.secondary' }}>
                Мы соединяем тех, кто создает технологии, с теми, кому они реально нужны.
              </Typography>
            </motion.div>
          </Stack>
        </Container>
      </Box>

      {/* Ключевые направления */}
      <Box sx={{ width: '100%', py: 10, display: 'flex', justifyContent: 'center' }}>
        <Container maxWidth="xl">
          <motion.div
            initial="hidden" 
            whileInView="visible" 
            variants={fadeUp} 
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <GradientText variant="h3" component="h2" sx={{ display: 'block', textAlign: 'center', mb: 5 }}>Ключевые направления</GradientText>
          </motion.div>
          <Grid container spacing={3} justifyContent="center">
            {directions.map((item, i) => (
              <Grid item xs={12} sm={6} md={4} key={i}>
                <motion.div
                  variants={fadeScale} 
                  initial="hidden" 
                  whileInView="visible" 
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: i * 0.15 }}
                >
                  <Card
                    sx={{
                      height: '100%',
                      textAlign: 'center',
                      '&:hover': {
                        borderColor: 'primary.main',
                      },
                      transition: 'all 0.3s ease',
                      '& .icon-container': {
                        display: 'flex',
                        justifyContent: 'center',
                        mb: 2,
                        color: 'primary.main',
                      },
                      '&:hover .icon-container': {
                        color: 'secondary.main',
                      },
                    }}
                  >
                    <CardContent sx={{ p: 4 }}>
                      <Box className="icon-container">{item.icon}</Box>
                      <Typography variant="h6" component="h3" sx={{ fontWeight: 600, mb: 2 }}>
                        {item.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Для кого мы работаем */}
      <Box sx={{ width: '100%', py: 10, display: 'flex', justifyContent: 'center' }}>
        <Container maxWidth="xl">
          <motion.div
            initial="hidden" 
            whileInView="visible" 
            variants={fadeUp} 
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <GradientText variant="h3" component="h2" sx={{ display: 'block', textAlign: 'center', mb: 5 }}>Для кого мы работаем</GradientText>
          </motion.div>
          <Grid container spacing={3} justifyContent="center">
            {targetAudience.map((item, i) => (
              <Grid item xs={12} sm={6} md={4} key={i}>
                <motion.div
                  variants={fadeScale} 
                  initial="hidden" 
                  whileInView="visible" 
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: i * 0.15 }}
                >
                  <Card
                    sx={{
                      height: '100%',
                      textAlign: 'center',
                      '&:hover': {
                        borderColor: 'primary.main',
                      },
                      transition: 'all 0.3s ease',
                      '& .icon-container': {
                        display: 'flex',
                        justifyContent: 'center',
                        mb: 2,
                        color: 'primary.main',
                      },
                      '&:hover .icon-container': {
                        color: 'secondary.main',
                      },
                    }}
                  >
                    <CardContent sx={{ p: 4 }}>
                      <Box className="icon-container">{item.icon}</Box>
                      <Typography variant="h6" component="h3" sx={{ fontWeight: 600, mb: 2 }}>
                        {item.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Призывы к действию */}
      <Box sx={{ width: '100%', py: 10, display: 'flex', justifyContent: 'center' }}>
        <Container maxWidth="md">
          <Stack spacing={3} sx={{ textAlign: 'center' }}>
            <motion.div
              initial="hidden" 
              whileInView="visible" 
              variants={fadeUp} 
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <GradientText variant="h3">Готовы начать сотрудничество?</GradientText>
            </motion.div>
            <motion.div
              initial="hidden" 
              whileInView="visible" 
              variants={fadeUp} 
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
            >
              <Typography 
                variant="body1" 
                sx={{ 
                  mb: 4,
                  color: (theme) => theme.palette.mode === 'light' ? '#212529' : 'text.secondary'
                }}
              >
                Присоединяйтесь к федерации и станьте частью экосистемы развития ИИ
              </Typography>
            </motion.div>
            <motion.div
              initial="hidden" 
              whileInView="visible" 
              variants={fadeUp} 
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.3 }}
            >
              <Stack 
                direction={{ xs: 'column', sm: 'row' }} 
                spacing={2} 
                justifyContent="center"
              >
                <Link href="/partnership" style={{ textDecoration: 'none' }}>
                  <Button variant="contained" color="primary" size="large">
                    Стать партнером
                  </Button>
                </Link>
                <Link href="/contacts?type=join" style={{ textDecoration: 'none' }}>
                  <Button variant="outlined" size="large" sx={{ borderColor: 'grey.300' }}>
                    Вступить в федерацию
                  </Button>
                </Link>
                <Link href="/contacts" style={{ textDecoration: 'none' }}>
                  <Button variant="outlined" size="large" sx={{ borderColor: 'grey.300' }}>
                    Оставить заявку
                  </Button>
                </Link>
              </Stack>
            </motion.div>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}

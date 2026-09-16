import PageVisual from './PageVisual';
import { Box, Typography } from '@mui/material';

export default function PageIntro({ title, description, label = 'Федерация искусственного интеллекта', visual }) {
  return <Box component="header" sx={{
    position: 'relative', overflow: 'hidden', borderRadius: { xs: '24px', md: '32px' },
    background: 'radial-gradient(ellipse at 100% 0%, #163659, #0b1422 65%)',
    px: { xs: 3, sm: 5, md: 7 }, py: { xs: 5, md: 7 }, mb: { xs: 5, md: 7 },
    '&::after': { content: '\'\'', position: 'absolute', bottom: 0, left: 0, width: 160, height: 3, background: 'linear-gradient(90deg, #fff 33%, #639eff 33%, #639eff 66%, #ff6b70 66%)' },
  }}>
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: visual ? 'minmax(0, 1.15fr) minmax(0, 1fr)' : '1fr' }, alignItems: 'center', gap: { xs: 4, md: 5 } }}>
    <Box>
    <Typography sx={{ color: '#8ebeff', fontSize: '.72rem', fontWeight: 600, letterSpacing: '.13em', textTransform: 'uppercase', mb: 2 }}>{label}</Typography>
    <Typography component="h1" variant="h1" sx={{ color: '#fff', maxWidth: '22ch', fontSize: visual ? 'clamp(2rem, 3.6vw, 3.1rem)' : undefined, textWrap: 'balance' }}>{title}</Typography>
    {description && <Typography sx={{ color: '#c0ccdc', maxWidth: '65ch', mt: 2.5, fontSize: { xs: '1rem', md: '1.12rem' } }}>{description}</Typography>}
    </Box>
    {visual && <PageVisual variant={visual} />}
    </Box>
  </Box>;
}

 'use client';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { Box, Container, Typography, Card, Stack, Link } from '@mui/material';
import { Mail, Phone, ArrowUpRight } from 'lucide-react';
import PageIntro from '@/components/PageIntro';
import ContactForm from '@/components/ContactForm';
import { vicePresidents } from '@/lib/leadership';
import { federationContacts } from '@/lib/contacts';

function ContactsContent() {
  const params = useSearchParams();
  const type = ['partner', 'join'].includes(params.get('type')) ? params.get('type') : 'contact';
  return <Box sx={{ pt: { xs: 3, md: 4 }, pb: 8 }}>
    <Container maxWidth="lg">
      <PageIntro visual="contacts" title="Давайте обсудим вашу задачу" label="Контакты" description="Сотрудничество, вступление в Федерацию, совместные проекты и вопросы о применении искусственного интеллекта." />
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1.15fr' }, gap: { xs: 4, md: 5 }, alignItems: 'start' }}>
        <Stack spacing={3}>
          <Card sx={{ p: { xs: 3, md: 4 } }}>
            <Typography component="h2" variant="h5" sx={{ mb: 1 }}>Связаться с Федерацией</Typography>
            <Typography color="text.secondary" sx={{ mb: 3 }}>Общие вопросы и предложения о сотрудничестве</Typography>
            <Link href={`mailto:${federationContacts.email}`} sx={{ display: 'flex', alignItems: 'center', gap: 1.5, fontWeight: 600 }}><Mail size={19} />{federationContacts.email}</Link>
            <Stack direction="row" spacing={3} sx={{ mt: 3 }}>
              <Link sx={{ display: 'inline-flex', alignItems: 'center', gap: .5 }} href={federationContacts.telegramUrl} target="_blank" rel="noopener noreferrer">Telegram <ArrowUpRight size={14} /></Link>
              <Link sx={{ display: 'inline-flex', alignItems: 'center', gap: .5 }} href={federationContacts.vkUrl} target="_blank" rel="noopener noreferrer">ВКонтакте <ArrowUpRight size={14} /></Link>
            </Stack>
          </Card>
          <Typography component="h2" variant="h5" sx={{ pt: 2 }}>Руководство Федерации</Typography>
          {vicePresidents.map(person => <Card key={person.name} sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}>
              <Image src={person.photo} alt={person.name} width={72} height={72} style={{ borderRadius: 18, objectFit: 'cover', width: 72, height: 72 }} />
              <Typography component="h3" variant="h6">{person.name}</Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5 }}>{person.role}</Typography>
            <Stack spacing={1.5} sx={{ pt: 2, borderTop: '1px solid', borderColor: 'divider' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}><Phone size={17} color="#0039a6" />{person.phone ? <Link href={`tel:${person.phone.replace(/[^+\d]/g, '')}`}>{person.phone}</Link> : <Typography variant="body2" color="text.secondary">Телефон: уточняется</Typography>}</Box>
              {person.email && <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}><Mail size={17} color="#0039a6" /><Link href={`mailto:${person.email}`}>{person.email}</Link></Box>}
            </Stack>
          </Card>)}
          <Typography variant="body2" color="text.secondary">Письменное обращение вице-президенту можно направить через форму, указав его имя.</Typography>
        </Stack>
        <ContactForm key={type} type={type} />
      </Box>
    </Container>
  </Box>;
}
export default function ContactsPage() {
  return <Suspense fallback={<Container sx={{ py: 8 }}>Загрузка контактов…</Container>}><ContactsContent /></Suspense>;
}

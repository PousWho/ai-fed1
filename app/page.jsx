import HeroScreen from '@/components/home/HeroScreen';
import UnionScreen from '@/components/home/UnionScreen';
import DirectionsScreen from '@/components/home/DirectionsScreen';

const SITE_URL = 'https://федерацияии.рф';

export const metadata = {
  title: { absolute: 'Федерация искусственного интеллекта' },
  description:
    'Профессиональная площадка для взаимодействия бизнеса, разработчиков, экспертного сообщества, образования и государства в сфере искусственного интеллекта.',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: 'Федерация искусственного интеллекта',
    title: 'Федерация искусственного интеллекта',
    description:
      'Объединяем тех, кто создаёт будущее искусственного интеллекта в России.',
    locale: 'ru_RU',
  },
};

const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Федерация искусственного интеллекта',
  url: SITE_URL,
  description:
    'Профессиональная площадка для взаимодействия бизнеса, разработчиков, экспертного сообщества, образования и государства в сфере искусственного интеллекта.',
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      <HeroScreen />
      <UnionScreen />
      <DirectionsScreen />
    </>
  );
}

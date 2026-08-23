import { setRequestLocale } from 'next-intl/server';
import { AboutPageClient } from '@/components/AboutPageClient';

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <AboutPageClient />;
}

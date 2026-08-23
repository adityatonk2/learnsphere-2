import { setRequestLocale } from 'next-intl/server';
import { TermsOfServicePageClient } from '@/components/TermsOfServicePageClient';

export default async function TermsOfServicePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <TermsOfServicePageClient />;
}

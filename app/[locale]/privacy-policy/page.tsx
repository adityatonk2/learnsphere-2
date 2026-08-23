import { setRequestLocale } from 'next-intl/server';
import { PrivacyPolicyPageClient } from '@/components/PrivacyPolicyPageClient';

export default async function PrivacyPolicyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <PrivacyPolicyPageClient />;
}

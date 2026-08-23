import { setRequestLocale } from 'next-intl/server';
import { VouchersPageClient } from '@/components/VouchersPageClient';

export default async function VouchersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <VouchersPageClient />;
}

import { setRequestLocale } from 'next-intl/server';
import { CoursesPageClient } from '@/components/CoursesPageClient';

export default async function CoursesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <CoursesPageClient />;
}

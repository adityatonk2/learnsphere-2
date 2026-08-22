import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import {
  getAllCourseSlugs,
  getCourseBySlug,
  getCourseContent,
  getRelatedCourses,
} from '@/data/courseContent';
import { CoursePageClient } from '@/components/CoursePageClient';
import { routing } from '@/i18n/routing';

export function generateStaticParams() {
  const slugs = getAllCourseSlugs();
  return routing.locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) {
    return { title: 'Course not found' };
  }
  const bits = [course.level, course.duration, course.domain].filter(Boolean).join(' · ');
  const title = `${course.title} Training${course.code ? ` (${course.code})` : ''} — ${course.vendorName}`;
  const description = `${course.vendorName} ${course.title} instructor-led training from NexMentor Solutions.${bits ? ` ${bits}.` : ''} Live online, classroom, and private cohort delivery with certification prep.`;

  const languages: Record<string, string> = {};
  for (const l of routing.locales) {
    languages[l] = `/${l}/courses/${slug}`;
  }

  return {
    title,
    description,
    openGraph: { title, description, type: 'website' },
    alternates: {
      canonical: `/${locale}/courses/${slug}`,
      languages,
    },
  };
}

export default async function CoursePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const course = getCourseBySlug(slug);
  if (!course) notFound();
  const t = await getTranslations('CourseContent');
  const content = getCourseContent(course, t);
  const related = getRelatedCourses(course);
  return <CoursePageClient course={course} content={content} related={related} />;
}

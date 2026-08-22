import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  getAllCourseSlugs,
  getCourseBySlug,
  getCourseContent,
  getRelatedCourses,
} from '@/data/courseContent';
import { CoursePageClient } from '@/components/CoursePageClient';

export function generateStaticParams() {
  return getAllCourseSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) {
    return { title: 'Course not found' };
  }
  const bits = [course.level, course.duration, course.domain].filter(Boolean).join(' · ');
  const title = `${course.title} Training${course.code ? ` (${course.code})` : ''} — ${course.vendorName}`;
  const description = `${course.vendorName} ${course.title} instructor-led training from NexMentor Solutions.${bits ? ` ${bits}.` : ''} Live online, classroom, and private cohort delivery with certification prep.`;
  return {
    title,
    description,
    openGraph: { title, description, type: 'website' },
    alternates: { canonical: `/courses/${slug}` },
  };
}

export default async function CoursePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) notFound();

  const content = getCourseContent(course);
  const related = getRelatedCourses(course);

  return <CoursePageClient course={course} content={content} related={related} />;
}

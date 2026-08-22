import type { useTranslations } from 'next-intl';

type CourseLike = { id: string; title: string };
type TFunc = ReturnType<typeof useTranslations>;

/** Returns a translated course title if one exists in the Courses namespace, else the original. */
export function translatedTitle(t: TFunc, course: CourseLike): string {
  return t.has(course.id) ? t(course.id) : course.title;
}

/** Returns a translated level label if we have a mapping for it, else the original. */
export function translatedLevel(t: TFunc, level?: string): string | undefined {
  if (!level) return level;
  return t.has(level) ? t(level) : level;
}

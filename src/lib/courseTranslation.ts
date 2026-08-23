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

/**
 * Appends an hours breakdown to a "N Day(s)" duration string, assuming 8
 * training hours per day, e.g. "1 Day" -> "1 Day (8 hours)",
 * "0.5 Day" -> "0.5 Day (4 hours)", "3 Days" -> "3 Days (24 hours)".
 * Leaves anything that doesn't match the "N Day(s)" pattern unchanged.
 */
export function formatDuration(duration?: string): string | undefined {
  if (!duration) return duration;
  const match = duration.match(/^(\d+(?:\.\d+)?)\s*Days?$/i);
  if (!match) return duration;
  const days = parseFloat(match[1]);
  const hours = days * 8;
  const hoursDisplay = Number.isInteger(hours) ? hours : hours.toFixed(1);
  return `${duration} (${hoursDisplay} hours)`;
}

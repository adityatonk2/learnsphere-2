import { VENDORS_DATA } from './coursesData';
import { Course } from '../types';

export interface CatalogCourse extends Course {
  slug: string;
  vendorId: string;
  vendorName: string;
}

export interface CourseContent {
  overview: string;
  outcomes: string[];
  audience: string[];
  prerequisites: string[];
  certification: string;
  formats: string[];
  includes: string[];
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/\+/g, ' plus ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-');
}

// Build the flat catalog once, assigning a globally-unique, stable slug per course.
function buildCatalog(): CatalogCourse[] {
  const out: CatalogCourse[] = [];
  const seen = new Map<string, number>();
  for (const vendor of VENDORS_DATA) {
    for (const course of vendor.courses) {
      const base = `${slugify(vendor.id)}-${slugify(course.title)}`;
      const n = seen.get(base) ?? 0;
      seen.set(base, n + 1);
      const slug = n === 0 ? base : `${base}-${n + 1}`;
      out.push({ ...course, slug, vendorId: vendor.id, vendorName: vendor.name });
    }
  }
  return out;
}

export const CATALOG: CatalogCourse[] = buildCatalog();

const BY_SLUG = new Map(CATALOG.map((c) => [c.slug, c]));
const BY_ID = new Map(CATALOG.map((c) => [c.id, c]));

export const getAllCourseSlugs = (): string[] => CATALOG.map((c) => c.slug);
export const getCourseBySlug = (slug: string): CatalogCourse | undefined => BY_SLUG.get(slug);
export const getCourseById = (id: string): CatalogCourse | undefined => BY_ID.get(id);

// Courses in the same vendor + domain, excluding the current one.
export function getRelatedCourses(course: CatalogCourse, limit = 4): CatalogCourse[] {
  const sameDomain = CATALOG.filter(
    (c) => c.vendorId === course.vendorId && c.domain === course.domain && c.slug !== course.slug
  );
  const sameVendor = CATALOG.filter(
    (c) => c.vendorId === course.vendorId && c.slug !== course.slug && !sameDomain.includes(c)
  );
  return [...sameDomain, ...sameVendor].slice(0, limit);
}

type Tier = 'foundation' | 'intermediate' | 'advanced' | 'expert';

function tierOf(level?: string): Tier {
  const l = (level || '').toLowerCase();
  if (l.includes('expert')) return 'expert';
  if (l.includes('advanced') || l.includes('professional')) return 'advanced';
  if (l.includes('found') || l.includes('beginner')) return 'foundation';
  return 'intermediate'; // associate, administration, intermediate, unknown
}

type Translator = (key: string, values?: Record<string, string | number>) => string;

const PREREQ_KEYS: Record<Tier, [string, string]> = {
  foundation: ['prerequisites.foundation.first', 'prerequisites.foundation.second'],
  intermediate: ['prerequisites.intermediate.first', 'prerequisites.intermediate.second'],
  advanced: ['prerequisites.advanced.first', 'prerequisites.advanced.second'],
  expert: ['prerequisites.expert.first', 'prerequisites.expert.second'],
};

export function getCourseContent(course: CatalogCourse, t: Translator): CourseContent {
  const tier = tierOf(course.level);
  const domain = course.domain || 'cloud and enterprise technology';
  const vendor = course.vendorName;
  const dur = course.duration || 'the program';
  const shortTitle = course.title.replace(/\s*\(.*?\)\s*/g, '').trim();
  const level = (course.level || 'professional').toLowerCase();

  const overview = course.code
    ? t('overviewWithCode', { vendor, title: course.title, domain, duration: dur, level, code: course.code })
    : t('overviewWithoutCode', { vendor, title: course.title, domain, duration: dur, level });

  const outcomes = [
    t('outcomes.understand', { domain, shortTitle }),
    t('outcomes.configure', { shortTitle, vendor }),
    t('outcomes.apply'),
    t('outcomes.diagnose'),
    course.code ? t('outcomes.examWithCode', { code: course.code }) : t('outcomes.examNoCode'),
  ];

  const audience = [
    t('audience.professionals', { vendor, domain }),
    t('audience.architects'),
    t('audience.teams'),
  ];

  const certification = course.code
    ? t('certificationWithCode', { code: course.code })
    : t('certificationNoCode');

  const [prereq1Key, prereq2Key] = PREREQ_KEYS[tier];
  const prerequisites = [t(prereq1Key), t(prereq2Key)];

  const formats = [t('formats.liveOnline'), t('formats.classroom'), t('formats.privateCohort'), t('formats.onSite')];

  const includes = [
    t('includes.courseware'),
    t('includes.labs'),
    t('includes.practiceQuestions'),
    t('includes.certificate'),
  ];

  return { overview, outcomes, audience, prerequisites, certification, formats, includes };
}

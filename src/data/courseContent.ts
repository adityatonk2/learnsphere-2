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

const PREREQS: Record<Tier, string[]> = {
  foundation: [
    'No prior experience required — the course starts from first principles.',
    'Basic computer literacy and comfort navigating a modern operating system.',
  ],
  intermediate: [
    'Familiarity with core IT and networking concepts.',
    'Some hands-on exposure to the platform or an equivalent foundation-level course.',
  ],
  advanced: [
    'Working experience with the platform in a real or lab environment.',
    'An associate- or intermediate-level background in the relevant domain.',
  ],
  expert: [
    'Significant production experience with the technology.',
    'An advanced-level certification or equivalent practical expertise.',
  ],
};

export function getCourseContent(course: CatalogCourse): CourseContent {
  const tier = tierOf(course.level);
  const domain = course.domain || 'cloud and enterprise technology';
  const vendor = course.vendorName;
  const dur = course.duration || 'the program';
  const shortTitle = course.title.replace(/\s*\(.*?\)\s*/g, '').trim();

  const overview =
    `This instructor-led ${vendor} training on ${course.title} equips professionals working with ${domain} ` +
    `to build practical, job-ready skills. Across ${dur.toLowerCase().includes('day') ? dur.toLowerCase() : dur}, ` +
    `you will work through guided labs, real-world scenarios, and expert mentoring at a ${(course.level || 'professional').toLowerCase()} level. ` +
    (course.code
      ? `The curriculum maps to the ${course.code} certification track, so you finish ready to sit the exam and apply the skills on the job.`
      : `You finish with a NexMentor certificate of completion and the confidence to apply the skills immediately.`);

  const outcomes = [
    `Understand the core ${domain} concepts behind ${shortTitle} and how they fit an enterprise environment`,
    `Configure, deploy, and operate ${shortTitle} using ${vendor} best practices`,
    `Apply proven patterns for performance, security, cost, and reliability`,
    `Diagnose and troubleshoot common issues in production-style scenarios`,
    course.code
      ? `Prepare with confidence for the ${course.code} certification exam`
      : `Validate your skills with hands-on labs and a capstone exercise`,
  ];

  const audience = [
    `IT professionals and engineers working with ${vendor} ${domain}`,
    'Architects, administrators, and consultants expanding their platform expertise',
    'Teams standardizing skills ahead of a certification or migration',
  ];

  const certification = course.code
    ? `Aligned to exam ${course.code}. On completion you also receive a NexMentor certificate of participation.`
    : 'Includes a NexMentor certificate of completion recognised by our corporate training partners.';

  const formats = ['Live online (instructor-led)', 'Classroom', '1-on-1 / private cohort', 'Fly-me-a-trainer (on-site)'];

  const includes = [
    'Official-style courseware and lab guides',
    'Hands-on labs and real-world exercises',
    'Practice questions and exam-readiness review',
    'Certificate of completion',
  ];

  return { overview, outcomes, audience, prerequisites: PREREQS[tier], certification, formats, includes };
}

"use client";

import React from 'react';
import { Flame, Users } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface EnrollmentPulseProps {
  courseId: string;
}

/**
 * MOCK DATA — this is a new company with no real enrollment history yet.
 * Numbers are deterministically derived from the course id (not random per
 * render/reload) so the same course always shows the same figures, but
 * different courses show different, plausible-looking numbers. Replace with
 * a real enrollment/seats feed once one exists.
 */
// FNV-1a hash + Murmur3 finalizer so even short, similar ids (e.g. "aws-1"
// vs "aws-2") produce well-spread bits across the whole 32-bit range.
function hashSeed(id: string): number {
  let hash = 2166136261;
  for (let i = 0; i < id.length; i++) {
    hash ^= id.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  hash ^= hash >>> 16;
  hash = Math.imul(hash, 0x85ebca6b);
  hash ^= hash >>> 13;
  hash = Math.imul(hash, 0xc2b2ae35);
  hash ^= hash >>> 16;
  return hash >>> 0;
}

function getMockEnrollmentStats(courseId: string) {
  // Two independent seeds (hash the id, then hash the hash) so seatsLeft
  // and enrolled don't derive from correlated bit ranges of one value.
  const seedA = hashSeed(courseId);
  const seedB = hashSeed(`${courseId}::enrolled`);

  const totalSeats = 20 + (seedA % 11); // 20–30 seats in the next cohort
  const seatsLeft = 2 + (seedA % 10); // 2–11 seats left
  const enrolled = 35 + (seedB % 180); // 35–214 professionals enrolled to date
  const percentFilled = Math.min(100, Math.round(((totalSeats - seatsLeft) / totalSeats) * 100));
  return { totalSeats, seatsLeft: Math.min(seatsLeft, totalSeats - 1), enrolled, percentFilled };
}

export const EnrollmentPulse: React.FC<EnrollmentPulseProps> = ({ courseId }) => {
  const t = useTranslations('CoursePage');
  const { seatsLeft, enrolled, percentFilled } = getMockEnrollmentStats(courseId);

  return (
    <div className="rounded-xl border border-amber-200 dark:border-amber-900/40 bg-amber-50/60 dark:bg-amber-950/20 p-4">
      <div className="flex items-center gap-1.5 text-amber-700 dark:text-amber-400 text-[11px] font-bold uppercase tracking-wider mb-2">
        <Flame className="w-3.5 h-3.5" />
        {t('enrollment.badge')}
      </div>
      <p className="text-sm text-slate-700 dark:text-slate-200">
        {t('enrollment.seatsLeft', { count: seatsLeft })}
      </p>
      <div className="mt-2.5 h-1.5 rounded-full bg-amber-100 dark:bg-slate-800 overflow-hidden">
        <div
          className="h-full rounded-full bg-amber-500 dark:bg-amber-500/80"
          style={{ width: `${percentFilled}%` }}
        />
      </div>
      <p className="mt-2.5 flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
        <Users className="w-3.5 h-3.5 shrink-0" />
        {t('enrollment.studentsEnrolled', { count: enrolled })}
      </p>
    </div>
  );
};

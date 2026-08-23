"use client";

import React, { useState } from 'react';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { VENDORS_DATA } from '../data/coursesData';
import { getCourseById } from '../data/courseContent';
import { Course } from '../types';
import { ChevronRight, Search, ArrowRight } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { translatedTitle, translatedLevel } from '../lib/courseTranslation';

interface CourseDirectorySectionProps {
  onOpenContact: (courseName?: string) => void;
  initialVendorId?: string;
}

type SearchCourse = Course & { vendorName?: string };

const slugFor = (c: Course) => getCourseById(c.id)?.slug;

const CourseCard: React.FC<{ course: SearchCourse; showProvider?: boolean }> = ({ course, showProvider }) => {
  const slug = slugFor(course);
  const tCourses = useTranslations('Courses');
  const tLevels = useTranslations('Levels');
  const tDir = useTranslations('CourseDirectory');
  const title = translatedTitle(tCourses, course);
  const level = translatedLevel(tLevels, course.level);

  const inner = (
    <>
      <div className="space-y-1">
        <h4 className="text-sm font-medium text-slate-800 dark:text-slate-100 group-hover:text-[#0B5198] transition-colors leading-snug">
          {title}
        </h4>
        {showProvider && course.vendorName && (
          <span className="text-[11px] font-semibold text-slate-400 block">{tDir('providerPrefix')}{course.vendorName}</span>
        )}
      </div>
      <div className="mt-2.5 flex items-center gap-2 flex-wrap">
        {course.code && (
          <span className="text-[11px] font-mono font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">{course.code}</span>
        )}
        {level && (
          <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-1.5 py-0.5 rounded">{level}</span>
        )}
        {course.popular && (
          <span className="text-[10px] font-bold text-amber-700 bg-amber-50 dark:bg-amber-950/40 px-1.5 py-0.5 rounded border border-amber-200">{tDir('popular')}</span>
        )}
        <span className="ml-auto text-[11px] font-semibold text-[#0B5198] dark:text-sky-400 opacity-0 group-hover:opacity-100 flex items-center gap-0.5 transition-opacity">
          {tDir('viewLabel')} <ArrowRight className="w-3 h-3" />
        </span>
      </div>
    </>
  );

  const className =
    'group p-3.5 rounded-xl hover:bg-sky-50/60 border border-transparent hover:border-sky-100 transition-all flex flex-col justify-between h-full';

  return slug ? (
    <Link href={`/courses/${slug}`} className={`${className} cursor-pointer`}>{inner}</Link>
  ) : (
    <div className={className}>{inner}</div>
  );
};

export const CourseDirectorySection: React.FC<CourseDirectorySectionProps> = ({ onOpenContact, initialVendorId }) => {
  const [selectedVendorId, setSelectedVendorId] = useState<string>(
    initialVendorId && VENDORS_DATA.some((v) => v.id === initialVendorId) ? initialVendorId : 'aws'
  );
  const [searchQuery, setSearchQuery] = useState<string>('');
  const containerRef = useScrollReveal({ y: 50, duration: 0.9 });
  const t = useTranslations('CourseDirectory');

  const selectedVendor = VENDORS_DATA.find((v) => v.id === selectedVendorId) || VENDORS_DATA[0];

  const q = searchQuery.trim().toLowerCase();
  const searchResults: SearchCourse[] = q
    ? VENDORS_DATA.flatMap((v) =>
        v.courses
          .filter((c) => c.title.toLowerCase().includes(q) || (c.code && c.code.toLowerCase().includes(q)) || (c.domain && c.domain.toLowerCase().includes(q)))
          .map((c) => ({ ...c, vendorName: v.name }))
      )
    : [];

  const domainGroups = React.useMemo(() => {
    const map = new Map<string, Course[]>();
    for (const c of selectedVendor.courses) {
      const key = c.domain || 'Courses';
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(c);
    }
    return Array.from(map.entries());
  }, [selectedVendor]);

  const totalCourses = VENDORS_DATA.reduce((n, v) => n + v.courses.length, 0);

  return (
    <section id="courses" className="py-20 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 border-t border-slate-100 dark:border-slate-800">
      <div ref={containerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6 gsap-reveal">
          <div>
            <span className="text-[#0B5198] dark:text-sky-400 font-bold text-sm uppercase tracking-wider block mb-1">{t('eyebrow')}</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0A2540] dark:text-white">{t('heading')}</h2>
            <p className="text-slate-500 dark:text-slate-400 text-base mt-1">
              {t('subtitle', { count: totalCourses })}
            </p>
          </div>

          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder={t('searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0B5198] focus:bg-white dark:focus:bg-slate-900 transition-all"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">{t('clear')}</button>
            )}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[500px] gsap-reveal">
          <div className="md:col-span-3 lg:col-span-3 border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 py-2 max-h-[320px] overflow-y-auto md:max-h-[640px]">
            <div className="px-4 py-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider">{t('providersLabel')}</div>
            <div className="space-y-0.5">
              {VENDORS_DATA.map((vendor) => {
                const isSelected = selectedVendorId === vendor.id && !q;
                return (
                  <button
                    key={vendor.id}
                    onClick={() => { setSelectedVendorId(vendor.id); setSearchQuery(''); }}
                    className={`w-full text-left px-5 py-3 text-sm font-medium transition-all flex items-center justify-between group border-l-4 ${
                      isSelected ? 'bg-[#EAF5FC] text-[#0B5198] dark:text-sky-400 font-bold border-[#0B5198]' : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white border-transparent'
                    }`}
                  >
                    <span className="flex items-center gap-2">{vendor.name}</span>
                    <span className="flex items-center gap-2">
                      <span className="text-[10px] text-slate-400 font-normal">{vendor.courses.length}</span>
                      <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? 'text-[#0B5198] dark:text-sky-400 translate-x-0.5' : 'text-slate-400 group-hover:translate-x-0.5'}`} />
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="md:col-span-9 lg:col-span-9 p-6 sm:p-10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-slate-800 text-[#0B5198] dark:text-sky-400 flex items-center justify-center font-bold text-lg border border-sky-100 dark:border-sky-900/50">
                    {q ? <Search className="w-5 h-5" /> : selectedVendor.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#0A2540] dark:text-white">
                      {q ? t('searchResultsTitle', { count: searchResults.length }) : t('vendorCoursesTitle', { vendor: selectedVendor.name })}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {q ? t('matchingQuery', { query: searchQuery }) : t('programsCount', { count: selectedVendor.courses.length })}
                    </p>
                  </div>
                </div>
                <span className="hidden sm:inline-block text-xs font-semibold text-sky-700 bg-sky-50 dark:bg-slate-800 px-3 py-1 rounded-full border border-sky-100 dark:border-sky-900/50">{t('vendorAlignedBadge')}</span>
              </div>

              {q ? (
                searchResults.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2">
                    {searchResults.map((course) => (
                      <CourseCard key={`${course.id}`} course={course} showProvider />
                    ))}
                  </div>
                ) : (
                  <div className="py-16 text-center space-y-3">
                    <p className="text-slate-500 dark:text-slate-400 text-sm">{t('noResults', { query: searchQuery })}</p>
                    <button onClick={() => setSearchQuery('')} className="text-xs font-semibold text-[#0B5198] dark:text-sky-400 hover:underline">{t('resetSearch')}</button>
                  </div>
                )
              ) : (
                <div className="space-y-8 md:max-h-[560px] md:overflow-y-auto md:pr-2">
                  {domainGroups.map(([domain, courses]) => (
                    <div key={domain}>
                      {domainGroups.length > 1 && (
                        <div className="flex items-center gap-3 mb-3">
                          <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">{domain}</h4>
                          <span className="text-[10px] text-slate-300">{courses.length}</span>
                          <div className="h-px bg-slate-100 dark:bg-slate-800 flex-1" />
                        </div>
                      )}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-1.5">
                        {courses.map((course) => (
                          <CourseCard key={course.id} course={course} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-10 flex justify-center border-t border-slate-100 dark:border-slate-800 mt-8">
              <button
                onClick={() => onOpenContact(`Catalog Inquiry for ${selectedVendor.name}`)}
                className="bg-[#007AB8] hover:bg-[#006396] text-white px-8 py-3 rounded-full font-bold text-sm shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center gap-2"
              >
                <span>{t('requestCatalog')}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

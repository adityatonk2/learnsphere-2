"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { VENDORS_DATA } from '../data/coursesData';
import { getCourseById } from '../data/courseContent';
import { Course } from '../types';
import { ChevronRight, Search, ArrowRight } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface CourseDirectorySectionProps {
  onOpenContact: (courseName?: string) => void;
}

type SearchCourse = Course & { vendorName?: string };

const slugFor = (c: Course) => getCourseById(c.id)?.slug;

const CourseCard: React.FC<{ course: SearchCourse; showProvider?: boolean }> = ({ course, showProvider }) => {
  const slug = slugFor(course);
  const inner = (
    <>
      <div className="space-y-1">
        <h4 className="text-sm font-medium text-slate-800 group-hover:text-[#0B5198] transition-colors leading-snug">
          {course.title}
        </h4>
        {showProvider && course.vendorName && (
          <span className="text-[11px] font-semibold text-slate-400 block">Provider: {course.vendorName}</span>
        )}
      </div>
      <div className="mt-2.5 flex items-center gap-2 flex-wrap">
        {course.code && (
          <span className="text-[11px] font-mono font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">{course.code}</span>
        )}
        {course.level && (
          <span className="text-[10px] font-semibold text-slate-500 bg-slate-50 border border-slate-200 px-1.5 py-0.5 rounded">{course.level}</span>
        )}
        {course.popular && (
          <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">Popular</span>
        )}
        <span className="ml-auto text-[11px] font-semibold text-[#0B5198] opacity-0 group-hover:opacity-100 flex items-center gap-0.5 transition-opacity">
          View <ArrowRight className="w-3 h-3" />
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

export const CourseDirectorySection: React.FC<CourseDirectorySectionProps> = ({ onOpenContact }) => {
  const [selectedVendorId, setSelectedVendorId] = useState<string>('aws');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const containerRef = useScrollReveal({ y: 50, duration: 0.9 });

  const selectedVendor = VENDORS_DATA.find((v) => v.id === selectedVendorId) || VENDORS_DATA[0];

  const q = searchQuery.trim().toLowerCase();
  const searchResults: SearchCourse[] = q
    ? VENDORS_DATA.flatMap((v) =>
        v.courses
          .filter((c) => c.title.toLowerCase().includes(q) || (c.code && c.code.toLowerCase().includes(q)) || (c.domain && c.domain.toLowerCase().includes(q)))
          .map((c) => ({ ...c, vendorName: v.name }))
      )
    : [];

  // Group the selected vendor's courses by domain (falls back to a single group).
  const domainGroups = React.useMemo(() => {
    const map = new Map<string, Course[]>();
    for (const c of selectedVendor.courses) {
      const key = c.domain || 'Courses';
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(c);
    }
    return Array.from(map.entries());
  }, [selectedVendor]);

  return (
    <section id="courses" className="py-20 bg-white text-slate-900 border-t border-slate-100">
      <div ref={containerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Instant Course Search */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6 gsap-reveal">
          <div>
            <span className="text-[#0B5198] font-bold text-sm uppercase tracking-wider block mb-1">Certification Directory</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0A2540]">Top Technology Courses</h2>
            <p className="text-slate-500 text-base mt-1">
              Explore {VENDORS_DATA.reduce((n, v) => n + v.courses.length, 0)}+ official training programs across leading technology vendors.
            </p>
          </div>

          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search CEH, CISSP, Azure, Kubernetes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0B5198] focus:bg-white transition-all"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600">Clear</button>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[500px] gsap-reveal">
          {/* Vendor sidebar */}
          <div className="md:col-span-3 lg:col-span-3 border-r border-slate-200 bg-slate-50/50 py-2 md:max-h-[640px] md:overflow-y-auto">
            <div className="px-4 py-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Certification Providers</div>
            <div className="space-y-0.5">
              {VENDORS_DATA.map((vendor) => {
                const isSelected = selectedVendorId === vendor.id && !q;
                return (
                  <button
                    key={vendor.id}
                    onClick={() => { setSelectedVendorId(vendor.id); setSearchQuery(''); }}
                    className={`w-full text-left px-5 py-3 text-sm font-medium transition-all flex items-center justify-between group border-l-4 ${
                      isSelected ? 'bg-[#EAF5FC] text-[#0B5198] font-bold border-[#0B5198]' : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900 border-transparent'
                    }`}
                  >
                    <span className="flex items-center gap-2">{vendor.name}</span>
                    <span className="flex items-center gap-2">
                      <span className="text-[10px] text-slate-400 font-normal">{vendor.courses.length}</span>
                      <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? 'text-[#0B5198] translate-x-0.5' : 'text-slate-400 group-hover:translate-x-0.5'}`} />
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Course panel */}
          <div className="md:col-span-9 lg:col-span-9 p-6 sm:p-10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-sky-50 text-[#0B5198] flex items-center justify-center font-bold text-lg border border-sky-100">
                    {q ? <Search className="w-5 h-5" /> : selectedVendor.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#0A2540]">
                      {q ? `Search Results (${searchResults.length})` : `${selectedVendor.name} Courses`}
                    </h3>
                    <p className="text-xs text-slate-500">{q ? `Matching "${searchQuery}"` : `${selectedVendor.courses.length} official training programs`}</p>
                  </div>
                </div>
                <span className="hidden sm:inline-block text-xs font-semibold text-sky-700 bg-sky-50 px-3 py-1 rounded-full border border-sky-100">Authorized Training Partner</span>
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
                    <p className="text-slate-500 text-sm">No courses matching "{searchQuery}" found.</p>
                    <button onClick={() => setSearchQuery('')} className="text-xs font-semibold text-[#0B5198] hover:underline">Reset Search</button>
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
                          <div className="h-px bg-slate-100 flex-1" />
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

            <div className="pt-10 flex justify-center border-t border-slate-100 mt-8">
              <button
                onClick={() => onOpenContact(`Catalog Inquiry for ${selectedVendor.name}`)}
                className="bg-[#007AB8] hover:bg-[#006396] text-white px-8 py-3 rounded-full font-bold text-sm shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center gap-2"
              >
                <span>Request full catalog &amp; pricing</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

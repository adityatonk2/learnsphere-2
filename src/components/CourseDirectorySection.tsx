"use client";

import React, { useState } from 'react';
import { VENDORS_DATA } from '../data/coursesData';
import { Course, Vendor } from '../types';
import { ChevronRight, Search, BookOpen, Clock, Award, Shield, CheckCircle, Sparkles, X } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface CourseDirectorySectionProps {
  onOpenContact: (courseName?: string) => void;
}

export const CourseDirectorySection: React.FC<CourseDirectorySectionProps> = ({ onOpenContact }) => {
  const [selectedVendorId, setSelectedVendorId] = useState<string>('ec-council');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCourseModal, setSelectedCourseModal] = useState<Course | null>(null);
  const containerRef = useScrollReveal({ y: 50, duration: 0.9 });

  const selectedVendor = VENDORS_DATA.find((v) => v.id === selectedVendorId) || VENDORS_DATA[7];

  // Search filtering logic across all vendors if search query exists
  const filteredCourses = searchQuery.trim()
    ? VENDORS_DATA.flatMap((v) =>
        v.courses
          .filter(
            (c) =>
              c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              (c.code && c.code.toLowerCase().includes(searchQuery.toLowerCase()))
          )
          .map((c) => ({ ...c, vendorName: v.name }))
      )
    : selectedVendor.courses;

  return (
    <section id="courses" className="py-20 bg-white text-slate-900 border-t border-slate-100">
      <div ref={containerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Instant Course Search */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6 gsap-reveal">
          <div>
            <span className="text-[#0B5198] font-bold text-sm uppercase tracking-wider block mb-1">
              Certification Directory
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0A2540]">
              Top Technology Courses
            </h2>
            <p className="text-slate-500 text-base mt-1">
              Select a global vendor below to explore official certification training programs.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search CEH, CISSP, AWS, Azure..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0B5198] focus:bg-white transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Directory Layout matching Image 3 */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[500px] gsap-reveal">
          
          {/* Left Sidebar: Certification Vendors list matching Image 3 */}
          <div className="md:col-span-3 lg:col-span-3 border-r border-slate-200 bg-slate-50/50 py-2">
            <div className="px-4 py-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Certification Providers
            </div>
            <div className="space-y-0.5">
              {VENDORS_DATA.map((vendor) => {
                const isSelected = selectedVendorId === vendor.id && !searchQuery;
                return (
                  <button
                    key={vendor.id}
                    onClick={() => {
                      setSelectedVendorId(vendor.id);
                      setSearchQuery('');
                    }}
                    className={`w-full text-left px-5 py-3.5 text-sm font-medium transition-all flex items-center justify-between group border-l-4 ${
                      isSelected
                        ? 'bg-[#EAF5FC] text-[#0B5198] font-bold border-[#0B5198]'
                        : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900 border-transparent'
                    }`}
                  >
                    <span>{vendor.name}</span>
                    <ChevronRight
                      className={`w-4 h-4 transition-transform ${
                        isSelected ? 'text-[#0B5198] translate-x-0.5' : 'text-slate-400 group-hover:translate-x-0.5'
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Panel: Course Items Grid matching Image 3 */}
          <div className="md:col-span-9 lg:col-span-9 p-6 sm:p-10 flex flex-col justify-between">
            <div>
              {/* Header inside right panel */}
              <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-sky-50 text-[#0B5198] flex items-center justify-center font-bold text-lg border border-sky-100">
                    {selectedVendor.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#0A2540]">
                      {searchQuery ? `Search Results (${filteredCourses.length})` : `${selectedVendor.name} Certification Courses`}
                    </h3>
                    <p className="text-xs text-slate-500">
                      Official curriculum & exam preparation
                    </p>
                  </div>
                </div>

                <span className="hidden sm:inline-block text-xs font-semibold text-sky-700 bg-sky-50 px-3 py-1 rounded-full border border-sky-100">
                  Authorized Training Partner
                </span>
              </div>

              {/* 3-Column Course Grid matching Image 3 layout */}
              {filteredCourses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-6">
                  {filteredCourses.map((course) => (
                    <div
                      key={course.id}
                      onClick={() => setSelectedCourseModal(course)}
                      className="group cursor-pointer p-3 rounded-xl hover:bg-sky-50/60 border border-transparent hover:border-sky-100 transition-all flex flex-col justify-between gsap-reveal"
                    >
                      <div className="space-y-1">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-sm font-medium text-slate-800 group-hover:text-[#0B5198] group-hover:underline transition-colors leading-snug">
                            {course.title}
                          </h4>
                        </div>
                        {'vendorName' in course && (
                          <span className="text-[11px] font-semibold text-slate-400 block">
                            Provider: {(course as any).vendorName}
                          </span>
                        )}
                      </div>

                      {course.code && (
                        <div className="mt-2 flex items-center gap-2">
                          <span className="text-[11px] font-mono font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                            {course.code}
                          </span>
                          {course.popular && (
                            <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                              Popular
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-16 text-center space-y-3">
                  <p className="text-slate-500 text-sm">No courses matching "{searchQuery}" found.</p>
                  <button
                    onClick={() => setSearchQuery('')}
                    className="text-xs font-semibold text-[#0B5198] hover:underline"
                  >
                    Reset Search
                  </button>
                </div>
              )}
            </div>

            {/* Bottom Button matching Image 3: "Show All Courses" */}
            <div className="pt-10 flex justify-center border-t border-slate-100 mt-8">
              <button
                onClick={() => onOpenContact(`Catalog Inquiry for ${selectedVendor.name}`)}
                className="bg-[#007AB8] hover:bg-[#006396] text-white px-8 py-3 rounded-full font-bold text-sm shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center gap-2"
              >
                <span>Show All Courses</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Course Detail Interactive Modal */}
      {selectedCourseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white text-slate-900 rounded-2xl max-w-xl w-full p-6 sm:p-8 relative shadow-2xl border border-slate-200 space-y-6">
            <button
              onClick={() => setSelectedCourseModal(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2">
              <span className="text-xs font-bold text-[#0B5198] uppercase tracking-wider bg-sky-50 px-2.5 py-1 rounded">
                Official Certification Training
              </span>
              <h3 className="text-2xl font-bold text-[#0A2540]">
                {selectedCourseModal.title}
              </h3>
              {selectedCourseModal.code && (
                <p className="text-sm font-mono text-slate-500">
                  Exam Code: <span className="font-semibold text-slate-800">{selectedCourseModal.code}</span>
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4 py-3 bg-slate-50 rounded-xl p-4 border border-slate-200 text-xs">
              <div>
                <span className="text-slate-400 block font-medium">Standard Duration</span>
                <strong className="text-slate-800 text-sm font-semibold">{selectedCourseModal.duration || '5 Days (40 Hours)'}</strong>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Skill Level</span>
                <strong className="text-slate-800 text-sm font-semibold">{selectedCourseModal.level || 'Intermediate'}</strong>
              </div>
            </div>

            <div className="space-y-2 text-sm text-slate-600">
              <h4 className="font-bold text-slate-900">What You Will Learn:</h4>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Hands-on cloud laboratory exercises & simulated real-world scenarios</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Official vendor courseware and exam review practice questions</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Interactive Q&A with certified industry master trainer</span>
                </li>
              </ul>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => {
                  const courseTitle = selectedCourseModal.title;
                  setSelectedCourseModal(null);
                  onOpenContact(courseTitle);
                }}
                className="w-full bg-[#0052CC] hover:bg-[#003B99] text-white py-3 rounded-xl font-bold text-sm shadow-md transition-all text-center"
              >
                Request Syllabus & Schedule
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

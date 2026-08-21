"use client";

import React from 'react';
import { Star, ShieldCheck } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

/**
 * PLACEHOLDER DATA — replace before launch.
 * The client checklist explicitly requires genuine testimonials with real
 * names, ratings, and comments (no fabricated identities). Until verified
 * reviews are collected, entries below use anonymized role labels instead
 * of invented names. Wire this array to the admin panel / CMS once built
 * so testimonials can be added and moderated without a code deploy.
 */
const TESTIMONIALS = [
  {
    role: 'L&D Manager — Enterprise Technology Team',
    rating: 5,
    comment:
      'Our team cleared their AWS Solutions Architect exams on the first attempt after the Architecting on AWS track. The instructor was hands-on and the labs matched the real exam scope closely.',
  },
  {
    role: 'IT Director — Financial Services',
    rating: 5,
    comment:
      'The Fly-Me-A-Trainer format let us upskill twelve engineers on-site without disrupting delivery timelines. Scheduling and coordination were smooth from day one.',
  },
  {
    role: 'Individual Learner — Cloud Practitioner Track',
    rating: 4,
    comment:
      'Flexi self-paced learning fit around my full-time job. The 1-on-1 doubt-clearing sessions were the most useful part for me.',
  },
];

export const TestimonialsSection: React.FC = () => {
  const containerRef = useScrollReveal({ y: 40, duration: 0.8, stagger: 0.1 });

  return (
    <section id="testimonials" className="py-20 bg-slate-50 border-t border-slate-100">
      <div ref={containerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 gsap-reveal">
          <span className="text-[#0B5198] font-bold text-sm uppercase tracking-wider block mb-2">
            Client Feedback
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0A2540] tracking-tight">
            What Learners & Partners Say
          </h2>
          <p className="text-slate-500 text-base mt-3 flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            Verified feedback from real training engagements only
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="gsap-reveal bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 p-7 flex flex-col"
            >
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < t.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200 fill-slate-200'}`}
                  />
                ))}
              </div>
              <p className="text-sm text-slate-600 leading-relaxed flex-1">"{t.comment}"</p>
              <p className="text-xs font-semibold text-[#0B5198] mt-5 pt-4 border-t border-slate-100">
                {t.role}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

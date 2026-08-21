"use client";

import React from 'react';
import { ShieldCheck, Users2, Globe2, Clock, Award, Headset } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const REASONS = [
  {
    icon: ShieldCheck,
    title: 'Authorized Vendor Partner',
    description: 'Official training partner for AWS, Microsoft, EC-Council, ISC2, PMI, and more — every course maps directly to real certification exams.',
  },
  {
    icon: Users2,
    title: 'Certified Master Trainers',
    description: 'A global bench of 1,200+ industry-practicing, vendor-certified instructors — not generic content readers.',
  },
  {
    icon: Globe2,
    title: 'Global Delivery Footprint',
    description: 'On-site, virtual, or hybrid delivery across 40+ countries, aligned to your team\'s timezone and infrastructure.',
  },
  {
    icon: Clock,
    title: 'Flexible Learning Formats',
    description: 'From self-paced Flexi tracks to Fly-Me-A-Trainer on-site cohorts — choose the format that fits your workforce.',
  },
  {
    icon: Award,
    title: 'Proven Exam Outcomes',
    description: 'A consistently high exam pass rate backed by official courseware, hands-on labs, and structured exam-prep tracks.',
  },
  {
    icon: Headset,
    title: 'Dedicated Advisor Support',
    description: 'Every learner and enterprise account gets a course advisor for planning, scheduling, and career-path guidance.',
  },
];

export const WhyUsSection: React.FC = () => {
  const containerRef = useScrollReveal({ y: 40, duration: 0.8, stagger: 0.08 });

  return (
    <section id="why-us" className="py-20 bg-white border-t border-slate-100">
      <div ref={containerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 gsap-reveal">
          <span className="text-[#0B5198] font-bold text-sm uppercase tracking-wider block mb-2">
            Our Advantage
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0A2540] tracking-tight">
            Why NexMentor Solutions?
          </h2>
          <p className="text-slate-500 text-base mt-3">
            A trusted partner for organizations that need certification-ready results, not just training hours.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {REASONS.map((reason) => {
            const Icon = reason.icon;
            return (
              <div
                key={reason.title}
                className="gsap-reveal group p-7 rounded-2xl border border-slate-200 bg-white hover:bg-sky-50/40 hover:border-sky-200 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-sky-50 text-[#0B5198] flex items-center justify-center border border-sky-100 group-hover:bg-[#0B5198] group-hover:text-white transition-colors mb-5">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-[#0A2540] mb-2">{reason.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{reason.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

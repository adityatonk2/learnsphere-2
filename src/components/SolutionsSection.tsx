"use client";

import React from 'react';
import { FileText, Video, Globe, GraduationCap, CheckCircle } from 'lucide-react';
import Image from 'next/image';
import { SOLUTIONS_LIST } from '../data/coursesData';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface SolutionsSectionProps {
  onSelectSolution?: (solutionId: string) => void;
  onOpenContact: () => void;
}

export const SolutionsSection: React.FC<SolutionsSectionProps> = ({ onOpenContact }) => {
  const containerRef = useScrollReveal({ y: 50, duration: 0.9, stagger: 0.15 });
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'FileText':
        return <FileText className="w-8 h-8 text-[#0B5198]" />;
      case 'Video':
        return <Video className="w-8 h-8 text-[#0B5198]" />;
      case 'Globe':
        return <Globe className="w-8 h-8 text-[#0B5198]" />;
      case 'GraduationCap':
        return <GraduationCap className="w-8 h-8 text-[#0B5198]" />;
      default:
        return <FileText className="w-8 h-8 text-[#0B5198]" />;
    }
  };

  return (
    <section id="solutions" className="py-20 bg-slate-50 relative overflow-hidden">
      {/* Subtle top wavy background SVG matching Image 1 */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-white to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={containerRef}>
          {/* Section Header matching Image 1 */}
          <div className="mb-12 gsap-reveal">
          <span className="text-[#0B5198] font-bold text-lg tracking-wide uppercase block mb-1">
            Our Solutions
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0A2540] tracking-tight">
            Next-Generation Learning Solutions
          </h2>
          <p className="text-slate-500 text-base sm:text-lg mt-2 font-normal">
            Innovative tools to elevate your workforce
          </p>
        </div>

        {/* 4 Feature Items Grid matching Image 1 layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {SOLUTIONS_LIST.map((solution) => (
            <div
              key={solution.id}
              className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center group cursor-pointer gsap-reveal"
              onClick={onOpenContact}
            >
              <div className="w-16 h-16 rounded-2xl bg-sky-50 group-hover:bg-[#0B5198] flex items-center justify-center mb-5 transition-colors duration-300 group-hover:text-white">
                <div className="group-hover:scale-110 group-hover:text-white transition-all">
                  {getIcon(solution.iconName)}
                </div>
              </div>
              <h3 className="text-lg font-bold text-[#0A2540] mb-2 group-hover:text-[#0B5198] transition-colors">
                {solution.title}
              </h3>
              <p className="text-slate-500 text-sm font-medium leading-relaxed">
                {solution.subtitle}
              </p>
            </div>
          ))}
        </div>

        {/* Banner with Collaborative Corporate Professionals Image matching Image 1 */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-md overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-center gsap-reveal">
          <div className="lg:col-span-7 p-8 sm:p-12 space-y-6">
            <span className="inline-block bg-sky-100 text-[#0B5198] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Enterprise Grade LMS & Training
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0A2540] leading-tight">
              Empower your enterprise with scalable, turn-key skill transformation programs.
            </h3>
            <p className="text-slate-600 text-base leading-relaxed">
              LearnSphere Technologies bridges skill gaps across IT, Cybersecurity, Cloud Infrastructure, DevOps, and Project Management with hands-on lab environments and certified master instructors.
            </p>

            <ul className="space-y-3 text-sm text-slate-700 font-medium">
              <li className="flex items-center gap-2.5">
                <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                <span>Seamless integration with enterprise SSO, Okta, and SCIM directory sync</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                <span>Authorized official training vouchers & official certification exam pass guarantee</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                <span>Dedicated Enterprise Account Executive and 24/7 technical helpdesk</span>
              </li>
            </ul>

            <div className="pt-2">
              <button
                onClick={onOpenContact}
                className="bg-[#0B5198] hover:bg-[#003B73] text-white px-7 py-3 rounded-xl font-bold text-sm shadow-md transition-all flex items-center gap-2"
              >
                <span>Request Enterprise Demo</span>
                <span>→</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 h-full min-h-[320px] relative bg-slate-100">
            <Image
              src="/assets/images/hero_learning_team_1786357207634.jpg"
              alt="Business professionals collaborating on laptop"
              fill
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent lg:hidden" />
          </div>
        </div>
        </div>
      </div>
    </section>
  );
};

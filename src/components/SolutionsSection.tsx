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
        return <FileText className="w-8 h-8 text-[#0B5198] dark:text-sky-400" />;
      case 'Video':
        return <Video className="w-8 h-8 text-[#0B5198] dark:text-sky-400" />;
      case 'Globe':
        return <Globe className="w-8 h-8 text-[#0B5198] dark:text-sky-400" />;
      case 'GraduationCap':
        return <GraduationCap className="w-8 h-8 text-[#0B5198] dark:text-sky-400" />;
      default:
        return <FileText className="w-8 h-8 text-[#0B5198] dark:text-sky-400" />;
    }
  };

  return (
    <section id="solutions" className="py-20 bg-slate-50 dark:bg-slate-900 relative overflow-hidden">
      {/* Subtle top wavy background SVG matching Image 1 */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-white to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={containerRef}>
          {/* Section Header matching Image 1 */}
          <div className="mb-12 gsap-reveal">
          <span className="text-[#0B5198] dark:text-sky-400 font-bold text-lg tracking-wide uppercase block mb-1">
            Our Solutions
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0A2540] dark:text-white tracking-tight">
            Next-Generation Learning Solutions
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-base sm:text-lg mt-2 font-normal">
            Innovative tools to elevate your workforce
          </p>
        </div>

        {/* 4 Feature Items Grid — flip cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16" style={{ perspective: '1500px' }}>
          {SOLUTIONS_LIST.map((solution) => (
            <div
              key={solution.id}
              className="group gsap-reveal h-56 cursor-pointer"
              style={{ perspective: '1500px' }}
              onClick={onOpenContact}
            >
              <div
                className="relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]"
              >
                {/* Front face */}
                <div
                  className="absolute inset-0 [backface-visibility:hidden] bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-xs flex flex-col items-center justify-center text-center"
                >
                  <div className="w-16 h-16 rounded-2xl bg-sky-50 dark:bg-slate-800 flex items-center justify-center mb-5">
                    {getIcon(solution.iconName)}
                  </div>
                  <h3 className="text-lg font-bold text-[#0A2540] dark:text-white mb-2">
                    {solution.title}
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed">
                    {solution.subtitle}
                  </p>
                </div>

                {/* Back face */}
                <div
                  className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] bg-[#0B5198] p-6 rounded-2xl shadow-lg flex flex-col items-center justify-center text-center"
                >
                  <p className="text-white text-sm leading-relaxed">
                    {solution.description}
                  </p>
                  <span className="mt-4 text-xs font-bold text-sky-200 uppercase tracking-wider">
                    Click to Learn More →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Banner with Collaborative Corporate Professionals Image matching Image 1 */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-md overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-center gsap-reveal">
          <div className="lg:col-span-7 p-8 sm:p-12 space-y-6">
            <span className="inline-block bg-sky-100 dark:bg-sky-900/40 text-[#0B5198] dark:text-sky-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Enterprise Grade LMS & Training
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0A2540] dark:text-white leading-tight">
              Empower your enterprise with scalable, turn-key skill transformation programs.
            </h3>
            <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed">
              NexMentor Solutions bridges skill gaps across IT, Cybersecurity, Cloud Infrastructure, DevOps, and Project Management with hands-on lab environments and certified master instructors.
            </p>

            <ul className="space-y-3 text-sm text-slate-700 dark:text-slate-200 font-medium">
              <li className="flex items-center gap-2.5">
                <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                <span>Seamless integration with enterprise SSO, Okta, and SCIM directory sync</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                <span>Official exam vouchers and structured exam-readiness preparation</span>
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

          <div className="lg:col-span-5 h-full min-h-[320px] relative bg-slate-100 dark:bg-slate-800">
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

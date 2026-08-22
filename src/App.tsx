"use client";

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { SolutionsSection } from './components/SolutionsSection';
import { WhyUsSection } from './components/WhyUsSection';
import { TrainingModesSection } from './components/TrainingModesSection';
import { CourseDirectorySection } from './components/CourseDirectorySection';
import { LeadershipSection } from './components/LeadershipSection';
import { MissionVisionValuesSection } from './components/MissionVisionValuesSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { StatsSection } from './components/StatsSection';
import { PartnerCTASection } from './components/PartnerCTASection';
import { PromoBanner } from './components/PromoBanner';
import { AboutSection } from './components/AboutSection';
import { ContactModal } from './components/ContactModal';
import { PartnerModal } from './components/PartnerModal';
import { Footer } from './components/Footer';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [contactDefaultSubject, setContactDefaultSubject] = useState<string>('');
  const [isPartnerOpen, setIsPartnerOpen] = useState(false);

  // When arriving from another route with a hash (e.g. /#courses), scroll there.
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const id = window.location.hash.slice(1);
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 80);
    }
  }, []);

  const handleOpenContact = (subject?: string) => {
    if (subject) {
      setContactDefaultSubject(subject);
    } else {
      setContactDefaultSubject('');
    }
    setIsContactOpen(true);
  };

  const handleExploreCourses = () => {
    setActiveSection('courses');
    const elem = document.getElementById('courses');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans selection:bg-sky-500 selection:text-white">
      {/* Monsoon Sale Promo Banner */}
      <PromoBanner onOpenContact={handleOpenContact} />

      {/* Header with Sticky Navbar & Learning Options Dropdown */}
      <Header
        onOpenContact={(subject) => handleOpenContact(subject)}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* Main Content Layout */}
      <main>
        {/* Hero Banner Section (Image 1 top) */}
        <HeroSection
          onOpenContact={() => handleOpenContact('Enterprise Learning Inquiry')}
          onExploreCourses={handleExploreCourses}
        />

        {/* Our Solutions Section (Image 1 middle) */}
        <SolutionsSection
          onOpenContact={() => handleOpenContact('Learning Solutions Demo')}
        />

        {/* Why NexMentor Solutions? */}
        <WhyUsSection />

        {/* Flexible Learning Options Section (Image 2) */}
        <TrainingModesSection
          onOpenContact={(modeTitle) => handleOpenContact(modeTitle)}
        />

        {/* Certification Directory Section (Image 3) */}
        <CourseDirectorySection
          onOpenContact={(courseName) => handleOpenContact(courseName)}
        />

        {/* Business Stats */}
        <StatsSection />

        {/* Leadership Profiles */}
        <LeadershipSection />

        {/* Mission, Vision & Values */}
        <MissionVisionValuesSection />

        {/* Client & Learner Testimonials */}
        <TestimonialsSection />

        {/* Become a Partner CTA */}
        <PartnerCTASection onOpenPartnerForm={() => setIsPartnerOpen(true)} />

        {/* About NexMentor Solutions & Callout Card (Image 1 bottom) */}
        <AboutSection
          onOpenContact={() => handleOpenContact('Corporate Partnership')}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenContact={() => handleOpenContact()}
        setActiveSection={setActiveSection}
      />

      {/* Interactive Contact & Inquiry Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        defaultSubject={contactDefaultSubject}
      />

      {/* Become a Partner Modal */}
      <PartnerModal
        isOpen={isPartnerOpen}
        onClose={() => setIsPartnerOpen(false)}
      />
    </div>
  );
}

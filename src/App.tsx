"use client";

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { SolutionsSection } from './components/SolutionsSection';
import { WhyUsSection } from './components/WhyUsSection';
import { TrainingModesSection } from './components/TrainingModesSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { StatsSection } from './components/StatsSection';
import { PartnersCarousel } from './components/PartnersCarousel';
import { RiseFrameworkSection } from './components/RiseFrameworkSection';
import { PromoBanner } from './components/PromoBanner';
import { ContactModal } from './components/ContactModal';
import { Footer } from './components/Footer';
import { useRouter } from '@/i18n/navigation';

export default function App() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState('home');
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [contactDefaultSubject, setContactDefaultSubject] = useState<string>('');

  // When arriving from another route with a hash (e.g. /#solutions), scroll there.
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
    router.push('/courses');
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

        {/* Trusted-by partner logos */}
        <PartnersCarousel />

        {/* Business Stats */}
        <StatsSection />

        {/* Why NexMentor Solutions? */}
        <WhyUsSection />

        {/* The NEXMENTOR RISE Framework */}
        <RiseFrameworkSection />

        {/* Flexible Learning Options Section (Image 2) */}
        <TrainingModesSection
          onOpenContact={(modeTitle) => handleOpenContact(modeTitle)}
        />

        {/* Client & Learner Testimonials */}
        <TestimonialsSection />
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
    </div>
  );
}

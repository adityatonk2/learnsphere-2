"use client";

import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { SolutionsSection } from './components/SolutionsSection';
import { TrainingModesSection } from './components/TrainingModesSection';
import { CourseDirectorySection } from './components/CourseDirectorySection';
import { AboutSection } from './components/AboutSection';
import { ContactModal } from './components/ContactModal';
import { Footer } from './components/Footer';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [contactDefaultSubject, setContactDefaultSubject] = useState<string>('');

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
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-sky-500 selection:text-white">
      {/* Header with Sticky Navbar & Learning Options Dropdown */}
      <Header
        onOpenContact={() => handleOpenContact()}
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

        {/* Flexible Learning Options Section (Image 2) */}
        <TrainingModesSection
          onOpenContact={(modeTitle) => handleOpenContact(modeTitle)}
        />

        {/* Certification Directory Section (Image 3) */}
        <CourseDirectorySection
          onOpenContact={(courseName) => handleOpenContact(courseName)}
        />

        {/* About LearnSphere Technologies & Callout Card (Image 1 bottom) */}
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
    </div>
  );
}

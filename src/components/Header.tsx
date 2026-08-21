"use client";

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Menu, X, Globe, Phone, Mail, Sparkles, BookOpen } from 'lucide-react';
import { LEARNING_OPTIONS } from '../data/coursesData';

interface HeaderProps {
  onOpenContact: (subject?: string) => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenContact, activeSection, setActiveSection }) => {
  const [learningDropdownOpen, setLearningDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setLearningDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    setLearningDropdownOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-xs transition-all">
      {/* Top micro bar for global reach */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 sm:px-8 flex justify-between items-center border-b border-slate-800">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer">
            <Globe className="w-3.5 h-3.5 text-sky-400" /> Global Training Delivery across 40+ Countries
          </span>
          <span className="hidden md:flex items-center gap-1.5 hover:text-white transition-colors">
            <Phone className="w-3.5 h-3.5 text-sky-400" /> Enterprise Support: +1 (800) 555-8920
          </span>
        </div>
        <div className="flex items-center gap-4">
          <a href="mailto:contact@nexmentorsolutions.com" className="hover:text-white transition-colors flex items-center gap-1">
            <Mail className="w-3.5 h-3.5 text-sky-400" /> contact@nexmentorsolutions.com
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <div 
          onClick={() => scrollToSection('home')} 
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#003B73] via-[#0B5198] to-[#0088FF] p-0.5 shadow-md group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-white rounded-full flex items-center justify-center p-1.5">
              <svg viewBox="0 0 100 100" className="w-full h-full text-[#0B5198]" fill="currentColor">
                <circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" strokeWidth="8" />
                <ellipse cx="50" cy="50" rx="45" ry="16" fill="none" stroke="#00A3FF" strokeWidth="6" transform="rotate(-25 50 50)" />
                <circle cx="50" cy="50" r="14" fill="#0B5198" />
              </svg>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-[#0A2540] flex items-center gap-1">
              NexMentor
            </span>
            <span className="text-[10px] font-semibold tracking-widest text-slate-500 uppercase -mt-1">
              Solutions
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          <button
            onClick={() => scrollToSection('home')}
            className={`text-sm font-medium transition-colors relative py-2 ${
              activeSection === 'home' ? 'text-[#0B5198] font-semibold' : 'text-slate-700 hover:text-[#0B5198]'
            }`}
          >
            Home
            {activeSection === 'home' && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#0B5198] rounded-full" />
            )}
          </button>

          {/* Learning Options Dropdown as shown in Image 4 */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setLearningDropdownOpen(!learningDropdownOpen)}
              className="flex items-center gap-1.5 text-sm font-medium text-slate-700 hover:text-[#0B5198] py-2 transition-colors focus:outline-none"
            >
              <span>Learning Options</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${learningDropdownOpen ? 'rotate-180 text-[#0B5198]' : 'text-slate-400'}`} />
            </button>

            {/* Dropdown Menu Popup (Matching Image 4) */}
            {learningDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="h-1 w-full bg-[#00A3FF] rounded-t-xl" />
                <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Delivery Formats
                </div>
                {LEARNING_OPTIONS.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      scrollToSection('training-modes');
                      setLearningDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 hover:text-[#0B5198] hover:font-medium transition-colors flex items-center justify-between group"
                  >
                    <span>{option}</span>
                    <span className="opacity-0 group-hover:opacity-100 text-[#00A3FF] text-xs transition-opacity">→</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => scrollToSection('solutions')}
            className={`text-sm font-medium transition-colors relative py-2 ${
              activeSection === 'solutions' ? 'text-[#0B5198] font-semibold' : 'text-slate-700 hover:text-[#0B5198]'
            }`}
          >
            Solutions
            {activeSection === 'solutions' && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#0B5198] rounded-full" />
            )}
          </button>

          <button
            onClick={() => scrollToSection('courses')}
            className={`text-sm font-medium transition-colors relative py-2 ${
              activeSection === 'courses' ? 'text-[#0B5198] font-semibold' : 'text-slate-700 hover:text-[#0B5198]'
            }`}
          >
            Courses
            {activeSection === 'courses' && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#0B5198] rounded-full" />
            )}
          </button>

          <button
            onClick={() => scrollToSection('about')}
            className={`text-sm font-medium transition-colors relative py-2 ${
              activeSection === 'about' ? 'text-[#0B5198] font-semibold' : 'text-slate-700 hover:text-[#0B5198]'
            }`}
          >
            About Us
            {activeSection === 'about' && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#0B5198] rounded-full" />
            )}
          </button>

          <button
            onClick={() => onOpenContact()}
            className="text-sm font-medium text-slate-700 hover:text-[#0B5198] transition-colors py-2"
          >
            Contact
          </button>
        </nav>

        {/* Action Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={() => onOpenContact('Connect with Course Advisor')}
            className="text-sm font-semibold text-[#0B5198] border border-[#0B5198]/30 hover:border-[#0B5198] hover:bg-sky-50 px-5 py-2.5 rounded-lg transition-all active:scale-95"
          >
            Connect with Advisor
          </button>
          <button
            onClick={() => onOpenContact()}
            className="bg-[#0052CC] hover:bg-[#003B99] text-white px-6 py-2.5 rounded-lg text-sm font-semibold shadow-md hover:shadow-lg transition-all active:scale-95"
          >
            Get Started
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 shadow-xl">
          <button
            onClick={() => scrollToSection('home')}
            className="block w-full text-left py-2 px-3 text-base font-medium text-slate-800 hover:bg-slate-50 rounded-lg"
          >
            Home
          </button>

          <div className="space-y-1 pl-3 border-l-2 border-sky-200">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block py-1">
              Learning Options
            </span>
            {LEARNING_OPTIONS.slice(0, 5).map((item, idx) => (
              <button
                key={idx}
                onClick={() => scrollToSection('training-modes')}
                className="block w-full text-left py-1.5 text-sm text-slate-600 hover:text-[#0B5198]"
              >
                {item}
              </button>
            ))}
          </div>

          <button
            onClick={() => scrollToSection('solutions')}
            className="block w-full text-left py-2 px-3 text-base font-medium text-slate-800 hover:bg-slate-50 rounded-lg"
          >
            Solutions
          </button>
          <button
            onClick={() => scrollToSection('courses')}
            className="block w-full text-left py-2 px-3 text-base font-medium text-slate-800 hover:bg-slate-50 rounded-lg"
          >
            Courses Directory
          </button>
          <button
            onClick={() => scrollToSection('about')}
            className="block w-full text-left py-2 px-3 text-base font-medium text-slate-800 hover:bg-slate-50 rounded-lg"
          >
            About Us
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenContact('Connect with Course Advisor');
            }}
            className="w-full mt-2 border border-[#0B5198] text-[#0B5198] py-3 rounded-lg font-semibold text-center"
          >
            Connect with Advisor
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenContact();
            }}
            className="w-full bg-[#0052CC] text-white py-3 rounded-lg font-semibold text-center shadow-md"
          >
            Get Started
          </button>
        </div>
      )}
    </header>
  );
};

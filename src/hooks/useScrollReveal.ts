"use client";

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type ScrollRevealOptions = {
  y?: number;
  x?: number;
  opacity?: number;
  duration?: number;
  stagger?: number;
  ease?: string;
  trigger?: string | Element;
  start?: string;
};

export function useScrollReveal(options: ScrollRevealOptions = {}) {
  const containerRef = useRef<HTMLDivElement>(null);

  const {
    y = 40,
    x = 0,
    opacity = 0,
    duration = 0.8,
    stagger = 0.15,
    ease = 'power3.out',
    trigger,
    start = 'top 85%',
  } = options;

  useGSAP(() => {
    gsap.fromTo(
      '.gsap-reveal',
      { y, x, opacity },
      {
        y: 0,
        x: 0,
        opacity: 1,
        duration,
        stagger,
        ease,
        scrollTrigger: {
          trigger: trigger || containerRef.current,
          start,
          toggleActions: 'play none none none',
        },
      }
    );
  }, { scope: containerRef });

  return containerRef;
}

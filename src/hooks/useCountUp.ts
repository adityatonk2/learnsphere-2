"use client";

import { useEffect, useRef, useState } from 'react';

/**
 * Animates a number from 0 up to `target` each time the element scrolls into
 * view (not just once) — replays on every reveal, e.g. scrolling away and back.
 * Returns a ref to attach to the trigger element and the current display value.
 */
export function useCountUp(target: number, options: { duration?: number } = {}) {
  const { duration = 2800 } = options;
  const ref = useRef<HTMLElement | null>(null);
  const [value, setValue] = useState(0);
  const rafId = useRef<number | null>(null);
  const isVisible = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const runAnimation = () => {
      if (rafId.current != null) cancelAnimationFrame(rafId.current);
      const startTime = performance.now();
      setValue(0);

      const tick = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // ease-out-cubic
        const eased = 1 - Math.pow(1 - progress, 5);
        setValue(Math.floor(eased * target));
        if (progress < 1) {
          rafId.current = requestAnimationFrame(tick);
        } else {
          setValue(target);
          rafId.current = null;
        }
      };
      rafId.current = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible.current) {
            isVisible.current = true;
            runAnimation();
          } else if (!entry.isIntersecting) {
            isVisible.current = false;
          }
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      if (rafId.current != null) cancelAnimationFrame(rafId.current);
    };
  }, [target, duration]);

  return { ref, value };
}

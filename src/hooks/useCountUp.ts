"use client";

import { useEffect, useRef, useState } from 'react';

/**
 * Animates a number from 0 up to `target` once the element scrolls into view.
 * Returns a ref to attach to the trigger element and the current display value.
 */
export function useCountUp(target: number, options: { duration?: number; start?: string } = {}) {
  const { duration = 1600 } = options;
  const ref = useRef<HTMLElement | null>(null);
  const [value, setValue] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            const startTime = performance.now();

            const tick = (now: number) => {
              const elapsed = now - startTime;
              const progress = Math.min(elapsed / duration, 1);
              // ease-out-cubic
              const eased = 1 - Math.pow(1 - progress, 3);
              setValue(Math.floor(eased * target));
              if (progress < 1) {
                requestAnimationFrame(tick);
              } else {
                setValue(target);
              }
            };
            requestAnimationFrame(tick);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [target, duration]);

  return { ref, value };
}

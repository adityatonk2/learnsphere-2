"use client";

import React from 'react';
import { useCountUp } from '../hooks/useCountUp';

interface StatCounterProps {
  target: number;
  suffix?: string;
  decimals?: number;
  label: string;
  valueClassName?: string;
  labelClassName?: string;
}

export const StatCounter: React.FC<StatCounterProps> = ({
  target,
  suffix = '',
  decimals = 0,
  label,
  valueClassName = 'text-2xl font-black text-white',
  labelClassName = 'text-xs text-sky-200',
}) => {
  // Animate against a scaled integer so decimals stay smooth, then divide back down for display.
  const scale = Math.pow(10, decimals);
  const { ref, value } = useCountUp(Math.round(target * scale));
  const displayValue = (value / scale).toFixed(decimals);

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className="flex flex-col gsap-reveal">
      <span className={valueClassName}>
        {displayValue}
        {suffix}
      </span>
      <span className={labelClassName}>{label}</span>
    </div>
  );
};

'use client';

import React from 'react';

type GridProps = {
  children: React.ReactNode;
  cols?: number | string;
  gap?: string;
  className?: string;
};

export default function Grid({ children, cols = 3, gap = 'gap-6', className = '' }: GridProps) {
  const colsClass = typeof cols === 'number' ? `grid-cols-${cols}` : cols;
  return <div className={`grid ${colsClass} ${gap} ${className}`}>{children}</div>;
}

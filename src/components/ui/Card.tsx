'use client';

import React from 'react';

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
  title?: string;
  footer?: React.ReactNode;
  tone?: 'default' | 'muted' | 'accent';
};

export default function Card({ children, title, footer, tone = 'default', className = '', ...rest }: CardProps) {
  const toneClass = {
    default: 'bg-white text-black',
    muted: 'bg-gray-50 text-gray-800',
    accent: 'bg-teal-50 text-teal-900'
  }[tone];

  // If caller provided padding utilities (p-, px-, py- or !p- override),
  // don't add the default inner padding. This prevents double-padding when
  // callers pass e.g. `className="p-6"` or `!p-0`.
  const hasPadding = /(^|\s)(!p-|p-|px-|py-)/.test(className);

  return (
    <div className={`rounded-lg shadow-sm border overflow-hidden ${toneClass} ${className}`} {...rest}>
      {title && (
        <div className="px-4 py-3 border-b border-gray-100 font-semibold">{title}</div>
      )}
      {/* Only add default padding when caller hasn't supplied padding utilities */}
      {hasPadding ? (
        <>{children}</>
      ) : (
        <div className="p-4">{children}</div>
      )}
      {footer && (
        <div className="px-4 py-3 border-t border-gray-100">{footer}</div>
      )}
    </div>
  );
}

"use client";

import Link from 'next/link';
import React from 'react';

type Variant = 'primary' | 'secondary' | 'ghost';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  href?: string;
  variant?: Variant;
  className?: string;
}

export function Button({ children, href, variant = 'primary', className = '', disabled, ...rest }: ButtonProps) {
  const base = 'inline-flex items-center justify-center rounded-md px-4 py-2 font-semibold transition-all';
  const variants: Record<Variant, string> = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    ghost: 'bg-transparent text-[rgba(230,240,255,0.9)] hover:text-white',
  };

  const classes = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      // next/link handles anchors — className forwarded for styling
      <Link href={href} className={classes} {...(rest as any)}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} disabled={disabled} {...rest}>
      {children}
    </button>
  );
}

export default Button;

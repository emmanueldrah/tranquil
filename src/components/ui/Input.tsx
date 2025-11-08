'use client';

import React from 'react';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string | null;
  helper?: string | null;
};

export default function Input({ label, error, helper, className = '', ...props }: InputProps) {
  return (
    <div className={`w-full ${className}`}>
      {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
      <input
        {...props}
        className={`block w-full rounded-md border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white text-black ${error ? 'border-red-500' : ''}`}
      />
      {helper && <p className="text-xs text-gray-500 mt-1">{helper}</p>}
      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </div>
  );
}

'use client';

import React from 'react';

type Props = {
  message?: string | null;
};

export default function ErrorBanner({ message }: Props) {
  if (!message) return null;
  return (
    <div role="alert" className="w-full rounded-md bg-red-50 border border-red-100 text-red-700 px-4 py-3">
      <strong className="font-medium">Error: </strong>
      <span className="ml-2">{message}</span>
    </div>
  );
}

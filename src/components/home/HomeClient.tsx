'use client';

import { useState } from 'react';
import { CategorySidebar } from './CategorySidebar';

interface HomeClientProps {
  children: React.ReactNode;
}

export default function HomeClient({ children }: HomeClientProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-teal">
      {/* Category Sidebar */}
      <CategorySidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <main className="w-full">
        {/* Menu Button */}
        <div className="p-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {children}
      </main>
    </div>
  );
}

'use client';

import React from 'react';

interface TabContentProps {
  isActive: boolean;
  children: React.ReactNode;
}

export default function TabContent({ isActive, children }: TabContentProps) {
  return (
    <div
      className={`transition-opacity duration-300 ${
        isActive ? 'opacity-100' : 'opacity-0 hidden'
      }`}
    >
      {children}
    </div>
  );
}

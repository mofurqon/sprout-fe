'use client';

import React from 'react';

export default function Loading() {
  return (
    <div className="min-h-screen font-sans bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600 font-medium">Loading Pokémon data...</p>
      </div>
    </div>
  );
}

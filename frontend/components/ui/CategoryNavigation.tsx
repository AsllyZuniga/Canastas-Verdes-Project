"use client";

import Link from "next/link";
import { useState } from "react";

export default function CategoryNavigation({ categories }: { categories: {id: number, name: string}[] }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className="relative group"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button className="text-green-100 hover:text-white hover:bg-green-800 font-medium px-5 py-2 rounded-full text-sm transition-colors flex items-center gap-2">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        Categorías
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-green-100 py-4 z-50 overflow-hidden">
          <div className="grid grid-cols-1 gap-1 max-h-96 overflow-y-auto custom-scrollbar px-2">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/${category.id}`}
                  className="block px-4 py-2.5 text-sm text-green-900 hover:bg-green-50 hover:text-green-700 font-medium rounded-xl transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {category.name}
                </Link>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

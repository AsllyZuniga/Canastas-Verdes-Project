"use client";

import { useStore } from "@/src/store";

export default function CartButton() {
  const toggleCart = useStore(state => state.toggleCart);
  
  return (
    <button 
      onClick={toggleCart}
      className="rounded-full bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-6 text-sm transition-transform hover:scale-105 shadow-md flex items-center gap-2"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
      Tu Canasta
    </button>
  );
}

"use client";

import { useStore } from "@/src/store";

export default function FloatingCart() {
  const contents = useStore((state) => state.contents);
  const toggleCart = useStore((state) => state.toggleCart);
  const isCartOpen = useStore((state) => state.isCartOpen);

  // Calculate total items
  const totalItems = contents.reduce((acc, item) => acc + item.quantity, 0);

  if (isCartOpen) return null;

  return (
    <button
      onClick={toggleCart}
      className="fixed top-1/2 right-0 -translate-y-1/2 z-[60] bg-green-500 hover:bg-green-400 text-white p-3 pr-4 rounded-l-2xl shadow-[-5px_0_20px_rgba(34,197,94,0.4)] transition-transform hover:scale-105 flex flex-col items-center justify-center focus:outline-none focus:ring-4 focus:ring-green-300"
      aria-label="Abrir carrito"
    >
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
      {totalItems > 0 && (
        <span className="absolute -top-2 -left-2 bg-red-500 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full border-2 border-white">
          {totalItems}
        </span>
      )}
    </button>
  );
}

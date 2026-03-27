"use client";

import { useStore } from "@/src/store";
import ShoppingCart from "./ShoppingCart";

export default function CartDrawer() {
  const isCartOpen = useStore((state) => state.isCartOpen);
  const toggleCart = useStore((state) => state.toggleCart);

  return (
    <>
      {/* Backdrop */}
      {isCartOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity" 
          onClick={toggleCart} 
        />
      )}
      
      {/* Drawer */}
      <aside 
        className={`fixed top-0 right-0 h-screen w-full md:w-[450px] bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out overflow-y-scroll pt-10 pb-32 px-8
        ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <button 
          onClick={toggleCart} 
          className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-full transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <div className="mt-6">
            <ShoppingCart />
        </div>
      </aside>
    </>
  );
}

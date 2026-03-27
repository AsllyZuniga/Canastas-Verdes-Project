"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

type CategoryType = { id: number; name: string };

export default function CategoryCarousel({ categories }: { categories: CategoryType[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeCategoryId = searchParams.get('categoryId');

  // We have 3 generated backgrounds, we cycle through them
  const getBackgroundImage = (index: number) => {
    return `/categories/${(index % 3) + 1}.png`;
  };

  const setCategoryFilter = (id: number | null) => {
    if (id === null) {
      router.push('/', { scroll: false });
    } else {
      router.push(`/?categoryId=${id}`, { scroll: false });
    }
  };

  return (
    <div className="relative z-20 w-full -mt-24 md:-mt-32 mb-16">
      <div className="bg-white/95 backdrop-blur-md rounded-t-3xl pt-8 pb-6 px-4 md:px-10 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.3)] border-t border-green-50">
        <h2 className="text-2xl md:text-3xl font-black text-green-900 mb-6 px-2">
          ¿Qué buscas hoy? <span className="text-green-500 font-medium">Explora nuestras categorías</span>
        </h2>
        
        {/* Scrollable container */}
        <div className="flex overflow-x-auto gap-5 pb-8 pt-2 px-2 custom-scrollbar snap-x">
          {/* Tarjeta "Ver Todas" */}
          <button 
             onClick={() => setCategoryFilter(null)}
             className={`relative flex-none w-64 h-48 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group snap-start border text-left
              ${!activeCategoryId ? 'border-green-400 ring-4 ring-green-400/30' : 'border-green-100'}`}
          >
             <div className="absolute inset-0 bg-green-900"></div>
             <div className="absolute inset-0 bg-gradient-to-tr from-green-800 to-green-600 opacity-90"></div>
             <div className="absolute inset-0 p-5 flex flex-col justify-end">
                <h3 className="text-white font-bold text-xl drop-shadow-md group-hover:text-green-200 transition-colors">
                  Todas las categorías
                </h3>
                <div className={`h-1 mt-2 rounded-full transform origin-left transition-all duration-300 
                  ${!activeCategoryId ? 'bg-green-400 w-full' : 'bg-green-400 w-10 group-hover:w-full'}`}></div>
             </div>
          </button>

          {categories.map((category, index) => {
            const isActive = activeCategoryId === category.id.toString();
            return (
              <button 
                key={category.id} 
                onClick={() => setCategoryFilter(category.id)}
                className={`relative flex-none w-64 h-48 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group snap-start border text-left
                ${isActive ? 'border-green-400 ring-4 ring-green-400/30' : 'border-green-100'}`}
              >
                <Image 
                  src={getBackgroundImage(index)} 
                  alt={category.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-green-900/90 via-green-900/40 to-transparent group-hover:from-green-800/90 transition-colors"></div>
                
                <div className="absolute inset-0 p-5 flex flex-col justify-end">
                  <h3 className="text-white font-bold text-xl drop-shadow-md group-hover:text-green-300 transition-colors">
                    {category.name}
                  </h3>
                  <div className={`h-1 mt-2 rounded-full transform origin-left transition-all duration-300 
                    ${isActive ? 'bg-green-400 w-full' : 'bg-green-400 w-10 group-hover:w-full'}`}></div>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  );
}

"use client";

import { ProductVariant } from "@/src/schemas";
import { formatCurrency, getImagePath, isAvailable } from "@/src/utils";
import Image from "next/image";
import AddVariantButton from "./AddVariantButton";

export default function ProductCard({ variant }: { variant: ProductVariant }) {
  return (
    <div className="rounded-3xl bg-white shadow-sm relative overflow-hidden border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group flex flex-col h-full">
      <div className={`flex flex-col h-full ${!isAvailable(variant.inventory) && "opacity-50 grayscale"}`}>
        {/* Imagen */}
        <div className="relative w-full h-56 bg-gray-50 overflow-hidden">
          <Image
            src={getImagePath(variant.product.image ?? "default.svg")}
            alt={`Imagen de ${variant.product.name}`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            priority
          />
          {/* Badge municipio */}
          <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-green-900 border border-green-100 font-semibold text-xs px-3 py-1 rounded-full shadow-sm">
            📍 {variant.municipality.name}
          </span>
        </div>

        {/* Contenido */}
        <div className="p-5 flex flex-col flex-1">
          <h3 className="text-lg font-bold text-gray-800 leading-tight mb-1 group-hover:text-green-600 transition-colors">
            {variant.product.name}
          </h3>
          <p className="text-sm text-gray-500 mb-4 flex-1">
            {variant.presentation.description}
          </p>
          <div className="flex items-end justify-between pt-2 mt-auto border-t border-gray-50 pt-4">
            <div>
              <p className="text-xs text-gray-400 font-medium mb-1">Precio</p>
              <p className="text-2xl font-black text-green-600 tracking-tight">
                {formatCurrency(variant.salePrice)}
              </p>
            </div>
            <p className={`text-xs font-bold px-2 py-1 rounded-md ${variant.inventory > 5 ? 'text-green-700 bg-green-50' : 'text-orange-700 bg-orange-50'}`}>
              {variant.inventory} disp.
            </p>
          </div>
        </div>
      </div>

      {isAvailable(variant.inventory) ? (
        <AddVariantButton variant={variant} />
      ) : (
        <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center z-20">
            <p className="bg-red-500 text-white px-6 py-2 rounded-full font-black text-sm tracking-widest uppercase shadow-lg transform -rotate-12">
            Agotado
            </p>
        </div>
      )}
    </div>
  );
}

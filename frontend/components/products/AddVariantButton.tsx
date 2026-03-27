"use client"

import { ProductVariant } from "@/src/schemas"
import { useStore } from "@/src/store"
import { toast } from "react-toastify"

export default function AddVariantButton({ variant }: { variant: ProductVariant }) {
    const addToCart = useStore(state => state.addToCart)

    // Adaptamos la variante al formato Product que espera el store
    const product = {
        id: variant.id,
        name: `${variant.product.name} (${variant.presentation.description})`,
        image: variant.product.image ?? 'default.svg',
        price: variant.salePrice,
        inventory: variant.inventory,
        categoryId: variant.category.id,
    }

    const handleAdd = () => {
        addToCart(product)
        toast.success(`${variant.product.name} agregado a tu canasta`)
    }

    return (
        <button
            type="button"
            className="absolute top-4 right-4 z-10 transition-transform hover:scale-110 active:scale-95"
            onClick={handleAdd}
            aria-label="Agregar al carrito"
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-12 h-12 p-3 bg-green-500 hover:bg-green-400 shadow-lg rounded-full text-white transition-colors">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        </button>
    )
}
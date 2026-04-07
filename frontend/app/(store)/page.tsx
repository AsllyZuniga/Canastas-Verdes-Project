import ProductCard from "@/components/products/ProductCard"
import Slider from "@/components/ui/Slider"
import Heading from "@/components/ui/Heading"
import { CategoriesResponseSchema, ProductVariantsResponseSchema } from "@/src/schemas"
import CategoryCarousel from "@/components/categories/CategoryCarousel"
import { getImagePath } from "@/src/utils"

const API_BASE_URL = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:3001"

async function getCategories() {
    try {
        const url = `${API_BASE_URL}/categories`;
        const req = await fetch(url, {
            next: {
                tags: ["all-categories"]
            }
        });

        if (!req.ok) {
            return [];
        }

        const json = await req.json();
        return CategoriesResponseSchema.parse(json);
    } catch {
        return [];
    }
}

async function getAllVariants(categoryId?: string) {
        try {
                const url = categoryId
                        ? `${API_BASE_URL}/product-variants?categoryId=${categoryId}`
                        : `${API_BASE_URL}/product-variants`

                const req = await fetch(url, {
                        next: {
                                tags: ['all-products']
                        }
                })

                if (!req.ok) {
                        return []
                }

                const json = await req.json()
                const data = ProductVariantsResponseSchema.parse(json)
                return data.variants
        } catch {
                return []
    }
}

type SearchParams = Promise<{ categoryId?: string }>

export default async function Home({ searchParams }: { searchParams: SearchParams }) {
    const resolvedParams = await searchParams
    const categoryId = resolvedParams?.categoryId
    const variants = await getAllVariants(categoryId)
    const categories = await getCategories()
    const sliderImages = variants
        .map((variant) => variant.product.image)
        .filter((image): image is string => Boolean(image))
        .slice(0, 6)
        .map((image) => getImagePath(image))

    return (
        <div className="pb-10">
            <Slider images={sliderImages} />
            <CategoryCarousel categories={categories} />
            
            <Heading>Nuestros Productos</Heading>
            
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-8">
                {variants.map(variant => (
                    <ProductCard
                        key={variant.id}
                        variant={variant}
                    />
                ))}
            </div>
            {variants.length === 0 && (
                <p className="text-center text-gray-500 mt-10">No hay productos disponibles por ahora.</p>
            )}
        </div>
    )
}

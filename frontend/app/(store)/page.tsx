import ProductCard from "@/components/products/ProductCard"
import Slider from "@/components/ui/Slider"
import Heading from "@/components/ui/Heading"
import { CategoriesResponseSchema, ProductVariantsResponseSchema } from "@/src/schemas"
import { redirect } from "next/navigation"
import CategoryCarousel from "@/components/categories/CategoryCarousel"

async function getCategories() {
  const url = `${process.env.API_URL}/categories`;
  const req = await fetch(url);
  const json = await req.json();
  const categories = CategoriesResponseSchema.parse(json);
  return categories;
}

async function getAllVariants(categoryId?: string) {
    const url = categoryId
        ? `${process.env.API_URL}/product-variants?categoryId=${categoryId}`
        : `${process.env.API_URL}/product-variants`
    
    const req = await fetch(url, {
        next: {
            tags: ['all-products']
        }
    })
    const json = await req.json()
    if (!req.ok) {
        redirect('/1')
    }
    const data = ProductVariantsResponseSchema.parse(json)
    return data.variants
}

type SearchParams = Promise<{ categoryId?: string }>

export default async function Home({ searchParams }: { searchParams: SearchParams }) {
    const resolvedParams = await searchParams
    const categoryId = resolvedParams?.categoryId
    const variants = await getAllVariants(categoryId)
    const categories = await getCategories()

    return (
        <div className="pb-10">
            <Slider />
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

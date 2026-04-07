import ProductCard from "@/components/products/ProductCard"
import { ProductVariantsArraySchema } from "@/src/schemas"

type Params = Promise<{ categoryId: string }>

const API_BASE_URL = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:3001"

async function getVariantsByCategory(categoryId: string) {
    try {
        const url = `${API_BASE_URL}/product-variants?categoryId=${categoryId}`
        const req = await fetch(url, {
            next: {
                tags: ['products-by-category']
            }
        })

        if (!req.ok) {
            return []
        }

        const json = await req.json()
        return ProductVariantsArraySchema.parse(json.variants)
    } catch {
        return []
    }
}

export default async function StorePage({ params }: { params: Params }) {
    const { categoryId } = await params
    const variants = await getVariantsByCategory(categoryId)

    return (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {variants.map(variant => (
                <ProductCard
                    key={variant.id}
                    variant={variant}
                />
            ))}
        </div>
    )
}
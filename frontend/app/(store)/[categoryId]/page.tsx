import ProductCard from "@/components/products/ProductCard"
import { ProductVariantsArraySchema } from "@/src/schemas"
import { redirect } from "next/navigation"

type Params = Promise<{ categoryId: string }>

async function getVariantsByCategory(categoryId: string) {
    const url = `${process.env.API_URL}/product-variants?categoryId=${categoryId}`
    const req = await fetch(url, {
        next: {
            tags: ['products-by-category']
        }
    })
    const json = await req.json()
    if (!req.ok) {
        redirect('/1')
    }
    return ProductVariantsArraySchema.parse(json.variants)
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
import EditVariantForm from "@/components/products/EditVariantForm"
import VariantForm from "@/components/products/VariantForm"
import Heading from "@/components/ui/Heading"
import { ProductVariantSchema } from "@/src/schemas"
import Link from "next/link"
import { notFound } from "next/navigation"

async function getVariant(id: string) {
    const url = `${process.env.API_URL}/product-variants/${id}`
    const req = await fetch(url)
    const json = await req.json()
    if (!req.ok) notFound()
    return ProductVariantSchema.parse(json)
}

type Params = Promise<{ id: string }>

export default async function EditProductPage({ params }: { params: Params }) {
    const { id } = await params
    const variant = await getVariant(id)

    return (
        <>
            <Link
                href="/admin/products?page=1"
                className="rounded bg-green-400 font-bold py-2 px-10"
            >
                Volver
            </Link>

            <Heading>Editar Producto: {variant.product.name}</Heading>

            <EditVariantForm>
                <VariantForm variant={variant} />
            </EditVariantForm>
        </>
    )
}
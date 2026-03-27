import { ProductVariant } from "@/src/schemas"
import { revalidatePath } from "next/cache"

export default function DeleteVariantForm({ variantId }: { variantId: ProductVariant['id'] }) {

    const handleDelete = async () => {
        "use server"
        const url = `${process.env.API_URL}/product-variants/${variantId}`
        await fetch(url, { method: 'DELETE' })
        revalidatePath('/admin/products')
    }

    return (
        <form action={handleDelete}>
            <input
                type="submit"
                className="text-red-600 hover:text-red-800 cursor-pointer"
                value="Eliminar"
            />
        </form>
    )
}
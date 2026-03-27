"use server"

import { ErrorResponseSchema, VariantFormSchema } from "@/src/schemas"
import { revalidatePath } from "next/cache"

type ActionStateType = {
    errors: string[]
    success: string
}

export async function addVariant(prevState: ActionStateType, formData: FormData) {

    const variant = VariantFormSchema.safeParse({
        sku:            formData.get('sku'),
        costPcc:        formData.get('costPcc'),
        logisticsCost:  formData.get('logisticsCost'),
        transportCost:  formData.get('transportCost'),
        suggestedPrice: formData.get('suggestedPrice'),
        salePrice:      formData.get('salePrice'),
        inventory:      formData.get('inventory'),
        productName:    formData.get('productName'),
        categoryId:     formData.get('categoryId'),
        municipalityId: formData.get('municipalityId'),
        presentationId: formData.get('presentationId'),
        farmId:         formData.get('farmId') || undefined,
    })

    if (!variant.success) {
        return {
            errors: variant.error.issues.map(issue => issue.message),
            success: ''
        }
    }

    const url = `${process.env.API_URL}/product-variants`
    const req = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(variant.data)
    })
    const json = await req.json()

    if (!req.ok) {
        const errors = ErrorResponseSchema.parse(json)
        return {
            errors: errors.message.map(issue => issue),
            success: ''
        }
    }

    revalidatePath('/admin/products')
    return {
        errors: [],
        success: 'Producto Agregado Correctamente'
    }
}
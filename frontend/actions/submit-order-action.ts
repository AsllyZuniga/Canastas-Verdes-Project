"use server"

import { OrderSchema, SuccessResponseSchema } from "@/src/schemas"
import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"

export async function submitOrder(data: unknown) {
    const order = OrderSchema.parse(data)
    const authToken = (await cookies()).get('auth_token')?.value

    if (!authToken) {
        return {
            errors: ['Debes iniciar sesion para confirmar tu compra'],
            success: ''
        }
    }

    const payload = {
        contents: order.contents.map(item => ({
            productVariantId: item.productId,
            quantity: item.quantity,
            price: item.price
        }))
    }

    const url = `${process.env.API_URL}/transactions`
    const req = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify(payload)
    })

    const json = await req.json().catch(() => null)
    if (!req.ok) {
        if (req.status === 401 || req.status === 403) {
            return {
                errors: ['Tu sesion expiro. Inicia sesion nuevamente.'],
                success: ''
            }
        }

        const message = Array.isArray(json?.message)
            ? json.message
            : [json?.message || 'No se pudo registrar la compra']

        return {
            errors: message,
            success: ''
        }
    }

    const success = SuccessResponseSchema.parse(json)
    revalidateTag('products-by-category')

    return {
        errors: [],
        success: success.message
    }
}
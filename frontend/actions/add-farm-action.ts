"use server"

import { ErrorResponseSchema, FarmFormSchema } from "@/src/schemas"
import { revalidatePath } from "next/cache"

type ActionStateType = {
    errors: string[]
    success: string
}

export async function addFarm(prevState: ActionStateType, formData: FormData) {

    const farm = FarmFormSchema.safeParse({
        name:         formData.get('name'),
        description:  formData.get('description'),
        address:      formData.get('address'),
        municipality: formData.get('municipality'),
        department:   formData.get('department'),
        phone:        formData.get('phone'),
        email:        formData.get('email') || undefined,
        image:        formData.get('image'),
    })

    if (!farm.success) {
        return {
            errors: farm.error.issues.map(issue => issue.message),
            success: ''
        }
    }

    const url = `${process.env.API_URL}/farms`
    const req = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(farm.data)
    })
    const json = await req.json()

    if (!req.ok) {
        const errors = ErrorResponseSchema.parse(json)
        return {
            errors: errors.message.map(issue => issue),
            success: ''
        }
    }

    revalidatePath('/admin/farms')
    return {
        errors: [],
        success: 'Finca Creada Correctamente'
    }
}
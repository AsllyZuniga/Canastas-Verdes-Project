"use client"

import { addVariant } from "@/actions/add-variant-action"
import { useRouter } from "next/navigation"
import { useActionState, useEffect } from "react"
import { toast } from "react-toastify"

export default function AddVariantForm({ children }: { children: React.ReactNode }) {

    const router = useRouter()

    const [state, dispatch] = useActionState(addVariant, {
        errors: [],
        success: ''
    })

    useEffect(() => {
        if (state.errors) {
            state.errors.forEach(error => toast.error(error))
        }
        if (state.success) {
            toast.success(state.success)
            router.push('/admin/products?page=1')
        }
    }, [state])

    return (
        <form
            className="space-y-5"
            action={dispatch}
        >
            {children}
            <input
                type="submit"
                className="rounded bg-green-400 font-bold py-2 w-full cursor-pointer"
                value="Agregar Producto"
            />
        </form>
    )
}
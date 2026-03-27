"use client"

import { updateFarm } from "@/actions/update-farm-action"
import { useParams, useRouter } from "next/navigation"
import { useActionState, useEffect } from "react"
import { toast } from "react-toastify"

export default function EditFarmForm({ children }: { children: React.ReactNode }) {

    const router = useRouter()
    const { id } = useParams<{ id: string }>()

    const updateFarmWithId = updateFarm.bind(null, +id)
    const [state, dispatch] = useActionState(updateFarmWithId, {
        errors: [],
        success: ''
    })

    useEffect(() => {
        if (state.errors) {
            state.errors.forEach(error => toast.error(error))
        }
        if (state.success) {
            toast.success(state.success)
            router.push('/admin/farms')
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
                value="Guardar Cambios"
            />
        </form>
    )
}
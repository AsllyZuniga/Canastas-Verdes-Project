"use client"

import { submitOrder } from "@/actions/submit-order-action"
import { useActionState, useEffect } from "react"
import { useStore } from "@/src/store"
import { toast } from "react-toastify"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

export default function SubmitOrderForm() {

    const total = useStore(state => state.total)
    const coupon = useStore(state => state.coupon.name)
    const contents = useStore(state => state.contents)
    const clearOrder = useStore(state => state.clearOrder)
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const order = {
        total,
        coupon,
        contents
    }

    const submitOrderWithData = submitOrder.bind(null, order)
    const [state, dispatch] = useActionState(submitOrderWithData, {
        errors: [],
        success: ''
    })

    useEffect(() => {
        if (state.errors) {
            state.errors.forEach((error: string) => toast.error(error))
        }
        if (state.success) {
            toast.success(state.success)
            clearOrder()
        }
    }, [state, clearOrder])

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        const hasUserRoleCookie = /(?:^|; )user_role=/.test(document.cookie)

        if (!hasUserRoleCookie) {
            event.preventDefault()

            const query = searchParams.toString()
            const redirectTo = query ? `${pathname}?${query}` : pathname
            router.push(`/auth/login?redirectTo=${encodeURIComponent(redirectTo)}`)
        }
    }

    return (
        <form action={dispatch} onSubmit={handleSubmit}>
            <input
                type="submit"
                className="mt-5 w-full bg-green-700 hover:bg-green-800 cursor-pointer text-white uppercase font-bold p-3 rounded-xl tracking-wider"
                value="Confirmar Compra"
            />
        </form>
    )
}
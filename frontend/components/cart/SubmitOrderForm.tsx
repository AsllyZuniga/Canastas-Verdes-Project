"use client"

import { submitOrder } from "@/actions/submit-order-action"
import { useActionState, useEffect } from "react"
import { useStore } from "@/src/store"
import { toast } from "react-toastify"

export default function SubmitOrderForm() {

    const total = useStore(state => state.total)
    const coupon = useStore(state => state.coupon.name)
    const contents = useStore(state => state.contents)
    const clearOrder = useStore(state => state.clearOrder)

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
            state.errors.forEach(error => toast.error(error))
        }
        if (state.success) {
            toast.success(state.success)
            clearOrder()
        }
    }, [state, clearOrder])

    return (
        <form action={dispatch}>
            <input
                type="submit"
                className="mt-5 w-full bg-green-700 hover:bg-green-800 cursor-pointer text-white uppercase font-bold p-3 rounded-xl tracking-wider"
                value="Confirmar Compra"
            />
        </form>
    )
}
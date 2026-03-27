"use client"

import { useStore } from "@/src/store"
import ShoppingCartItem from "./ShoppingCartItem"
import Amount from "./Amount"
import CouponForm from "./CouponForm"
import SubmitOrderForm from "./SubmitOrderForm"

export default function ShoppingCart() {
    const contents = useStore(state => state.contents)
    const total = useStore(state => state.total)
    const discount = useStore(state => state.discount)

    return (
        <div className="h-full flex flex-col">
            {/* Header del carrito */}
            <div className="pb-4 border-b-2 border-green-200 mb-4">
                <h2 className="text-2xl font-bold text-green-900 flex items-center gap-2">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Tu Canasta
                </h2>
                <p className="text-green-700 text-xs mt-1">
                    Productos frescos del campo
                </p>
            </div>

            {contents.length ? (
                <>
                    <ul role="list" className="flex-1 divide-y divide-green-100 overflow-y-auto text-sm font-medium text-gray-600">
                        {contents.map(item => (
                            <ShoppingCartItem
                                key={item.productId}
                                item={item}
                            />
                        ))}
                    </ul>

                    <div className="mt-4 space-y-3 border-t-2 border-green-200 pt-4">
                        {discount ? (
                            <Amount
                                label="Descuento"
                                amount={discount}
                                discount={true}
                            />
                        ) : null}

                        <div className="bg-green-50 rounded-xl p-3 border border-green-200">
                            <Amount
                                label="Total a Pagar"
                                amount={total}
                            />
                        </div>
                    </div>

                    <div className="mt-4 space-y-3">
                        <CouponForm />
                        <SubmitOrderForm />
                    </div>
                </>
            ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center gap-3 py-10">
                    <div className="w-16 h-16 text-green-600 bg-green-50 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                    </div>
                    <p className="text-lg font-semibold text-green-900">
                        Tu canasta está vacía
                    </p>
                    <p className="text-sm text-gray-500">
                        Agrega productos frescos del campo
                    </p>
                </div>
            )}
        </div>
    )
}
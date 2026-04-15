"use client";

import Image from "next/image";
import Link from "next/link";
import { useStore } from "@/src/store";
import { formatCurrency, getImagePath } from "@/src/utils";

export default function ClientPendingPage() {
  const contents = useStore((state) => state.contents);
  const total = useStore((state) => state.total);

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-black text-slate-900">Compras Pendientes</h2>
        <p className="mt-1 text-sm text-slate-600">
          Estos son los productos agregados al carrito y aun no confirmados.
        </p>
      </div>

      {contents.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-600">
          Tu carrito esta vacio. Agrega productos desde el catalogo.
          <div className="mt-4">
            <Link
              href="/client/catalog"
              className="inline-block rounded-lg bg-emerald-700 px-4 py-2 text-sm font-bold text-white transition hover:bg-emerald-800"
            >
              Ir al Catalogo
            </Link>
          </div>
        </div>
      ) : (
        <>
          <ul className="space-y-4">
            {contents.map((item) => (
              <li key={item.productId} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="relative h-16 w-16 overflow-hidden rounded-lg bg-slate-100">
                    <Image
                      src={getImagePath(item.image ?? "default.svg")}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <p className="font-semibold text-slate-800">{item.name}</p>
                    <p className="text-sm text-slate-500">Cantidad: {item.quantity}</p>
                  </div>

                  <p className="font-bold text-slate-800">
                    {formatCurrency(item.price * item.quantity)}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-right">
            <p className="text-sm text-slate-600">Total pendiente</p>
            <p className="text-2xl font-black text-emerald-800">{formatCurrency(total)}</p>
          </div>
        </>
      )}
    </div>
  );
}

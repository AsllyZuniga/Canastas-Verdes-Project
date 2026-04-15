import Image from "next/image";
import { cookies } from "next/headers";
import { TransactionsResponseSchema } from "@/src/schemas";
import { formatCurrency, getImagePath } from "@/src/utils";

const API_BASE_URL =
  process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:3001";

const statusLabel: Record<string, string> = {
  pending: "Pendiente",
  confirmed: "Confirmada",
  delivered: "Entregada",
  cancelled: "Cancelada",
};

const statusClass: Record<string, string> = {
  pending: "bg-amber-100 text-amber-700",
  confirmed: "bg-blue-100 text-blue-700",
  delivered: "bg-emerald-100 text-emerald-700",
  cancelled: "bg-rose-100 text-rose-700",
};

async function getMyOrders(token: string) {
  const req = await fetch(`${API_BASE_URL}/transactions/my`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!req.ok) {
    return [];
  }

  const json = await req.json();
  const parsed = TransactionsResponseSchema.safeParse(json);
  return parsed.success ? parsed.data : [];
}

export default async function ClientOrdersPage() {
  const authToken = (await cookies()).get("auth_token")?.value;
  const orders = authToken ? await getMyOrders(authToken) : [];

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-black text-slate-900">Historial de Compras</h2>
        <p className="mt-1 text-sm text-slate-600">
          Aqui puedes ver el detalle de todas tus compras realizadas.
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-600">
          Todavia no tienes compras registradas.
        </div>
      ) : (
        orders.map((order) => (
          <article key={order.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4">
              <p className="text-sm font-semibold text-slate-700">Orden: {order.orderNumber}</p>
              <span
                className={`rounded-full px-3 py-1 text-xs font-bold ${statusClass[order.status] ?? "bg-slate-100 text-slate-700"}`}
              >
                {statusLabel[order.status] ?? order.status}
              </span>
            </div>

            <p className="mt-4 text-xs text-slate-500">
              Fecha: {new Date(order.transactionDate).toLocaleString("es-CO")}
            </p>

            <ul className="mt-5 space-y-4">
              {order.contents.map((item) => (
                <li key={item.id} className="flex items-center gap-4 rounded-xl border border-slate-100 p-3">
                  <div className="relative h-16 w-16 overflow-hidden rounded-lg bg-slate-100">
                    <Image
                      src={getImagePath(item.product.product.image ?? "default.svg")}
                      alt={item.product.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-slate-800">{item.product.product.name}</p>
                    <p className="text-sm text-slate-500">Cantidad: {item.quantity}</p>
                  </div>
                  <p className="font-bold text-slate-800">{formatCurrency(+item.price)}</p>
                </li>
              ))}
            </ul>

            <div className="mt-5 border-t border-slate-100 pt-4 text-right">
              <p className="text-sm text-slate-600">Total pagado</p>
              <p className="text-2xl font-black text-emerald-700">{formatCurrency(+order.total)}</p>
            </div>
          </article>
        ))
      )}
    </div>
  );
}

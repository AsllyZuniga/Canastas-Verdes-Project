import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const role = cookieStore.get("user_role")?.value;
  const userName = cookieStore.get("user_name")?.value ?? "Cliente";

  if (role !== "client") {
    redirect("/auth/login?redirectTo=/client/catalog");
  }

  return (
    <section className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr]">
      <aside className="h-fit rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm lg:sticky lg:top-24">
        <h1 className="text-xl font-black text-emerald-900">Panel Cliente</h1>
        <p className="mt-1 text-sm text-slate-600">Hola, {userName.split(" ")[0]}</p>

        <nav className="mt-6 space-y-2">
          <Link href="/client/catalog" className="block rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-emerald-50 hover:text-emerald-800">
            Catalogo
          </Link>
          <Link href="/client/account" className="block rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-emerald-50 hover:text-emerald-800">
            Gestionar Cuenta
          </Link>
          <Link href="/client/orders" className="block rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-emerald-50 hover:text-emerald-800">
            Historial de Compra
          </Link>
          <Link href="/client/pending" className="block rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-emerald-50 hover:text-emerald-800">
            Compras Pendientes
          </Link>
        </nav>
      </aside>

      <div className="space-y-6">
        {children}
      </div>
    </section>
  );
}

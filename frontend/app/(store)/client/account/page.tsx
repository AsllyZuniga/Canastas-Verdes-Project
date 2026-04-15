import { cookies } from "next/headers";
import { logoutUser } from "@/actions/auth-actions";
import ClientAccountForm from "@/components/client/ClientAccountForm";

export default async function ClientAccountPage() {
  const cookieStore = await cookies();
  const userName = cookieStore.get("user_name")?.value ?? "Cliente";
  const userEmail = cookieStore.get("user_email")?.value ?? "No disponible";

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-black text-slate-900">Mi Cuenta</h2>
        <p className="mt-1 text-sm text-slate-600">
          Consulta tu informacion de perfil y gestiona tu sesion.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <dl className="space-y-3">
          <div>
            <dt className="text-xs font-bold uppercase tracking-wide text-slate-500">Nombre</dt>
            <dd className="text-base font-semibold text-slate-900">{userName}</dd>
          </div>
          <div>
            <dt className="text-xs font-bold uppercase tracking-wide text-slate-500">Email</dt>
            <dd className="text-base font-semibold text-slate-900">{userEmail}</dd>
          </div>
          <div>
            <dt className="text-xs font-bold uppercase tracking-wide text-slate-500">Tipo de cuenta</dt>
            <dd className="text-base font-semibold text-emerald-700">Cliente</dd>
          </div>
        </dl>
      </div>

      <ClientAccountForm defaultName={userName} />

      <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6">
        <h3 className="text-sm font-black text-rose-700">Seguridad</h3>
        <p className="mt-1 text-sm text-rose-700/80">
          Si usas un equipo compartido, cierra sesion para proteger tu cuenta.
        </p>

        <form action={logoutUser} className="mt-4">
          <button
            type="submit"
            className="rounded-lg bg-rose-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-rose-700"
          >
            Cerrar Sesion
          </button>
        </form>
      </div>
    </div>
  );
}

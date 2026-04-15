"use client";

import { updateClientAccount } from "@/actions/client-account-actions";
import { useActionState, useEffect } from "react";

type AccountState = {
  errors: string[];
  success: boolean;
  message?: string;
};

export default function ClientAccountForm({ defaultName }: { defaultName: string }) {
  const [state, dispatch] = useActionState<AccountState, FormData>(
    updateClientAccount,
    {
      errors: [],
      success: false,
      message: "",
    }
  );

  useEffect(() => {
    if (state.success) {
      window.location.reload();
    }
  }, [state.success]);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-base font-black text-slate-900">Editar Perfil</h3>
      <p className="mt-1 text-sm text-slate-600">
        Cambia tu nombre y/o contrasena para mantener tu cuenta actualizada.
      </p>

      {state.errors.length > 0 && (
        <div className="mt-4 rounded-md border border-red-300 bg-red-50 p-3 text-sm text-red-700">
          {state.errors.map((error) => (
            <p key={error}>{error}</p>
          ))}
        </div>
      )}

      <form action={dispatch} className="mt-5 space-y-4">
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">Nombre</label>
          <input
            type="text"
            name="name"
            defaultValue={defaultName}
            className="w-full rounded-lg border border-slate-300 px-3 py-3 text-slate-800 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">Nueva contrasena</label>
          <input
            type="password"
            name="password"
            minLength={6}
            placeholder="Minimo 6 caracteres"
            className="w-full rounded-lg border border-slate-300 px-3 py-3 text-slate-800 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200"
          />
        </div>

        <button
          type="submit"
          className="rounded-lg bg-emerald-700 px-4 py-2 text-sm font-bold text-white transition hover:bg-emerald-800"
        >
          Guardar Cambios
        </button>
      </form>
    </div>
  );
}

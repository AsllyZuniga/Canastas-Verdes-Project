'use client'

import { useActionState, useEffect } from 'react'
import { loginUser } from '@/actions/auth-actions'
import Link from 'next/link'

type LoginState = {
  errors: string[]
  success: boolean
  redirectTo?: string
  role?: 'admin' | 'client'
}

export default function LoginForm({ redirectTo }: { redirectTo?: string }) {
  const [state, dispatch] = useActionState<LoginState, FormData>(
    loginUser,
    { errors: [], success: false }
  )

  useEffect(() => {
    if (state.success) {
      window.location.href = state.redirectTo ?? '/'
    }
  }, [state.success, state.redirectTo])

  return (
    <div className="w-full max-w-md mx-auto rounded-2xl border border-emerald-100 bg-white/90 p-8 shadow-xl backdrop-blur">
      <div className="mb-8 text-center">
        <h2 className="text-4xl font-black tracking-tight text-emerald-900">Iniciar Sesion</h2>
        <p className="mt-2 text-sm text-slate-600">Entra a tu cuenta para comprar o administrar.</p>
      </div>
      
      {state.errors && state.errors.map((error, i) => (
        <div key={i} className="mb-4 rounded-md border border-red-300 bg-red-50 p-3 text-red-700" role="alert">
          <p>{error}</p>
        </div>
      ))}

      <form action={dispatch} className="space-y-5">
        <input type="hidden" name="redirectTo" value={redirectTo ?? ''} />

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">Email</label>
          <input
            type="email"
            name="email"
            className="w-full rounded-lg border border-slate-300 px-3 py-3 text-slate-800 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200"
            required
            defaultValue="admin@canastasverdes.com"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">Contrasena</label>
          <input
            type="password"
            name="password"
            className="w-full rounded-lg border border-slate-300 px-3 py-3 text-slate-800 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200"
            required
            defaultValue="123456"
          />
        </div>
        
        <button
          type="submit"
          className="w-full rounded-lg bg-emerald-700 px-4 py-3 font-bold text-white transition hover:bg-emerald-800"
        >
          Iniciar Sesion
        </button>

        <p className="text-center text-sm text-slate-600">
          No tienes cuenta?{' '}
          <Link href="/auth/register" className="font-semibold text-emerald-700 hover:text-emerald-800">
            Registrate aqui
          </Link>
        </p>
      </form>
    </div>
  )
}

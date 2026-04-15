'use client'

import { useActionState, useEffect } from 'react'
import { registerUser } from '@/actions/auth-actions'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

type RegisterState = {
  errors: string[]
  success: boolean
}

export default function RegisterForm() {
  const [state, dispatch] = useActionState<RegisterState, FormData>(
    registerUser,
    { errors: [], success: false }
  )
  const router = useRouter()

  useEffect(() => {
    if (state.success) {
      router.push('/auth/login')
    }
  }, [state.success, router])

  return (
    <div className="w-full max-w-md mx-auto rounded-2xl border border-emerald-100 bg-white/90 p-8 shadow-xl backdrop-blur">
      <div className="mb-8 text-center">
        <h2 className="text-4xl font-black tracking-tight text-emerald-900">Crear Cuenta</h2>
        <p className="mt-2 text-sm text-slate-600">Registrate para empezar a comprar en Canastas Verdes.</p>
      </div>
      
      {state.errors && state.errors.map((error: string, i: number) => (
        <div key={i} className="mb-4 rounded-md border border-red-300 bg-red-50 p-3 text-red-700" role="alert">
          <p>{error}</p>
        </div>
      ))}

      <form action={dispatch} className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">Nombre</label>
          <input
            type="text"
            name="name"
            className="w-full rounded-lg border border-slate-300 px-3 py-3 text-slate-800 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200"
            required
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">Email</label>
          <input
            type="email"
            name="email"
            className="w-full rounded-lg border border-slate-300 px-3 py-3 text-slate-800 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200"
            required
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">Contrasena</label>
          <input
            type="password"
            name="password"
            className="w-full rounded-lg border border-slate-300 px-3 py-3 text-slate-800 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200"
            required
            minLength={6}
          />
        </div>
        
        <button
          type="submit"
          className="w-full rounded-lg bg-emerald-700 px-4 py-3 font-bold text-white transition hover:bg-emerald-800"
        >
          Crear Cuenta
        </button>

        <p className="text-center text-sm text-slate-600">
          Ya tienes cuenta?{' '}
          <Link href="/auth/login" className="font-semibold text-emerald-700 hover:text-emerald-800">
            Inicia sesion aqui
          </Link>
        </p>
      </form>
    </div>
  )
}

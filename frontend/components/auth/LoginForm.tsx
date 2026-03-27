'use client'

import { useFormState } from 'react-dom'
import { loginUser } from '@/actions/auth-actions'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function LoginForm({ redirectTo }: { redirectTo?: string }) {
  const [state, dispatch] = useFormState<{errors: string[], success: boolean}, FormData>(loginUser as any, { errors: [], success: false })
  const router = useRouter()

  useEffect(() => {
    if (state.success) {
      if (redirectTo) {
        window.location.href = redirectTo // Hard reload to update cookies in layout 
      } else {
        window.location.href = '/' // Default redirect 
      }
    }
  }, [state.success, redirectTo, router])

  return (
    <div className="bg-white shadow p-10 rounded-lg max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold text-center text-green-900 mb-6">Iniciar Sesión</h2>
      
      {state.errors && state.errors.map((error, i) => (
        <div key={i} className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
          <p>{error}</p>
        </div>
      ))}

      <form action={dispatch} className="space-y-5">
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
          <input
            type="email"
            name="email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:border-green-500"
            required
            defaultValue="admin@canastasverdes.com"
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">Contraseña</label>
          <input
            type="password"
            name="password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:border-green-500"
            required
            defaultValue="123456"
          />
        </div>
        
        <button
          type="submit"
          className="w-full bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors"
        >
          Iniciar Sesión
        </button>
      </form>
    </div>
  )
}

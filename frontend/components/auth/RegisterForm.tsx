'use client'

import { useFormState } from 'react-dom'
import { registerUser } from '@/actions/auth-actions'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function RegisterForm() {
  const [state, dispatch] = useFormState<{errors: string[], success: boolean}, FormData>(registerUser as any, { errors: [], success: false })
  const router = useRouter()

  useEffect(() => {
    if (state.success) {
      router.push('/auth/login')
    }
  }, [state.success, router])

  return (
    <div className="bg-white shadow p-10 rounded-lg max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold text-center text-green-900 mb-6">Registrarse</h2>
      
      {state.errors && state.errors.map((error: string, i: number) => (
        <div key={i} className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
          <p>{error}</p>
        </div>
      ))}

      <form action={dispatch} className="space-y-5">
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">Nombre</label>
          <input
            type="text"
            name="name"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-green-500"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
          <input
            type="email"
            name="email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-green-500"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">Contraseña</label>
          <input
            type="password"
            name="password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-green-500"
            required
            minLength={6}
          />
        </div>
        
        <button
          type="submit"
          className="w-full bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors"
        >
          Registrarse
        </button>
      </form>
    </div>
  )
}

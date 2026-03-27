'use server'

import { cookies } from 'next/headers'

export async function loginUser(prevState: any, formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const url = `${process.env.API_URL}/auth/login`
  const req = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })

  if (!req.ok) {
    const errorData = await req.json()
    return { errors: [errorData.message || 'Error al iniciar sesión'] }
  }

  const data = await req.json()

  // Store tokens and user info in cookies securely
  const cookieStore = await cookies()
  cookieStore.set('auth_token', data.access_token, { httpOnly: true, path: '/' })
  cookieStore.set('user_role', data.user.role, { path: '/' })
  cookieStore.set('user_name', data.user.name, { path: '/' })

  return { success: true }
}

export async function registerUser(prevState: any, formData: FormData) {
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const url = `${process.env.API_URL}/auth/register`
  const req = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password })
  })

  if (!req.ok) {
    const errorData = await req.json()
    return { errors: Array.isArray(errorData.message) ? errorData.message : [errorData.message || 'Error al registrarse'] }
  }

  return { success: true }
}

export async function logoutUser() {
  const cookieStore = await cookies()
  cookieStore.delete('auth_token')
  cookieStore.delete('user_role')
  cookieStore.delete('user_name')
}

'use server'

import { cookies } from 'next/headers'

type AccountState = {
  errors: string[]
  success: boolean
  message?: string
}

export async function updateClientAccount(prevState: AccountState, formData: FormData): Promise<AccountState> {
  void prevState

  const cookieStore = await cookies()
  const authToken = cookieStore.get('auth_token')?.value

  if (!authToken) {
    return {
      errors: ['Tu sesion expiro. Inicia sesion nuevamente.'],
      success: false,
    }
  }

  const name = (formData.get('name') as string | null)?.trim()
  const password = (formData.get('password') as string | null)?.trim()

  if (!name && !password) {
    return {
      errors: ['Debes actualizar al menos el nombre o la contrasena.'],
      success: false,
    }
  }

  if (password && password.length < 6) {
    return {
      errors: ['La contrasena debe tener minimo 6 caracteres.'],
      success: false,
    }
  }

  const payload: Record<string, string> = {}

  if (name) {
    payload.name = name
  }

  if (password) {
    payload.password = password
  }

  const url = `${process.env.API_URL}/users/me`
  const req = await fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify(payload),
  })

  const json = await req.json().catch(() => null)

  if (!req.ok) {
    const errors = Array.isArray(json?.message)
      ? json.message
      : [json?.message || 'No se pudo actualizar la cuenta']

    return {
      errors,
      success: false,
    }
  }

  if (name) {
    cookieStore.set('user_name', name, { path: '/' })
  }

  return {
    errors: [],
    success: true,
    message: 'Cuenta actualizada correctamente',
  }
}

import { FormEvent } from 'react'
import { useRouter } from 'next/router'
 
export default function LoginPage() {
  const router = useRouter()
 
  async function handleSubmit(event) {
    event.preventDefault()
 
    const formData = new FormData(event.currentTarget)
    const email = formData.get('email')
    const password = formData.get('password')
 
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    console.log(response)
    if (response.ok) {
      router.push('/welcome/2323323')
    } else {
      // Handle errors
    }
  }
 
  return (
    <>
    <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-md w-full space-y-8">
            <div>
            <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Iniciar sesión</h2>
            </div>
            <form class="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div>
                <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                <input id="email" name="email" type="email" autocomplete="email" required class="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" placeholder="Email" />
            </div>
            <div>
                <label for="password" class="block text-sm font-medium text-gray-700">Contraseña</label>
                <input id="password" name="password" type="password" autocomplete="current-password" required class="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" placeholder="Contraseña" />
            </div>
            <div>
                <button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Iniciar sesión
                </button>
            </div>
            </form>
        </div>
        </div>

    </>
  )
}
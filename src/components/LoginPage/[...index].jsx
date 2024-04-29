import { FormEvent } from 'react'
import { useRouter } from 'next/router'
import 'tailwindcss/tailwind.css';
import { generateUniqueNumber } from '../../funciones/functions';
// import '../../styles/globals.css'

export default function LoginPage() {
  const router = useRouter()
  const uniqueNumber = generateUniqueNumber();

 
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
    router.push(`/welcome/${uniqueNumber}`)
    if (response.ok) {
    } else {
      // Handle errors
    }
  }
 
  return (
    <>
    <div className='grid md:grid-cols-2 gap-1'>
      <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-md w-full space-y-8">
            <div>
            <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Iniciar sesión</h2>
            </div>
            <form class="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div>
                <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                <input id="email" name="email" type="email" autocomplete="email" required className="custom-input" placeholder="Email" />
            </div>
            <div>
                <label for="password" class="block text-sm font-medium text-gray-700">Contraseña</label>
                <input id="password" name="password" type="password" autocomplete="current-password" required className='custom-input' placeholder="Contraseña" />
            </div>
            <div>
                <button type="submit" className='custom-button'>
                Iniciar sesión
                </button>
            </div>
            </form>
        </div>
      </div>
      <div className=' hidden md:block'>
        <div className='flex justify-center items-center'>
          <img src="/logo-redel.png" alt='login' width={500} height={500} />
        </div>
      </div>
    </div>

    </>
  )
}
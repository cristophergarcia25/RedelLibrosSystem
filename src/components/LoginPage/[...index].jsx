import { FormEvent } from 'react'
import { useRouter } from 'next/router'
import 'tailwindcss/tailwind.css';
import { encryptAndSetLocalStorage, generateUniqueNumber } from '../../funciones/functions';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { LOGIN_SUCCESS_MESSAGE } from '../../utils/messages';
// import '../../styles/globals.css'

export default function LoginPage() {
  const router = useRouter()
  const uniqueNumber = generateUniqueNumber();

 
  async function handleSubmit(event) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const email = formData.get('email')
    const password = formData.get('password')
    console.log(email,password)
    const body = {
      email: email,
      contrasena: password
    };
    try {
      console.log(body)
      // Realiza la solicitud POST a la API
      const response = await fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
      console.log(response)
      // Verifica si la solicitud fue exitosa
      if (response.ok) {
        // Maneja la respuesta de la API
        const data = await response.json();
        console.log(data); 
        if(data.error || data.name === 'PrismaClientInitializationError'){
          toast.error(data.error)
        }else{
          encryptAndSetLocalStorage('user', data)
          toast.success(LOGIN_SUCCESS_MESSAGE + ' ' + data.nombre)
          router.push(`/welcome/${uniqueNumber}`)
        }
      } else {
        // Maneja errores de la API
        console.error('Error en la solicitud:', response.statusText);
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
    }
  }
 
  return (
    <>
    <div className='grid md:grid-cols-2 gap-1'>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
            <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Iniciar sesión</h2>
            </div>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input id="email" name="email" type="email" autoComplete="email" required className="custom-input" placeholder="Email" />
            </div>
            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
                <input id="password" name="password" type="password" autoComplete="current-password" required className='custom-input' placeholder="Contraseña" />
            </div>
            <div>
                <button type="submit" className='custom-button'>
                Iniciar sesión
                </button>
            </div>
            </form>
        </div>
      </div>
      <div className='hidden md:flex md:justify-center md:items-center bg-celeste'>
        <img  src="/logoblanco.png" alt='login' className="w-96 h-64" />
      </div>
    </div>

    </>
  )
}
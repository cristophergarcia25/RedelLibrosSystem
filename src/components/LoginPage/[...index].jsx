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
          const errorMessage = data && data.error ? data.error : 'Error en la solicitud';
          toast.error(errorMessage);
        }else{
          console.log(data)
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
    <div className='grid md:grid-cols-2 gap-1 bg-color-gray text-color-gray-o'>
      <div className="min-h-screen flex items-center justify-center bg-color-gray py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-sm w-full space-y-8">
            <div>
            <h2 className="mt-6 text-center text-2xl font-extrabold text-color-gray-o">Iniciar sesión</h2>
            </div>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-color-gray-o">Email</label>
                <input id="email" name="email" type="email" autoComplete="email" required className="custom-input  text-color-gray-o" placeholder="Email"  />
            </div>
            <div>
                <label htmlFor="password" className="block text-sm font-medium text-color-gray-o">Contraseña</label>
                <input id="password" name="password" type="password" autoComplete="current-password" required className='custom-input  text-gray-700' placeholder="Contraseña" />
            </div>
            <div>
                <button type="submit" className='custom-button'>
                Iniciar sesión
                </button>
            </div>
            </form>
        </div>
      </div>
      <div className='hidden md:flex md:justify-center md:items-center bg-color-green'>
        <img  src="/logoblanco.png" alt='login' className="w-96 h-64" />
      </div>
    </div>

    </>
  )
}
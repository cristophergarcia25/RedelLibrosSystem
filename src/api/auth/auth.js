// auth.js

import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const useAuth = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token'); // Aquí debes implementar la lógica para obtener el token de inicio de sesión, por ejemplo, desde el almacenamiento local

    // Verifica si hay un token
    if (!token) {
      router.push('/'); // Redirige a la página de inicio de sesión si no hay un token
    }
  }, []);

};

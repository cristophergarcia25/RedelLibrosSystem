import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

const useHasMounted = () => {
  const router = useRouter()
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('user'); // Obtén el token del localStorage
    console.log(token)
    // Verifica si el token es null, undefined o una cadena vacía
    if (token === null || token === undefined || token === '') {
      console.log('No hay token')
      router.push('/'); // Redirige al usuario a la página de inicio de sesión
      setHasMounted(false); // No montes los componentes si no hay token
    } else {
      console.log('Si hay token')
      setHasMounted(true); // Monta los componentes si hay un token válido
    }
  }, []);

  return hasMounted;
};

export default useHasMounted;

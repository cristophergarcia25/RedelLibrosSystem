// components/ProtectedRoute.js

import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { decryptAndGetLocalStorage } from '../../funciones/functions';

const ProtectedRoute = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const userData = decryptAndGetLocalStorage('user');
    if (!userData) {
      router.push('/');
    }
  }, [router]);

  return children;
};

export default ProtectedRoute;

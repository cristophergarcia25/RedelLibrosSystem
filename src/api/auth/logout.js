// logout.js
// import { signOut } from '@/auth';

export default async function handler(req, res) {
  try {
    // Llama a la función de cierre de sesión
    // await signOut();
    console.log('signOut')
    // Redirige al usuario al índice
    res.writeHead(302, { Location: '/' });
    res.end();
  } catch (error) {
    // Si ocurre algún error, devuelve una respuesta de error
    console.log('error');
    res.status(500).json({ error: 'Something went wrong.' });
  }
}

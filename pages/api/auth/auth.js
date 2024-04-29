// auth.js
export async function signIn(credentials, { email, password }) {
    // Simulación de datos quemados (reemplaza esto con tus datos reales)
    const users = [
      { id: 1, email: 'abel@alvarez.com', password: '1234' },
      { id: 2, email: 'user2@example.com', password: 'password2' },
    ];
  
    // Buscar el usuario por email
    const user = users.find(user => user.email === email);
  
    if (!user || user.password !== password) {
      throw new Error('Invalid credentials');
    }
  
    // Simulación de autenticación exitosa
    return { id: user.id, email: user.email };
  }
  
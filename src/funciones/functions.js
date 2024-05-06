import CryptoJS from 'crypto-js';


// Función para generar un número único de 8 dígitos basado en la fecha del día
export function generateUniqueNumber() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Agrega un cero delante si es necesario
    const day = String(today.getDate()).padStart(2, '0'); // Agrega un cero delante si es necesario
    const dateString = `${year}${month}${day}`;
  
    // Genera un número aleatorio de 4 dígitos
    const randomNumber = Math.floor(1000 + Math.random() * 9000); // 1000 es el mínimo, 9999 es el máximo
  
    // Combina la fecha y el número aleatorio para formar un número único de 8 dígitos
    const uniqueNumber = parseInt(dateString + randomNumber);
  
    return uniqueNumber;
  }

// Función para encriptar y guardar en localStorage
export function encryptAndSetLocalStorage(key, data) {
  const password = 'tu_contraseña_secreta'; // Coloca aquí tu contraseña secreta
  try {
    console.log('se encripto')
    const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), password).toString();
    console.log(encryptedData)
    localStorage.setItem(key, encryptedData);
    return true;
  } catch (error) {
    console.error('Error al encriptar y guardar en localStorage:', error);
    return false;
  }
}

// Función para desencriptar y obtener desde localStorage
export function decryptAndGetLocalStorage(key) {
  const password = 'tu_contraseña_secreta'; // Coloca aquí tu contraseña secreta
  try {
    const encryptedData = localStorage.getItem(key);
    if (!encryptedData) return null;

    const bytes = CryptoJS.AES.decrypt(encryptedData, password);
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedData;
  } catch (error) {
    console.error('Error al desencriptar y obtener desde localStorage:', error);
    return null;
  }
}
  
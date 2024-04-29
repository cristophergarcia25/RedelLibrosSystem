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
  
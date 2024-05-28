import React, { useEffect, useState } from 'react'
import useHasMounted from '../../hooks/useHasMounted';
import { TableBooks } from '../../components/globals/TableBooks';

const inventario = () => {
  //validacion mount para que se valide si hay sesion iniciada si no no cargar nada y regresar al login
  const hasMounted = useHasMounted();
  const [items, setItems] = useState([]);

  const getEnv = () => {
    console.log('se cargo')
    getInfoBooks()
    
  }

  useEffect(() => {
    console.log(hasMounted)
    if (hasMounted) {
      getEnv();
    }
  }, [hasMounted]); 

  const getInfoBooks = async () => {
    console.log('se cargo')
    try {
      // Realiza la solicitud POST a la API
      const response = await fetch('http://localhost:4000/inventario/lista', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        body: null
      });
      // Verifica si la solicitud fue exitosa
      if (response.ok) {
        console.log(response)
        // Maneja la respuesta de la API
        const data = await response.json();
        console.log(data);
        if(response.status === 200){
          if (data.error || data.name === 'PrismaClientInitializationError' || data.name === 'PrismaClientKnownRequestError') {
            const errorMessage = data.error ? data.error : 'Error en la solicitud';
            console.log(errorMessage);
            toast.error('No hay libros registrados');
            setItems([]);
          } else {
            const newData = data.filter(item => {
              // Verifica si todos los campos, excepto 'cantidad', son nulos
              const isEmpty = Object.values(item).every(value => value === null || value === '');
              // Verifica si la cantidad es diferente de 0
              const isNotZero = item.cantidad !== 0 || item.cantidad !== null;
              // Retorna true si no todos los campos, excepto 'cantidad', son nulos y la cantidad no es 0
              return !isEmpty || isNotZero;
          });
          
          // Ahora 'newData' contiene solo los elementos que deseas mantener
          setItems(newData);
          }
          
            
          }else{
          toast.error(data.error)
        }
      } else {
        // Maneja errores de la API
        console.error('Error en la solicitud:', response.statusText);
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
    }
  }

  useEffect(() => {
    console.log(items)
  }, [items]);

  
  return (
    <>
    {hasMounted && (
      <div className="mb-2 text-2xl font-bold tracking-tight text-black dark:text-black">
        <TableBooks items={items} reloadList={(newValue) => {if(newValue === true){
        getInfoBooks()
      }}} />
      </div>
    )}
    </>
  )
}

export default inventario
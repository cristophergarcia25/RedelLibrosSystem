import React, { useEffect, useState } from 'react'
import useHasMounted from '../../hooks/useHasMounted';
import { CardsBooks } from '../../components/globals/CardsBooks';
import { Modals } from '../../components/globals/Modals';

const libros = () => {
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

   const [reloadUpdate, setReloadUpdate] = useState(false)


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
          if(data.length === 0){
              toast.error('No hay libros registrados')
              setItems([])
            }
            setItems(data)
            
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

  useEffect(() => {}, [,items]);



  return (
    <div className="mb-2 text-2xl font-bold tracking-tight text-black dark:text-black">
      <CardsBooks   items={items} reloadList={(newValue) => {if(newValue === true){
        getInfoBooks()
      }}} />
    </div>
  )
}

export default libros
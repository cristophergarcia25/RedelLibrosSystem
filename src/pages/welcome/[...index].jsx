import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../../api/auth/auth';
import useHasMounted from '../../hooks/useHasMounted';
import { decryptAndGetLocalStorage, generateUniqueNumber } from '../../funciones/functions';
import ProtectedRoute from '../../components/globals/ProtectedRoute';

const Welcome = () => {
  const uniqueNumber = generateUniqueNumber();


  //validacion mount para que se valide si hay sesion iniciada si no no cargar nada y regresar al login
  const hasMounted = useHasMounted();

  const getEnv = () => {
    console.log('se cargo')
    
  }

  useEffect(() => {
    console.log(hasMounted)
    if (hasMounted) {
      getEnv();
    }
  }, [hasMounted]); 

    const datos = [{value:'clientes', texto:'Clientes', descripcion: 'Ver listado de clientes asociados',router:`../clientes/${uniqueNumber}`},
            {value:'consignaciones', texto:'Consignaciones', descripcion: 'Ver libros consignados',router:`../consignaciones/${uniqueNumber}`},
            {value:'cotizaciones', texto:'Cotizaciones', descripcion: ' Hacer o ver cotizaciones ',router:`../cotizaciones/${uniqueNumber}`},
            {value:'facturas', texto:'Facturas', descripcion: 'Ver lista de facturas',router:`../facturas/${uniqueNumber}`},
            {value:'historial', texto:'Historial', descripcion: 'Ver historial de movimientos dentro del sistema',router:`../historial/${uniqueNumber}`},
            {value:'inventario', texto:'Inventario', descripcion: 'Ver inventario de libros',router:`../inventario/${uniqueNumber}`},
            {value:'reportes', texto:'Reportes', descripcion: 'Ver reportes de movimient os', router:`../reportes/${uniqueNumber}`},
            {value:'usuarios', texto:'Usuarios', descripcion: 'Ver usuarios asociados al sistema', router:`../usuarios/${uniqueNumber}`},
            {value:'libros', texto:'Libros', descripcion: 'Ver libros en existencia ', router:`../libros/${uniqueNumber}`}
]

    const [datacards,setdatacards]= useState(datos)
    const router = useRouter() 

    const onNavegation = (data)=>{
        console.log("Si me entro")
        router.push(data.router)
    }


    
    

  return (
    <>
      {hasMounted && (
        <div className='grid md:grid-cols-3 p-4 gap-2' >
        
        {datacards.map(data => (
        
            <div key = {data.value} onClick={()=>onNavegation(data)} className=" cursor-pointer p-6 bg-gris-oscuro border border-gray-200 rounded-lg shadow dark:bg-verde-claro dark:border-gray-200">
        <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-black dark:text-black">{data.texto}</h5>
        </a>
        <p className="mb-3 font-normal text-blanco dark:text-blanco">{data.descripcion}</p>
        
        </div>
        ))}
    
        </div>
      )}
    </>
  )
}

export default Welcome
import { useRouter } from 'next/router'
import React, { useState } from 'react'

const Welcome = () => {
    const datos = [{value:'clientes', texto:'Clientes', descripcion: 'Ver listado de clientes asociados',router:'../clientes/1234'},
            {value:'consignaciones', texto:'Consignaciones', descripcion: 'Ver libros consignados',router:'../consignaciones/1234'},
            {value:'cotizaciones', texto:'Cotizaciones', descripcion: ' Hacer o ver cotizaciones ',router:'../cotizaciones/1234'},
            {value:'facturas', texto:'Facturas', descripcion: 'Ver lista de facturas',router:'../facturas/1234'},
            {value:'historial', texto:'Historial', descripcion: 'Ver historial de movimientos dentro del sistema',router:'../historial/1234'},
            {value:'inventario', texto:'Inventario', descripcion: 'Ver inventario de libros',router:'../inventario/1234'},
            {value:'reportes', texto:'Reportes', descripcion: 'Ver reportes de movimient os', router:'../reportes/1234'},
            {value:'usuarios', texto:'Usuarios', descripcion: 'Ver usuarios asociados al sistema', router:'../usuarios/1234'},
            {value:'libros', texto:'Libros', descripcion: 'Ver libros en existencia ', router:'../libros/1234'}
]

    const [datacards,setdatacards]= useState(datos)
    const router = useRouter() 
    const onNavegation = (data)=>{
        console.log("Si me entro")
        router.push(data.router)
    }

  return (
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
  )
}

export default Welcome
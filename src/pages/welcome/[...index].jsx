import { useRouter } from 'next/router'
import React, { useState } from 'react'

const Welcome = () => {
    const datos = [{value:'clientes', texto:'Clientes', descripcion: 'ClientesRedel',router:'../clientes/1234'},
            {value:'consignaciones', texto:'Consignaciones', descripcion: 'ConsignacionesRedel',router:'../consignaciones/1234'},
            {value:'cotizaciones', texto:'Cotizaciones', descripcion: 'CotizacionesRedel',router:'../cotizaciones/1234'},
            {value:'facturas', texto:'Facturas', descripcion: 'FacturasRedel',router:'../facturas/1234'},
            {value:'historial', texto:'Historial', descripcion: 'HistorialRedel',router:'../historial/1234'},
            {value:'inventario', texto:'Inventario', descripcion: 'InventarioRedel',router:'../inventario/1234'},
            {value:'reportes', texto:'Reportes', descripcion: 'ReportesRedel', router:'../reportes/1234'},
            {value:'usuarios', texto:'Usuarios', descripcion: 'UsuariosRedel', router:'../usuarios/1234'},
            {value:'libros', texto:'Libros', descripcion: 'LibrosRedel', router:'../libros/1234'}
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
   
        <div key = {data.value} onClick={()=>onNavegation(data)} className=" cursor-pointer p-6 bg-verde-claro border border-gray-200 rounded-lg shadow dark:bg-verde-claro dark:border-gray-700">
    <a href="#">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-white dark:text-white">{data.texto}</h5>
    </a>
    <p className="mb-3 font-normal text-blanco dark:text-blanco">{data.descripcion}</p>
    
</div>
   ))}

    </div>
  )
}

export default Welcome
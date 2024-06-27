import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import useHasMounted from '../../hooks/useHasMounted';
import { generateUniqueNumber } from '../../funciones/functions';

const Welcome = () => {
  const uniqueNumber = generateUniqueNumber();
  const router = useRouter();
  const hasMounted = useHasMounted();

  const datos = [
    { value: 'clientes', texto: 'Clientes', descripcion: 'Ver listado de clientes asociados', router: `../clientes/${uniqueNumber}` },
    { value: 'consignaciones', texto: 'Consignaciones', descripcion: 'Ver libros consignados', router: `../consignaciones/${uniqueNumber}` },
    { value: 'cotizaciones', texto: 'Cotizaciones', descripcion: 'Hacer o ver cotizaciones', router: `../cotizaciones/${uniqueNumber}` },
    { value: 'facturas', texto: 'Facturas', descripcion: 'Ver lista de facturas', router: `../facturas/${uniqueNumber}` },
    { value: 'historial', texto: 'Historial', descripcion: 'Ver historial de movimientos', router: `../historial/${uniqueNumber}` },
    { value: 'inventario', texto: 'Inventario', descripcion: 'Ver inventario de libros', router: `../inventario/${uniqueNumber}` },
    { value: 'reportes', texto: 'Reportes', descripcion: 'Ver reportes de movimientos', router: `../reportes/${uniqueNumber}` },
    { value: 'usuarios', texto: 'Usuarios', descripcion: 'Ver usuarios asociados', router: `../usuarios/${uniqueNumber}` },
    { value: 'libros', texto: 'Libros', descripcion: 'Ver libros en existencia', router: `../libros/${uniqueNumber}` }
  ];

  const [datacards, setDatacards] = useState(datos);

  useEffect(() => {
    if (hasMounted) {
      console.log('Componente montado');
    }
  }, [hasMounted]);

  const navigateTo = (routerPath) => {
    router.push(routerPath);
  };

  return (
    <>
      {hasMounted && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
          {datacards.map((data) => (
            <div key={data.value} onClick={() => navigateTo(data.router)} className="cursor-pointer bg-white border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out">
              <div className="p-4">
                <h5 className="text-xl font-semibold text-gray-800 mb-2">{data.texto}</h5>
                <p className="text-gray-600">{data.descripcion}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Welcome;

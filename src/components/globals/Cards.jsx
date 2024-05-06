import React, { useEffect, useState } from 'react'

const Cards = () => {

    const [searchTerm, setSearchTerm] = useState('');
    const [filteredClientes, setFilteredClientes] = useState([]);


    const clientes = [
        {
          id: 1,
          nombre: 'Juan Pérez',
          edad: 35,
          direccion: 'Calle Principal 123',
          ciudad: 'Ciudad de Ejemplo',
          pais: 'Ejemplo',
          telefono: '+1234567890',
          email: 'juan@example.com',
        },
        {
          id: 2,
          nombre: 'María García',
          edad: 28,
          direccion: 'Avenida Secundaria 456',
          ciudad: 'Otra Ciudad',
          pais: 'Ejemplo',
          telefono: '+0987654321',
          email: 'maria@example.com',
        },
        // Puedes agregar más objetos de clientes aquí según sea necesario
      ];

      // Función para eliminar las tildes de los caracteres acentuados
const removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

useEffect(() => {
    const filtered = clientes.filter(cliente => {
        const values = Object.values(cliente).map(value =>
            typeof value === 'string' ? removeAccents(value).toLowerCase() : value
        );
        return values.some(value =>
            typeof value === 'string' && value.includes(removeAccents(searchTerm.toLowerCase()))
        );
    });
    setFilteredClientes(filtered);
}, [searchTerm, clientes]);

    

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

  return (
    <>
    <div className='p-2'>
        {/* Empieza searchbar */}
    <form className="w-full mx-auto">   
        <label for="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
        <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
            </div>
            <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Buscar..." required value={searchTerm} onChange={handleSearchChange} />
            <div  className="text-white absolute end-2.5 bottom-2.5 bg-verde-oscuro  focus:ring-4 focus:outline-none cursor-default focus:ring-verde-oscuro font-medium rounded-lg text-sm px-4 py-2 dark:bg-verde-oscuro  dark:focus:ring-verde-oscuro">Search</div>
        </div>
    </form>
    {/* Termina searchbar */}
    {/* Empieza contenedor cards  */}
    <div className='grid md:grid-cols-4 gap-1 p-2'>
        {filteredClientes.map((cliente) => (
            <div key={cliente.id} className="p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{cliente.nombre}</h2>
                <p className="text-gray-700 dark:text-gray-300">Edad: {cliente.edad}</p>
                <p className="text-gray-700 dark:text-gray-300">Dirección: {cliente.direccion}</p>
                <p className="text-gray-700 dark:text-gray-300">Ciudad: {cliente.ciudad}</p>
                <p className="text-gray-700 dark:text-gray-300">País: {cliente.pais}</p>
                <p className="text-gray-700 dark:text-gray-300">Teléfono: {cliente.telefono}</p>
                <p className="text-gray-700 dark:text-gray-300">Email: {cliente.email}</p>
            </div>
        ))}
    </div>
    {/* Termina contenedor cards */}
    </div>
    </>
  )
}

export default Cards
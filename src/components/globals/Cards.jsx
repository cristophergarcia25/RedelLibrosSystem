import React, { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { Modals } from './Modals';
import { toast } from 'react-toastify';

export const Cards = ({ items, reloadList= false }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);

  // Función para eliminar las tildes de los caracteres acentuados
  const removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  useEffect(() => {
    const filtered = items.filter(item => {
      const values = Object.values(item).map(value =>
        typeof value === 'string' ? removeAccents(value).toLowerCase() : value
      );
      return values.some(value =>
        typeof value === 'string' && value.includes(removeAccents(searchTerm.toLowerCase()))
      );
    });
    setFilteredItems(filtered);
  }, [searchTerm, items]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const [isOpen, setIsOpen] = useState(false);


    const onOpenModal = () => { 
        console.log('Modal abierto')
        setIsOpen(true);
    }

    const handleNewBook = async () => {
        // Obtener los valores de los campos
        const nombre = document.getElementById('nombre').value;
        const contacto_principal = document.getElementById('contacto_principal').value;
        const direccion = document.getElementById('direccion').value;
        // const cantidad = document.getElementById('cantidad').value;
        const telefono = document.getElementById('tel_contacto_principal').value;
      
        // Verificar si alguno de los campos está vacío
        if (nombre === '' || contacto_principal === '' || direccion === '' ||  telefono === '') {
          // Mostrar un mensaje de error o tomar otra acción para manejar el caso en que haya campos vacíos
          console.log('Todos los campos son obligatorio,vuelve a intentarlo');
          toast.error('Todos los campos son obligatorios, vuelve a intentarlo');
        } else {
          const params = {
            contacto_principal,  
            direccion,
            nombre ,
            tel_contacto_principal: telefono
            // titulo
          }
          console.log(params)
          try {
            console.log(params)
            // Realiza la solicitud POST a la API
            const response = await fetch('http://localhost:4000/institucion', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(params)
            });
            console.log(response)
            // Verifica si la solicitud fue exitosa
            if (response.ok) {
              // Maneja la respuesta de la API
              const data = await response.json();
              console.log(data); 
              if (!data || !data.name) {
                toast.success('Se realizó la solicitud con éxito');
                reloadList(true);
                setIsOpen(false);
              } else if (data.name === 'PrismaClientValidationError') {
                toast.error('Se reportó un error al agregar el cliente');
              }
              
              
            } else {
              // Maneja errores de la API
              console.error('Error en la solicitud:', response.statusText);
            }
          } catch (error) {
            console.error('Error al realizar la solicitud:', error);
          }
        }
      }

  return (
    <div className='p-2'>
            <div className='grid grid-cols-8 gap-1'>
            <div className='col-span-7'>
            <form className="w-full mx-auto">
            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg className="w-4 h-4 text-celeste dark:text-celeste" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
            </div>
            <input type="search" id="default-search" className="block w-full p-2 ps-10 text-sm text-black border border-gris-claro rounded-lg bg-gris-claro focus:ring-gris-oscuro focus:border-gris-oscuro dark:bg-gris-claro dark:border-gris-oscuro dark:placeholder-gray-400 dark:text-black dark:focus:ring-gris-oscuro dark:focus:border-gris-oscuro" placeholder="Buscar..." required value={searchTerm} onChange={handleSearchChange} />
        
            </div>
        </form>
        </div>
        <div className='col-span-1 flex items-center justify-center  rounded-lg'>
        <button onClick={onOpenModal} className="flex items-center justify-center bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-600 hover:to-blue-800 text-white font-semibold py-1 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span className="text-lg">Nuevo</span>
        </button>


                </div>
      </div>
      <div className='grid md:grid-cols-4 gap-1 p-2'>
        {filteredItems.map((item) => (
          <div key={item.id} className="p-4 cursor-pointer text-base font-medium bg-gris-claro border border-gris-oscuro rounded-lg shadow dark:bg-gris-claro dark:border-gris-oscuro">
            <p className="text-xl truncate font-bold text-gray-900 dark:text-black">{item.nombre}</p>
            <p className="text-black dark:text-black">Porcentaje de descuento: {item.porcentaje_descuento || 'N/A'}</p>
            <p className="text-black dark:text-black">Contacto principal: {item.contacto_principal || 'N/A'}</p>
            <p className="text-black dark:text-black">Dirección: {item.direccion || 'N/A'}</p>
            <p className="text-black dark:text-black">Contacto secundario: {item.contacto_secundario || 'N/A'}</p>
            <p className="text-black dark:text-black">Teléfono de contacto secundario: {item.tel_contacto_secundario || 'N/A'}</p>
            <p className="text-black dark:text-black">Teléfono de contacto principal: {item.tel_contacto_principal || 'N/A'}</p>
          </div>
        ))}
      </div>
      <Modals
            title='Ingresar Institución' 
            opModal={isOpen} 
            handleClose={(newValue)=> setIsOpen(newValue)} 
            handleNewBook={(newValue) => handleNewBook()}
            >
             <div className='grid grid-cols-2 gap-1'>
             <div className="form-group">
                    <label htmlFor="nombre">Nombre: <span className="text-red-500">*</span></label>
                    <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-celeste focus:border-celeste block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-celeste dark:focus:border-celeste" id="nombre" placeholder="Ingrese nombre" required />
                </div>
                <div className="form-group">
                    <label htmlFor="contacto_principal">Contacto Principal: <span className="text-red-500">*</span></label>
                    <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-celeste focus:border-celeste block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-celeste dark:focus:border-celeste" id="contacto_principal" placeholder="Ingrese Contacto Principal" required />
                </div>
                <div className="form-group">
                    <label htmlFor="direccion">Dirección: <span className="text-red-500">*</span></label>
                    <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-celeste focus:border-celeste block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-celeste dark:focus:border-celeste" id="direccion" placeholder="Ingrese Dirección" required />
                </div>
                
                <div className="form-group">
                    <label htmlFor="tel_contacto_principal">Teléfono: <span className="text-red-500">*</span></label>
                    <input 
                        type="tel" 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-celeste focus:border-celeste block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-celeste dark:focus:border-celeste" 
                        id="tel_contacto_principal" 
                        placeholder="Ingrese contacto principal" 
                        pattern="[0-9]{8}" 
                        title="Por favor ingrese un número de teléfono válido de 10 dígitos" 
                        required 
                    />
                    <p className="text-red-500 text-xs italic">Por favor, ingrese un número de teléfono válido de 8 dígitos (solo números).</p>
                </div>


                    
                </div>
            </Modals>
    </div>
  );
};

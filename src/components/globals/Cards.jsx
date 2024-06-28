import React, { useEffect, useState } from 'react';
import { FaEdit, FaPlus } from 'react-icons/fa';
import { Modals } from './Modals';
import { toast } from 'react-toastify';
import { IoTrashSharp } from 'react-icons/io5';
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from 'react-icons/md';

export const Cards = ({ items=[], reloadList= false }) => {
  const [searchTerm, setSearchTerm] = useState('');
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [buttonsPerBlock] = useState(5);
  // Calculate the range of items to display
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    // Cambia 'currentItems' por 'filteredBooks'
    const currentItems = filteredBooks.slice(indexOfFirstItem, indexOfLastItem);

    // Puedes seguir usando 'items' para calcular el número total de páginas y otras lógicas del Paginator
    const totalPages = Math.ceil(items.length / itemsPerPage);
    const currentBlock = Math.ceil(currentPage / buttonsPerBlock);
    const startButtonIndex = (currentBlock - 1) * buttonsPerBlock + 1;
    const endButtonIndex = Math.min(currentBlock * buttonsPerBlock, totalPages);

  const filterBooks = (items, term) => {
    return items.filter(book => {
        const title = book?.titulo?.toLowerCase();
        const isbn = String(book?.isbn); // Convertir el ISBN a string
        const searchTermLower = term?.toLowerCase();
        return title?.includes(searchTermLower) || isbn?.includes(searchTermLower); // Buscar por título o ISBN
    });
};

// En el useEffect, actualiza los libros filtrados cuando cambie el término de búsqueda
useEffect(() => {
    console.log(items)
    const filtered = filterBooks(items, searchTerm);
    console.log(filtered)
    if(filtered){
        console.log(filtered)
        setFilteredBooks(filtered);
    }
}, [items, searchTerm]);



  // Functions to handle page changes
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleNextBlock = () => {
    if (endButtonIndex < totalPages) {
      setCurrentPage(endButtonIndex + 1);
    }
  };

  const handlePreviousBlock = () => {
    if (startButtonIndex > 1) {
      setCurrentPage(startButtonIndex - buttonsPerBlock);
    }
  };



    

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);


    const onOpenModal = () => { 
        console.log('Modal abierto')
        setIsOpen(true);
    }

    const handleNewBook = async () => {
        // Obtener los valores de los campos
        const nombre = document.getElementById('nombre').value;
        const contacto_principal = document.getElementById('contacto_principal').value;
        const correo_principal = document.getElementById('correo_principal').value;
        const direccion = document.getElementById('direccion').value;
        const cargo = document.getElementById('cargo').value;
        const direccion_factura = document.getElementById('direccion_factura').value;
        const nit = document.getElementById('nit').value;
        const nombre_factura = document.getElementById('nombre_factura').value;
        // const cantidad = document.getElementById('cantidad').value;
        const telefono = document.getElementById('tel_contacto_principal').value;
        const porcentaje_descuento = document.getElementById('percentage').value;
      
        // Verificar si alguno de los campos está vacío
        if (nombre === '' || contacto_principal === '' || direccion === '' ||  telefono === ''||cargo===''||correo_principal==='' || direccion_factura === '' || nit === '' || nombre_factura === '' || porcentaje_descuento === '') {
          // Mostrar un mensaje de error o tomar otra acción para manejar el caso en que haya campos vacíos
          console.log('Todos los campos son obligatorio,vuelve a intentarlo');
          toast.error('Todos los campos son obligatorios, vuelve a intentarlo');
        } else {
          const params = {
            contacto_principal,
            correo_contacto_principal: correo_principal,  
            cargo_contacto_principal: cargo,
            direccion,
            nombre ,
            tel_contacto_principal: telefono,
            direccion_factura,
            nit,
            nombre_factura,
            porcentaje_descuento: Number(porcentaje_descuento)
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


      const handleEditBook = async () => {
        // Obtener los valores de los campos
        const nombre = document.getElementById('nombre').value;
        const contacto_principal = document.getElementById('contacto_principal').value;
        const correo_principal = document.getElementById('correo_principal').value;
        const direccion = document.getElementById('direccion').value;
        const cargo = document.getElementById('cargo').value;
        const direccion_factura = document.getElementById('direccion_factura').value;
        const nit = document.getElementById('nit').value;
        const nombre_factura = document.getElementById('nombre_factura').value;
        // const cantidad = document.getElementById('cantidad').value;
        const telefono = document.getElementById('tel_contacto_principal').value;
        const porcentaje_descuento = document.getElementById('percentage').value;
      
        // Verificar si alguno de los campos está vacío
        if (nombre === '' || contacto_principal === '' || direccion === '' ||  telefono === ''||cargo===''||correo_principal==='' || direccion_factura === '' || nit === '' || nombre_factura === '' || porcentaje_descuento === '') {
          // Mostrar un mensaje de error o tomar otra acción para manejar el caso en que haya campos vacíos
          console.log('Todos los campos son obligatorio,vuelve a intentarlo');
          toast.error('Todos los campos son obligatorios, vuelve a intentarlo');
        } else {
          const params = {
            id: book.id,
            contacto_principal,
            correo_contacto_principal: correo_principal,  
            cargo_contacto_principal: cargo,
            direccion,
            nombre ,
            tel_contacto_principal: telefono,
            direccion_factura,
            nit,
            nombre_factura,
            porcentaje_descuento: Number(porcentaje_descuento)
            // titulo
          }
          console.log(params)
          try {
            console.log(params)
            // Realiza la solicitud POST a la API
            const response = await fetch('http://localhost:4000/institucion', {
              method: 'PUT',
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
                setIsOpen2(false);
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
    
    const [book, setBook] = useState(null);

    const handleModalEdit = (valor) => {
        console.log(valor)
        setBook(valor);
        setIsOpen2(true);
    }

    useEffect(() => {
      console.log(book)
    }, [book]);

    const options = [20, 23, 25, 30];


  return (
    <div className='p-2 pr-6'>
      <div className='grid grid-cols-8 gap-1'>
          <div className='col-span-7'>
              <form className="w-full mx-auto">
                  <label htmlFor="default-search" className="mb-2 text-sm font-medium text-color-gray-o sr-only dark:text-color-gray-o">Buscar</label>
                  <div className="relative">
                      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                          <svg className="w-4 h-4 text-musgo dark:text-musgo" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                          </svg>
                      </div>
                      <input type="search" id="default-search" className="block w-full p-1 ps-10 text-sm text-black border border-gris-claro rounded-lg  focus:ring-gris-oscuro focus:border-gris-oscuro  dark:border-gris-oscuro  dark:text-black dark:focus:ring-gris-oscuro dark:focus:border-gris-oscuro" placeholder="Buscar..."  onChange={handleSearchChange} />
                  </div>
              </form>
          </div>
          <button onClick={onOpenModal} className="flex items-center justify-center  bg-color-yellow text-color-gray-o font-semibold px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span className="text-base">Nuevo</span>
          </button>
      </div>
      <div className="overflow-x-auto mt-4 w-full">
          <table className="w-full max-w-full bg-white border border-gray-300 table-fixed">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Nombre</th>
                {/* <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Descuento</th> */}
                <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Dirección</th>
                <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Contacto Principal</th>
                <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Teléfono Principal</th>
                <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Correo Principal</th>
                <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Porcentaje Descuento</th>
                {/* <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Contacto Secundario</th>
                <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Teléfono Secundario</th>
                <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Correo Secundario</th> */}
                <th scope="col" className="px-4 py-2 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredBooks?.map((item, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                  <td className="px-4 py-2 text-sm">{item.nombre}</td>
                  {/* <td className="px-4 py-2 text-sm">{item.porcentaje_descuento ?? 'N/A'}</td> */}
                  <td title={item.direccion} className="px-4 py-2 text-sm truncate">{item.direccion ?? 'N/A'}</td>
                  <td className="px-4 py-2 text-sm truncate">{item.contacto_principal ?? 'N/A'}</td>
                  <td className="px-4 py-2 text-sm">{item.tel_contacto_principal ?? 'N/A'}</td>
                  <td className="px-4 py-2 text-sm truncate">{item.correo_contacto_principal ?? 'N/A'}</td>
                  <td className="px-4 py-2 text-sm truncate text-center">{item.porcentaje_descuento ? '%' + item.porcentaje_descuento : ''}</td>
                  {/* <td className="px-4 py-2 text-sm">{item.contacto_secundario ?? 'N/A'}</td>
                  <td className="px-4 py-2 text-sm">{item.tel_contacto_secundario ?? 'N/A'}</td>
                  <td className="px-4 py-2 text-sm">{item.correo_contacto_secundario ?? 'N/A'}</td> */}
                  <td className="px-4 py-2 text-center">
                    <button className="text-blue-500 hover:text-blue-700" onClick={() => handleModalEdit(item)}>
                      <FaEdit className="text-lg" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
        <div className="flex text-xs justify-between items-center mt-4">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="flex justify-center text-color-gray items-center rounded-full p-2 bg-color-green disabled:opacity-50"
          >
            <MdKeyboardDoubleArrowLeft  className='w-4 h-4 ' />
          </button>
          <div className="flex">
            {startButtonIndex > 1 && (
              <button
                onClick={handlePreviousBlock}
                className="flex justify-center text-color-gray items-center rounded-full px-3 ml-1 p-2 bg-color-green disabled:opacity-50"
                >
                ...
              </button>
            )}
            {Array.from({ length: endButtonIndex - startButtonIndex + 1 }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(startButtonIndex + index)}
                className={` ${currentPage === startButtonIndex + index ? 'bg-color-green text-white' : 'bg-gray-300 text-gray-700'} flex ml-1 px-3 justify-center text-color-gray items-center rounded-full p-2 bg-color-green disabled:opacity-50`}
              >
                {startButtonIndex + index}
              </button>
            ))}
            {endButtonIndex < totalPages && (
              <button
                onClick={handleNextBlock}
                className="flex justify-center text-color-gray items-center rounded-full px-3 ml-1 p-2 bg-color-green disabled:opacity-50"
                >
                ...
              </button>
            )}
          </div>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="flex justify-center text-color-gray items-center rounded-full p-2 bg-color-green disabled:opacity-50"
          >
            <MdKeyboardDoubleArrowRight className='w-4 h-4 ' />
          </button>

        </div>
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
                <input value={book?.nombre} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-celeste focus:border-celeste block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-color-gray-o dark:focus:ring-celeste dark:focus:border-celeste" id="nombre" placeholder="Ingrese nombre" required />
            </div>
            <div className="form-group">
                <label htmlFor="contacto_principal">Contacto Principal: <span className="text-red-500">*</span></label>
                <input value={book?.contacto_principal} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-celeste focus:border-celeste block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-color-gray-o dark:focus:ring-celeste dark:focus:border-celeste" id="contacto_principal" placeholder="Ingrese Contacto Principal" required />
            </div>
            <div className="form-group">
                <label htmlFor="correo_principal">Correo Principal: <span className="text-red-500">*</span></label>
                <input value={book?.correo_principal} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-celeste focus:border-celeste block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-color-gray-o dark:focus:ring-celeste dark:focus:border-celeste" id="correo_principal" placeholder="Ingrese Correo Principal" required />
            </div>
            <div className="form-group">
                <label htmlFor="direccion">Dirección: <span className="text-red-500">*</span></label>
                <input value={book?.direccion} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-celeste focus:border-celeste block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-color-gray-o dark:focus:ring-celeste dark:focus:border-celeste" id="direccion" placeholder="Ingrese Dirección" required />
            </div>
            <div className="form-group">
                <label value={book?.cargo_principal} htmlFor="cargo">Cargo: <span className="text-red-500">*</span></label>
                <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-celeste focus:border-celeste block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-color-gray-o dark:focus:ring-celeste dark:focus:border-celeste" id="cargo" placeholder="Ingrese Cargo" required />
            </div>
            <div className="form-group">
                <label htmlFor="direccion_factura">Dirección Factura: <span className="text-red-500">*</span></label>
                <input value={book?.direccion_factura} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-celeste focus:border-celeste block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-color-gray-o dark:focus:ring-celeste dark:focus:border-celeste" id="direccion_factura" placeholder="Ingrese Dirección" required />
            </div>
            <div className="form-group">
                <label htmlFor="nit">Nit Factura: <span className="text-red-500">*</span></label>
                <input value={book?.nit} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-celeste focus:border-celeste block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-color-gray-o dark:focus:ring-celeste dark:focus:border-celeste" id="nit" placeholder="Ingrese Dirección" required />
            </div>
            <div className="form-group">
                <label htmlFor="nombre_factura">Nombre Factura: <span className="text-red-500">*</span></label>
                <input value={book?.nombre_factura} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-celeste focus:border-celeste block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-color-gray-o dark:focus:ring-celeste dark:focus:border-celeste" id="nombre_factura" placeholder="Ingrese Dirección" required />
            </div>
            <div className='form-group'>
              <label htmlFor="percentage" className="block text-sm font-medium text-gray-700">
                Selecciona un porcentaje:
              </label>
              <select
                id="percentage"
                name="percentage"
                // value={selectedPercentage}
                // onChange={(e) => setSelectedPercentage(e.target.value)}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option selected value="" disabled>Selecciona...</option>
                {options.map((percentage) => (
                  <option key={percentage} value={percentage}>
                    {percentage}%
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
                <label htmlFor="tel_contacto_principal">Teléfono: <span className="text-red-500">*</span></label>
                <input
                    value={book?.tel_contacto_principal} 
                    type="tel" 
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-celeste focus:border-celeste block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-color-gray-o dark:focus:ring-celeste dark:focus:border-celeste" 
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
        <Modals
        title='Editar Institución' 
        opModal={isOpen2} 
        handleClose={(newValue)=> setIsOpen2(newValue)} 
        handleNewBook={(newValue) => handleEditBook()}
        >
          <div className='grid grid-cols-2 gap-1'>
          <div className="form-group">
                <label htmlFor="nombre">Nombre: <span className="text-red-500">*</span></label>
                <input value={book?.nombre} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-celeste focus:border-celeste block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-color-gray-o dark:focus:ring-celeste dark:focus:border-celeste" id="nombre" placeholder="Ingrese nombre" required />
            </div>
            <div className="form-group">
                <label htmlFor="contacto_principal">Contacto Principal: <span className="text-red-500">*</span></label>
                <input value={book?.contacto_principal} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-celeste focus:border-celeste block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-color-gray-o dark:focus:ring-celeste dark:focus:border-celeste" id="contacto_principal" placeholder="Ingrese Contacto Principal" required />
            </div>
            <div className="form-group">
                <label htmlFor="correo_principal">Correo Principal: <span className="text-red-500">*</span></label>
                <input value={book?.correo_contacto_principal} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-celeste focus:border-celeste block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-color-gray-o dark:focus:ring-celeste dark:focus:border-celeste" id="correo_principal" placeholder="Ingrese Correo Principal" required />
            </div>
            <div className="form-group">
                <label htmlFor="direccion">Dirección: <span className="text-red-500">*</span></label>
                <input value={book?.direccion} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-celeste focus:border-celeste block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-color-gray-o dark:focus:ring-celeste dark:focus:border-celeste" id="direccion" placeholder="Ingrese Dirección" required />
            </div>
            <div className="form-group">
                <label  htmlFor="cargo">Cargo: <span className="text-red-500">*</span></label>
                <input value={book?.cargo_contacto_principal} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-celeste focus:border-celeste block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-color-gray-o dark:focus:ring-celeste dark:focus:border-celeste" id="cargo" placeholder="Ingrese Cargo" required />
            </div>
            <div className="form-group">
                <label htmlFor="direccion_factura">Dirección Factura: <span className="text-red-500">*</span></label>
                <input value={book?.direccion_factura} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-celeste focus:border-celeste block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-color-gray-o dark:focus:ring-celeste dark:focus:border-celeste" id="direccion_factura" placeholder="Ingrese Dirección" required />
            </div>
            <div className="form-group">
                <label htmlFor="nit">Nit Factura: <span className="text-red-500">*</span></label>
                <input value={book?.nit} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-celeste focus:border-celeste block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-color-gray-o dark:focus:ring-celeste dark:focus:border-celeste" id="nit" placeholder="Ingrese Dirección" required />
            </div>
            <div className="form-group">
                <label htmlFor="nombre_factura">Nombre Factura: <span className="text-red-500">*</span></label>
                <input value={book?.nombre_factura} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-celeste focus:border-celeste block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-color-gray-o dark:focus:ring-celeste dark:focus:border-celeste" id="nombre_factura" placeholder="Ingrese Dirección" required />
            </div>
            <div className='form-group'>
              <label htmlFor="percentage" className="block text-sm font-medium text-gray-700">
                Selecciona un porcentaje:
              </label>
              <select
                id="percentage"
                name="percentage"
                // value={book?.porcentaje_descuento}
                // value={selectedPercentage}
                // onChange={(e) => setSelectedPercentage(e.target.value)}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option selected value="" disabled>Selecciona...</option>
                {options.map((percentage) => (
                  <option key={percentage} value={percentage}>
                    {percentage}%
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
                <label htmlFor="tel_contacto_principal">Teléfono: <span className="text-red-500">*</span></label>
                <input
                    value={book?.tel_contacto_principal} 
                    type="tel" 
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-celeste focus:border-celeste block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-color-gray-o dark:focus:ring-celeste dark:focus:border-celeste" 
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

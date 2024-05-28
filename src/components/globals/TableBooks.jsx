import React, { useEffect, useState } from 'react';
import { FaPlus, FaMinus, FaEdit } from 'react-icons/fa';
import { Modals } from './Modals';
import { toast } from 'react-toastify';

export const TableBooks = ({ items=[], reloadList = false }) => {
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
        const title = book.titulo.toLowerCase();
        const isbn = String(book.isbn); // Convertir el ISBN a string
        const searchTermLower = term.toLowerCase();
        return title.includes(searchTermLower) || isbn.includes(searchTermLower); // Buscar por título o ISBN
    });
};

// En el useEffect, actualiza los libros filtrados cuando cambie el término de búsqueda
useEffect(() => {
    console.log('searchTerm:', searchTerm);
    const filtered = filterBooks(items, searchTerm);
    console.log('filtered:', filtered);
    setFilteredBooks(filtered);
}, [items, searchTerm]);

// Ahora, en lugar de usar 'currentItems' para el Paginator, usa 'filteredBooks'


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

    const onOpenModal = () => { 
        console.log('Modal abierto')
        setIsOpen(true);
    }

    const handleNewBook = async () => {
        // Obtener los valores de los campos
        const editorial = document.getElementById('editorial').value;
        const isbn = document.getElementById('isbn').value;
        const titulo = document.getElementById('titulo').value;
        const precioUnitario = document.getElementById('precio_unitario').value;
      
        // Verificar si alguno de los campos está vacío
        if (editorial === '' || isbn === '' || titulo === '' ||  precioUnitario === '') {
            toast.error('Todos los campos son obligatorios, vuelve a intentarlo');
        } else {
            const params = {
                cantidad: 0,
                editorial,
                isbn,
                precio_unitario: Number(precioUnitario),
                titulo
            }
            try {
                const response = await fetch('http://localhost:4000/inventario', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(params)
                });
                if (response.ok) {
                    const data = await response.json();
                    if (!data || !data.name) {
                        toast.success('Se realizó la solicitud con éxito');
                        reloadList(true);
                        setIsOpen(false);
                    } else if (data.name === 'PrismaClientValidationError') {
                        toast.error('Se reportó un error al agregar el libro');
                    }
                } else {
                    console.error('Error en la solicitud:', response.statusText);
                }
            } catch (error) {
                console.error('Error al realizar la solicitud:', error);
            }
        }
    }

    const handleModalAmount = (valor) => {
        console.log(valor)
    }

    return (
        <>
            <div className='p-2'>
                <div className='grid grid-cols-8 gap-1'>
                    <div className='col-span-7'>
                        <form className="w-full mx-auto">
                            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Buscar</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <svg className="w-4 h-4 text-celeste dark:text-celeste" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                    </svg>
                                </div>
                                <input type="search" id="default-search" className="block w-full p-2 ps-10 text-sm text-black border border-gris-claro rounded-lg  focus:ring-gris-oscuro focus:border-gris-oscuro  dark:border-gris-oscuro  dark:text-black dark:focus:ring-gris-oscuro dark:focus:border-gris-oscuro" placeholder="Buscar..."  onChange={handleSearchChange} />
                            </div>
                        </form>
                    </div>
                    <button onClick={onOpenModal} className="flex items-center justify-center bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-600 hover:to-blue-800 text-white font-semibold py-1 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        <span className="text-lg">Nuevo</span>
                    </button>
                </div>

                <div>
      <div className='overflow-x-auto mt-4'>
        <table className="min-w-full bg-white border-gray-200 divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Título</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ISBN</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Editorial</th>
              <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Cantidad</th>
              <th scope="col" className="text-center px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Precio Unitario</th>
              <th scope="col" className="text-center px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Consignados</th>
              <th scope="col" className="text-center px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentItems.map((book, index) => (
                <tr className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{book.titulo}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{book.isbn}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{book.editorial}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="text-sm text-gray-900">{book.cantidad}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  {/* <div className="text-sm text-gray-900">${book.precio_unitario.toFixed(2)}</div> */}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  0
                </td>
                <td onClick={() => handleModalAmount(book)} className="px-6 py-4 whitespace-nowrap text-center flex justify-center">
                  <FaEdit className="text-blue-500 cursor-pointer" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
        >
          Anterior
        </button>
        <div className="flex">
          {startButtonIndex > 1 && (
            <button
              onClick={handlePreviousBlock}
              className="mx-1 px-4 py-2 bg-gray-300 text-gray-700 rounded"
            >
              ...
            </button>
          )}
          {Array.from({ length: endButtonIndex - startButtonIndex + 1 }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(startButtonIndex + index)}
              className={`mx-1 px-4 py-2 ${currentPage === startButtonIndex + index ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'} rounded`}
            >
              {startButtonIndex + index}
            </button>
          ))}
          {endButtonIndex < totalPages && (
            <button
              onClick={handleNextBlock}
              className="mx-1 px-4 py-2 bg-gray-300 text-gray-700 rounded"
            >
              ...
            </button>
          )}
        </div>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>
    </div>
            </div>
            <Modals 
                title='Ingresar Nuevo Libro' 
                opModal={isOpen} 
                handleClose={(newValue)=> setIsOpen(newValue)} 
                handleNewBook={(newValue) => handleNewBook()}
            >
                <div className='grid grid-cols-2 gap-1'>
                    <div className="form-group">
                        <label htmlFor="editorial">Editorial: <span className="text-red-500">*</span></label>
                        <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-celeste focus:border-celeste block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-celeste dark:focus:border-celeste" id="editorial" placeholder="Ingrese la editorial" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="isbn">ISBN: <span className="text-red-500">*</span></label>
                        <input type="number" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-celeste focus:border-celeste block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-celeste dark:focus:border-celeste" id="isbn" placeholder="Ingrese el ISBN" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="titulo">Título: <span className="text-red-500">*</span></label>
                        <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-celeste focus:border-celeste block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-celeste dark:focus:border-celeste" id="titulo" placeholder="Ingrese el título" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="precio_unitario">Precio Unitario: <span className="text-red-500">*</span></label>
                        <input type="number" step="0.01" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-celeste focus:border-celeste block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-celeste dark:focus:border-celeste" id="precio_unitario" placeholder="Ingrese el precio unitario" required />
                    </div>
                </div>
            </Modals>
        </>
    );
};

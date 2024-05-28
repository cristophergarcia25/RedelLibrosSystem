import React, { useEffect, useState } from 'react';
import { FaEdit, FaPlus } from 'react-icons/fa';
import { Modals } from './Modals';
import { toast } from 'react-toastify';
import { LOGIN_SUCCESS_MESSAGE } from '../../utils/messages';
import { IoTrashSharp } from 'react-icons/io5';


export const CardsBooks = ({ items, reloadList= false,  }) => {
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

const removeAccents = (str) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

const handleSearchChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);

    if (!isNaN(term)) {
        setFilteredBooks(items.filter(book => String(book.isbn).includes(term)));
    } else {
        setFilteredBooks(items.filter(book => removeAccents(book.titulo.toLowerCase()).includes(term.toLowerCase())));
    }
};

    const [isOpen, setIsOpen] = useState(false);


    const onOpenModal = () => { 
        console.log('Modal abierto')
        setIsOpen(true);
    }

    useEffect(() => {

    }, [isOpen]);

    const handleNewBook = async () => {
        // Obtener los valores de los campos
        const editorial = document.getElementById('editorial').value;
        const isbn = document.getElementById('isbn').value;
        const titulo = document.getElementById('titulo').value;
        // const cantidad = document.getElementById('cantidad').value;
        const precioUnitario = document.getElementById('precio_unitario').value;
      
        // Verificar si alguno de los campos está vacío
        if (editorial === '' || isbn === '' || titulo === '' ||  precioUnitario === '') {
          // Mostrar un mensaje de error o tomar otra acción para manejar el caso en que haya campos vacíos
          console.log('Todos los campos son obligatorio,vuelve a intentarlo');
          toast.error('Todos los campos son obligatorios, vuelve a intentarlo');
        } else {
          const params = {
            cantidad: 0 ,
            editorial,  
            isbn: isbn,
            precio_unitario: Number(precioUnitario),
            titulo
          }
          try {
            console.log(params)
            // Realiza la solicitud POST a la API
            const response = await fetch('http://localhost:4000/inventario', {
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
                toast.error('Se reportó un error al agregar el libro');
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
                            <input type="search" id="default-search" className="block w-full p-2 ps-10 text-sm text-black border border-gris-claro rounded-lg  focus:ring-gris-oscuro focus:border-gris-oscuro  dark:border-gris-oscuro  dark:text-black dark:focus:ring-gris-oscuro dark:focus:border-gris-oscuro" placeholder="Buscar..." required value={searchTerm} onChange={handleSearchChange} />
                            
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

                <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-1 p-2'>
                    {currentItems.map((book, index) => (
                        <div key={index} className="cursor-pointer text-base font-medium bg-gris-claro border border-gris-oscuro rounded-lg shadow dark:bg-gris-claro dark:border-gris-oscuro">
                            <div className="bg-celeste w-full rounded-t-lg flex justify-center items-center p-2">
                              <p title={book.titulo} className="text-xl truncate font-bold text-white">{book.titulo}</p>
                            </div>
                            <div className='p-2'>
                              <p className="text-medium text-black dark:text-black">ISBN: {book.isbn}</p>
                              <p className="text-medium text-black dark:text-black">Editorial: {book.editorial}</p>
                              {/* <p className="text-medium text-black dark:text-black">Cantidad: {book.cantidad}</p> */}
                              {/* <p className="text-medium text-black dark:text-black">Precio Unitario: ${book.precio_unitario.toFixed(2)}</p> */}
                            </div>
                            <div className='flex justify-center items-center p-2 cursor-pointer'>
                              <FaEdit className='text-2xl m-2 shrink-0 text-celeste hover:text-indigo-300 dark:text-celeste' />
                              {/* <IoTrashSharp className='text-2xl m-2 shrink-0 text-red-500 hover:text-red-700 dark:text-red-500' /> */}
                            </div>
                        </div>
                    ))}
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

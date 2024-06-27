import React, { useEffect, useRef, useState } from 'react';
import { FaCheckCircle, FaEdit, FaPlus, FaTimesCircle } from 'react-icons/fa';
import { Modals } from './Modals';
import { toast } from 'react-toastify';
import { LOGIN_SUCCESS_MESSAGE } from '../../utils/messages';
import { IoTrashOutline, IoTrashSharp } from 'react-icons/io5';
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from 'react-icons/md';
import { CiEdit } from 'react-icons/ci';


export const CardsBooks = ({ items, reloadList= false,  }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const ref = useRef(null);
  const [itemsPerPage] = useState(12);
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
    const [isOpen2, setIsOpen2] = useState(false);	

    const [book, setBook] = useState(null);//[{}
    const handleModalAmount = (valor) => {
        console.log(valor);
        setBook(valor);
        setIsOpen2(true);
    }

    useEffect(() => {
      console.log('book:', book);
    }, [book]);


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
      const precioUnitario = document.getElementById('precio_unitario').value;
      const costo_fob = document.getElementById('costo_fob').value;
    
      // Verificar si alguno de los campos está vacío
      if (editorial === '' || isbn === '' || titulo === '' ||  precioUnitario === '' || costo_fob === '') {
          toast.error('Todos los campos son obligatorios, vuelve a intentarlo');
      } else {
          const params = {
              cantidad: 0,
              editorial,
              isbn,
              precio_unitario: Number(precioUnitario),
              titulo,
              costo_fob: Number(costo_fob)
          }
          console.log(params)
          try {
              const response = await fetch('http://localhost:4000/inventario', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(params)
              });
              console.log(response)
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
      

    return (
        <>
            <div className='p-2 pr-6'>
            <div className='grid grid-cols-8 gap-1'>
                    <div className='col-span-7'>
                        <form className="w-full mx-auto">
                            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-color-gray-o sr-only dark:text-white">Buscar</label>
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
                    <button onClick={onOpenModal} className="flex items-center justify-center  bg-color-yellow text-white font-semibold px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        <span className="text-base">Nuevo</span>
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                  {currentItems.map((book, index) => (
                    <div key={index} className="bg-color-gray  rounded-lg overflow-hidden shadow-md hover:shadow-lg">
                      <div className="bg-color-green text-color-gray-o py-1 px-4">
                        <p title={book.titulo} className="text-lg  text-color-gray font-bold truncate">{book.titulo}</p>
                      </div>
                          
                          <div className="p-4">
                            <div className='flex justify-center items-center text-sm mb-1'>
                            {book.estado === 'activo' ? <FaCheckCircle className="text-green-500 ml-2" /> : <FaTimesCircle className="text-red-500 ml-2" />}
                              <p>ISBN: {book.isbn}</p>
                            </div>
                            <div className='flex justify-center items-center text-sm mb-2'>
                                <p>Editorial: {book.editorial}</p>
                              </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2">
                              <div className="text-sm text-color-gray-o">
                                <p>PVP: {'$' + book.precio_unitario.toFixed(2)}</p>
                              </div>
                              <div className='text-sm text-color-gray-o'>
                                <p>Costo Fob: { '$' + book.costo_fob.toFixed(2)}</p>
                              </div>
                            </div>
                          </div>
                      <div className="flex justify-center items-center bg-gray-300 py-4">
                        <button title='Editar' onClick={() => handleModalAmount(book)} className="text-blue-600 mx-2">
                          <CiEdit className="w-6 h-6" />
                        </button>
                        {/* <button className="text-red-500  mx-2">
                          <IoTrashOutline className="text-xl" />
                        </button> */}
                      </div>
                    </div>
                  ))}
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
                
            </div>
            <Modals 
            title='Ingresar Nuevo Libro' 
            opModal={isOpen} 
            handleClose={(newValue)=> setIsOpen(newValue)} 
            handleNewBook={(newValue) => handleNewBook()}
        >
            <div className='grid grid-cols-2 gap-1'>
                <div className="form-group">
                    <label htmlFor="editorial"><span className='text-color-gray'>Editorial:</span> <span className="text-red-500">*</span></label>
                    <input type="text" className="text-color-gray-o  rounded-lg focus:ring-musgo focus:border-musgo block w-full p-2.5   dark:focus:ring-musgo dark:focus:border-musgo" id="editorial" placeholder="Ingrese la editorial" required />
                </div>
                <div className="form-group">
                    <label value={book?.isbn} htmlFor="isbn"><span className='text-color-gray '>ISBN:</span> <span className="text-red-500">*</span></label>
                    <input type="number" className="text-color-gray-o  rounded-lg focus:ring-musgo focus:border-musgo block w-full p-2.5   dark:focus:ring-musgo dark:focus:border-musgo" id="isbn" placeholder="Ingrese el ISBN" required />
                </div>
                <div className="form-group">
                    <label htmlFor="titulo"><span className='text-color-gray'>Título:</span> <span className="text-red-500">*</span></label>
                    <input type="text" className="text-color-gray-o  rounded-lg focus:ring-musgo focus:border-musgo block w-full p-2.5   dark:focus:ring-musgo dark:focus:border-musgo" id="titulo" placeholder="Ingrese el título" required />
                </div>
                <div className="form-group">
                    <label htmlFor="precio_unitario"><span className='text-color-gray'>Precio Unitario: </span><span className="text-red-500">*</span></label>
                    <input type="number" step="0.01" className="text-color-gray-o  rounded-lg focus:ring-musgo focus:border-musgo block w-full p-2.5   dark:focus:ring-musgo dark:focus:border-musgo" id="precio_unitario" placeholder="Ingrese el precio unitario" required />
                </div>
                <div className="form-group">
                    <label htmlFor="costo_fob"><span className='text-color-gray'>Costo Fob: </span><span className="text-red-500">*</span></label>
                    <input type="number" step="0.01" className="text-color-gray-o  rounded-lg focus:ring-musgo focus:border-musgo block w-full p-2.5   dark:focus:ring-musgo dark:focus:border-musgo" id="costo_fob" placeholder="Ingrese el Costo Fob" required />
                </div>
            </div>
        </Modals>
        <Modals 
            title='Editar Inventario' 
            opModal={isOpen2} 
            handleClose={(newValue)=> setIsOpen2(newValue)} 
            handleNewBook={(newValue) => handleNewBook()}
        >
             <form  onSubmit={handleNewBook} className='grid grid-cols-2 gap-1'>
                <div className="form-group">
                    <label htmlFor="editorial">
                        <span className='text-color-gray'>Editorial:</span>
                        <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="editorial"
                        value={book?.editorial}
                        className="text-color-gray-o rounded-lg focus:ring-musgo focus:border-musgo block w-full p-2.5 dark:focus:ring-musgo dark:focus:border-musgo"
                        id="editorial"
                        placeholder="Ingrese la editorial"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="isbn">
                        <span className='text-color-gray'>ISBN:</span>
                        <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="number"
                        name="isbn"
                        value={book?.isbn}
                        className="text-color-gray-o rounded-lg focus:ring-musgo focus:border-musgo block w-full p-2.5 dark:focus:ring-musgo dark:focus:border-musgo"
                        id="isbn"
                        placeholder="Ingrese el ISBN"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="titulo">
                        <span className='text-color-gray'>Título:</span>
                        <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="titulo"
                        value={book?.titulo}
                        className="text-color-gray-o rounded-lg focus:ring-musgo focus:border-musgo block w-full p-2.5 dark:focus:ring-musgo dark:focus:border-musgo"
                        id="titulo"
                        placeholder="Ingrese el título"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="precio_unitario">
                        <span className='text-color-gray'>Precio Unitario:</span>
                        <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="number"
                        step="0.01"
                        value={book?.precio_unitario}
                        name="precio_unitario"
                        className="text-color-gray-o rounded-lg focus:ring-musgo focus:border-musgo block w-full p-2.5 dark:focus:ring-musgo dark:focus:border-musgo"
                        id="precio_unitario"
                        placeholder="Ingrese el precio unitario"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="costo_fob">
                        <span className='text-color-gray'>Costo Fob:</span>
                        <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="number"
                        step="0.01"
                        value={book?.costo_fob}
                        name="costo_fob"
                        className="text-color-gray-o rounded-lg focus:ring-musgo focus:border-musgo block w-full p-2.5 dark:focus:ring-musgo dark:focus:border-musgo"
                        id="costo_fob"
                        placeholder="Ingrese el Costo Fob"
                        required
                    />
                </div>
                <div className='flex justify-center items-center'>
                    <label className="inline-flex items-center cursor-pointer">
                        <input type="checkbox" name="estado" value="" className="sr-only peer" />
                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                        <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Estado</span>
                    </label>
                </div>
            </form>
        </Modals>
        </>
    );
};

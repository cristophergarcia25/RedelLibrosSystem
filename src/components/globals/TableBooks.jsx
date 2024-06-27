import React, { useEffect, useState } from 'react';
import { FaPlus, FaMinus, FaEdit, FaRegCheckCircle } from 'react-icons/fa';
import { Modals } from './Modals';
import { toast } from 'react-toastify';
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight, MdOutlineNoteAdd } from 'react-icons/md';
import { FcCancel } from 'react-icons/fc';
import { HiOutlineDocumentAdd, HiOutlineDocumentRemove } from 'react-icons/hi';

export const TableBooks = ({ items=[], reloadList = false, showNewButton = false }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(14);
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
    const [isOpen2, setIsOpen2] = useState(false);
    const [isOpen3, setIsOpen3] = useState(false);

    const onOpenModal = () => { 
        setIsOpen(true);
    }

    const onOpenModal2 = () => { 
      setIsOpen2(true);
  }

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

    const handleEditBook = async () => {
      // Obtener los valores de los campos
      const cantidad = document.getElementById('cantidad').value;

      // Verificar si alguno de los campos está vacío
      if (cantidad === '') {
          toast.error('Todos los campos son obligatorios, vuelve a intentarlo');
      } else {
          console.log(book)
          const params = {
              id: book.id,
              cantidad: book.cantidad + Number(cantidad)
              // editorial: book.editorial,
              // isbn: book.isbn,
              // precio_unitario: book.precio_unitario,
              // titulo: book.titulo,
              // costo_fob: book.costo_fob
          }
          console.log(params)
          console.log(JSON.stringify(params))
          try {
            const response = await fetch('http://localhost:4000/inventario', {
              method: 'PUT',
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
                      setIsOpen2(false);
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
    const [book, setBook] = useState(null);//[{}
    const handleModalAmount = (valor) => {
        console.log(valor);
        setBook(valor);
        setIsOpen2(true);
    }

    const handleModalAmount2 = (valor) => {
      console.log(valor);
      setBook(valor);
      setIsOpen3(true);
    }

    return (
        <>
            <div className='p-2 pr-6'>
            <div className='grid grid-cols-8 gap-1'>
                    <div className={`${showNewButton ? 'col-span-7': 'col-span-8'}`}>
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
                    <button onClick={onOpenModal} className={`${showNewButton ? 'block':'hidden'} flex items-center justify-center  bg-color-yellow text-white font-semibold px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105`}>
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
                              <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-color-gray-o uppercase tracking-wider">Título</th>
                              <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-color-gray-o uppercase tracking-wider">ISBN</th>
                              <th scope="col" className="px-4 text-center py-2 text-left text-xs font-medium text-color-gray-o uppercase tracking-wider">Editorial</th>
                              <th scope="col" className="px-4 py-2 text-center text-xs font-medium text-color-gray-o uppercase tracking-wider">Cantidad</th>
                              <th scope="col" className="px-4 py-2 text-center text-xs font-medium text-color-gray-o uppercase tracking-wider">Consignados</th>
                              <th scope="col" className="px-2 py-2 text-center text-xs font-medium text-color-gray-o uppercase tracking-wider">Costo Fob</th>
                              <th scope="col" className="px-2 py-2 text-center text-xs font-medium text-color-gray-o uppercase tracking-wider">Total Fob</th>
                              <th scope="col" className="px-2 py-2 text-center text-xs font-medium text-color-gray-o uppercase tracking-wider">Precio Unitario</th>
                              <th scope="col" className="px-2 py-2 text-center text-xs font-medium text-color-gray-o uppercase tracking-wider">Total</th>
                              {/* <th scope="col" className="px-2 py-2 text-center text-xs font-medium text-color-gray-o uppercase tracking-wider">Estado</th> */}
                              <th scope="col" className="px-4 py-2 text-center text-xs font-medium text-color-gray-o uppercase tracking-wider">Acciones</th>
                          </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                          {currentItems.map((book, index) => (
                              <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                                  <td title={book.titulo} className="px-4 py-2 text-sm text truncate">{book.titulo}</td>
                                  <td className="px-4 py-2 text-sm text-color-gray-o ml-3">{book.isbn}</td>
                                  <td className="px-4 py-2 text-sm text-center text-color-gray-o truncate ">{book.editorial}</td>
                                  <td className="px-4 py-2 text-center text-sm text-color-gray-o truncate">{book.cantidad}</td>
                                  <td className="px-4 py-2 text-center text-sm text-color-gray-o truncate">0</td>
                                  <td className="px-4 py-2 text-center text-sm text-color-gray-o truncate">${book.costo_fob}</td>
                                  <td className="px-4 py-2 text-center text-sm text-color-gray-o truncate">${book.total_fob}</td>
                                  <td className="px-4 py-2 text-center text-sm text-color-gray-o truncate">${book.precio_unitario.toFixed(2)}</td>
                                  <td className="px-4 py-2 text-center text-sm text-color-gray-o truncate">${book.total}</td>
                                  {/* <td className="px-4 py-2 text-center text-sm text-color-gray-o truncate">
                                  {book.estado.toLowerCase() === 'activo' ? (
                                   <div>
                                     <FaRegCheckCircle className='text-green-500' />
                                   </div>
                                  ) : (
                                    <div>
                                      <FcCancel />
                                   </div>
                                  )}
                                </td> */}
                                  <td  className="px-4 py-2 text-center text-sm  cursor-pointer flex justify-center">
                                      <div onClick={() => handleModalAmount(book)} className='flex'>
                                        <HiOutlineDocumentAdd className='w-5 h-5 text-blue-500' />
                                      </div>
                                      <div onClick={() => handleModalAmount2(book)}>
                                        <HiOutlineDocumentRemove className='w-5 h-5 text-red-500' />
                                      </div>
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
                    <label htmlFor="isbn"><span className='text-color-gray '>ISBN:</span> <span className="text-red-500">*</span></label>
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
            title='Agregar Inventario' 
            opModal={isOpen2} 
            handleClose={(newValue)=> setIsOpen2(newValue)} 
            handleNewBook={(newValue) => handleEditBook()}
        >
            <div className='grid grid-cols-1 gap-1'>
                <div className="form-group">
                    <label htmlFor="cantidad"><span className='text-color-gray'>Ingrese Cantidad a Aumentar:</span> <span className="text-red-500">*</span></label>
                    <input type="text" className="text-color-gray-o  rounded-lg focus:ring-musgo focus:border-musgo block w-full p-2.5   dark:focus:ring-musgo dark:focus:border-musgo" id="cantidad" placeholder="Ingrese la cantidad" required />
                </div>
            </div>
        </Modals>
        <Modals 
            title='Eliminar de Inventario' 
            opModal={isOpen3} 
            handleClose={(newValue)=> setIsOpen3(newValue)} 
            handleNewBook={(newValue) => handleEditBook()}
        >
            <div className='grid grid-cols-1 gap-1'>
                <div className="form-group">
                    <label htmlFor="cantidad"><span className='text-color-gray'>Ingrese Cantidad a Descontar:</span> <span className="text-red-500">*</span></label>
                    <input type="text" className="text-color-gray-o  rounded-lg focus:ring-musgo focus:border-musgo block w-full p-2.5   dark:focus:ring-musgo dark:focus:border-musgo" id="cantidad" placeholder="Ingrese la cantidad" required />
                </div>
                <div className="form-group">
                    <label htmlFor="descripcion"><span className='text-color-gray'>Motivo:</span> <span className="text-red-500">*</span></label>
                    <textarea type="text" className="text-color-gray-o  rounded-lg focus:ring-musgo focus:border-musgo block w-full p-2.5   dark:focus:ring-musgo dark:focus:border-musgo" id="descripcion" placeholder="Ingrese el porque desea disminuir" required />
                </div>
            </div>
        </Modals>
        </>
    );
};

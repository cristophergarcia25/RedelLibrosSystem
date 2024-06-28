import React, { useEffect, useState } from 'react';
import { FaPlus, FaMinus, FaEdit, FaCheck, FaEye } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { Modals } from '../Modals';
import { MdCancel, MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from 'react-icons/md';
import { BiPlus, BiTrash } from 'react-icons/bi';
import Select from 'react-select';
import { decryptAndGetLocalStorage } from '../../../funciones/functions';

export const TableCotizaciones = ({ items=[], reloadList = false, showNewButton=false, clientes, libros }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedLibro, setSelectedLibro] = useState(null);

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
    const [isOpen3, setIsOpen3] = useState(false);
    const [isOpen4, setIsOpen4] = useState(false);

    const onOpenModal = () => { 
        console.log('Modal abierto')
        setIsOpen(true);
    }

    const onOpenModal2 = () => { 
        console.log('Modal abierto')
        setIsOpen2(true);
    }

    const onOpenModal3 = () => { 
        console.log('Modal abierto')
        setIsOpen3(true);
    }

    const onOpenModal4 = () => { 
      console.log('Modal abierto')
      setIsOpen4(true);
  }

    const handleNewBook = async () => {
        // Obtener los valores de los campos
        const intitucion = document.getElementById('id_institucion').value;
        const usuario = decryptAndGetLocalStorage('user');
        console.log(usuario)
        // Verificar si alguno de los campos está vacío
        if (intitucion === '') {
            toast.error('Todos los campos son obligatorios, vuelve a intentarlo');
        } else {
          if(detalles.length === 0){
            toast.error('Debe agregar al menos un detalle antes de enviar la solicitud')
            return;
          }
          // Utiliza map para crear una nueva lista de detalle_articulos sin precio_total y titulo.
          const detalle_articulos_modificado = detalles.map(({ id, cantidad, precio_unitario }) => ({
            id_inventario: id,
            cantidad,
            precio_unitario
          }));

          const params = {
              id_institucion: intitucion,
              id_usuario_solicita: usuario.id,
              detalle_articulos : detalle_articulos_modificado
          }
            console.log(params)
            try {
                const response = await fetch('http://localhost:4000/cotizacion', {
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

    

  const [expandedRows, setExpandedRows] = useState([]);

  const handleRowClick = (index) => {
    if (expandedRows.includes(index)) {
      setExpandedRows(expandedRows.filter((rowIndex) => rowIndex !== index));
    } else {
      setExpandedRows([...expandedRows, index]);
    }
  };


  // Opciones para el select
  const options = libros.map((libro) => ({
    value: libro.id,
    label: `${libro.isbn} - ${libro.titulo} - Cantidad: ${libro.cantidad}`,
    masinfo: libro
  }));

  const [detalleSeleccionado, setDetalleSeleccionado] = useState(null);
  // Manejador de cambios
  const handleChange = (selectedOption) => {
    console.log('Option selected:', selectedOption);
    document.getElementById('precio_unitario').value = selectedOption.masinfo.precio_unitario; 
    setDetalleSeleccionado(selectedOption.masinfo);
    setSelectedLibro(selectedOption);
  };

  const [detalles, setDetalles] = useState([]);

  const handleAddDetalle = () => {
    const institucion = document.getElementById('id_institucion').value;
    console.log(institucion)
    if(institucion === '' || institucion === null) {
      toast.error('Debe seleccionar una institución antes de agregar detalle')
      return;
    }

    const cantidadInput = document.getElementById('cantidad');
    const cantidad = Number(cantidadInput.value);

    if (cantidad === '' || !detalleSeleccionado || cantidad === 0) {
      toast.error('Debe seleccionar un libro y especificar la cantidad mayor a 0');
      return;
    }

    if (cantidad > detalleSeleccionado.cantidad) {
      toast.error(`No hay suficientes unidades en inventario para ${detalleSeleccionado.titulo}`);
      return;
    }

    const precioUnitarioInput = document.getElementById('precio_unitario');
    const precioUnitario = Number(precioUnitarioInput.value);
    const detalleId = detalleSeleccionado.id;
    const detalleTitulo = detalleSeleccionado.titulo;
    const precioTotal = cantidad * precioUnitario;

    // Verificar si el artículo ya existe
    const indexExistente = detalles.findIndex((detalle) => detalle.id === detalleId);

    if (indexExistente >= 0) {
      // Si el artículo ya existe, actualizar cantidad y precio total
      const detallesActualizados = detalles.map((detalle, index) => {
        if (index === indexExistente) {
          const nuevaCantidadTotal = detalle.cantidad + cantidad;

          if (nuevaCantidadTotal > detalleSeleccionado.cantidad) {
            toast.error(`No puedes ingresar más de ${detalleSeleccionado.cantidad} unidades para ${detalleSeleccionado.titulo}`);
            return detalle;
          }

          return {
            ...detalle,
            cantidad: nuevaCantidadTotal,
            precio_total: nuevaCantidadTotal * detalle.precio_unitario,
          };
        }
        return detalle;
      });

      setDetalles(detallesActualizados);
    } else {
      // Si el artículo no existe, agregar un nuevo detalle
      const nuevoDetalle = {
        id: detalleId,
        titulo: detalleTitulo,
        cantidad,
        precio_unitario: precioUnitario,
        precio_total: precioTotal,
      };

      setDetalles([...detalles, nuevoDetalle]);
    }

    setDetalleSeleccionado(null);
    setSelectedLibro(null);
    cantidadInput.value = 0;
    precioUnitarioInput.value = 0;
  };

  useEffect(() => {
    console.log(detalles)
  }, [detalles]);

  const onDeleteItem = (index) => {
    const nuevosDetalles = detalles.filter((_, i) => i !== index);
    setDetalles(nuevosDetalles);
  }

  const [datosInstitucion,setDatosInstitucion]=useState('');

  const onChangeInstitucion = (e)=>{
    const institucion = e.target.value
    console.log(institucion)
    const institucionExistente = clientes.find((cliente) => cliente.id === institucion);
    console.log(institucionExistente)
    setDatosInstitucion(institucionExistente)

  }

  useEffect(()=>{
    console.log(datosInstitucion)
  },[datosInstitucion])

  const valorTotal = detalles.reduce((total, detalle) => total + detalle.precio_total, 0)
  const totalDescuento = detalles.reduce((total, detalle) => ((valorTotal)*(datosInstitucion.porcentaje_descuento / 100)), 0);
  const totalPrecio = valorTotal - totalDescuento;

  const [infoDetail, setInfoDetail] = useState({});
  const openDetalle = (entry) => {
    console.log(entry)
    setInfoDetail(entry);
    setIsOpen4(true);
  }

  const getEstadoTexto = (estado) => {
    switch (estado) {
      case 'D':
        return 'Denegado';
      case 'A':
        return 'Aprobado';
      case 'P':
        return 'Pendiente';
      default:
        return 'Desconocido';
    }
  };


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
                    <button onClick={onOpenModal} className={`${showNewButton ? 'block':'hidden'} flex items-center justify-center  bg-color-yellow text-white font-semibold px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        <span className="text-base">Nuevo</span>
                    </button>
                </div>

                <div>
                <div className="overflow-x-auto mt-4 w-full">
                  <table className="w-full max-w-full bg-white border border-gray-300 table-fixed">
                      <thead className="bg-gray-50 text-center">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Institución</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dirección</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contacto Principal</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teléfono Contacto Principal</th>
                          <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                          <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID Usuario Solicita</th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Detalle</th>
                          <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Aprobar-Denegar</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {currentItems.map((entry, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                              <td className="px-6 py-4 text-xs whitespace-nowrap">{entry.institucion.nombre}</td>
                              <td className="px-6 py-4 text-xs whitespace-nowrap">{entry.institucion.direccion}</td>
                              <td className="px-6 py-4 text-xs whitespace-nowrap">{entry.institucion.contacto_principal}</td>
                              <td className="px-6 py-4 text-xs whitespace-nowrap">{entry.institucion.tel_contacto_principal}</td>
                              <td className="px-6 py-4 text-xs whitespace-nowrap text-center">{new Date(entry.fecha).toLocaleDateString()}</td>
                              <td className="px-6 py-4 text-xs whitespace-nowrap text-center">{entry.estado === 'P' ? 'Pendiente' :
                                entry.estado === 'D'? 'Denegado' : 'Autorizado'}</td>
                              <td className="px-6 py-4 text-xs whitespace-nowrap">{entry.id_usuario_solicita}</td>
                              <td className="px-6 py-4 text-xs whitespace-nowrap ">
                                <div onClick={() => openDetalle(entry)} className='flex justify-end'>
                                  <FaEye className="text-blue-500 cursor-pointer flex-shrink-0 w-4 h-4 mr-2" />
                                </div>
                              </td>
                              <td className="px-6 py-4 text-xs whitespace-nowrap flex justify-center items-center">
                                <FaCheck onClick={onOpenModal2} className="text-green-500 cursor-pointer flex-shrink-0 w-4 h-4 mr-2" />
                                <MdCancel onClick={onOpenModal3} className="text-red-500 cursor-pointer flex-shrink-0 w-4 h-4 ml-2" />
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
            </div>
            <Modals
                title='Ingresar Nueva Cotizacion' 
                size='xs'
                opModal={isOpen} 
                handleClose={(newValue)=> {setIsOpen(newValue); setDetalleSeleccionado(null); setSelectedLibro(null)}} 
                handleNewBook={(newValue) => handleNewBook()}
            >
                <div className='grid grid-cols-2 gap-1 '>
                  <div className='grid grid-cols-3 gap-1'>
                    <div className='form-group col-span-3'>
                      <label htmlFor="percentage" className="block text-sm font-medium text-gray-700">
                        Selecciona una Institución:<span className="text-red-500">*</span>
                      </label>
                      <select
                        id="id_institucion"
                        name="id_institucion"
                        // value={selectedPercentage}
                        onChange={(e) => onChangeInstitucion(e)}
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        <option selected value="" disabled>Selecciona...</option>
                        {clientes?.map((cliente) => (
                          <option key={cliente?.id} value={cliente?.id}>
                            {cliente?.nombre} - Porcentaje Descuento: {cliente?.porcentaje_descuento}%
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className='py-2 col-span-3'>
                        <label className='font-bold' htmlFor="">Seleccione libros a cotizar:</label>
                    </div>
                    <div className='form-group col-span-3'>
                    <label htmlFor="id_libro" className="block text-sm font-medium text-gray-700">
                        Libro: <span className="text-red-500">*</span>
                      </label>
                      <Select
                        id="id_libro"
                        name="id_libro"
                        maxMenuHeight={140}
                        value={selectedLibro}
                        onChange={handleChange}
                        options={options}
                        placeholder="Selecciona..."
                        classNamePrefix="react-select"
                        className="mt-1 block w-full"
                      />
                    </div>
                    <div className='col-span-1'>
                      <label htmlFor="cantidad">Cantidad: <span className="text-red-500">*</span></label>
                      <input  type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-celeste focus:border-celeste block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-color-gray-o dark:focus:ring-celeste dark:focus:border-celeste" id="cantidad" placeholder="Ingrese Cantidad" required />
                    </div>
                    <div className='col-span-1'>
                      <label htmlFor="precio_unitario">Precio Unitario: <span className="text-red-500">*</span></label>
                      <input disabled  type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-celeste focus:border-celeste block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-color-gray-o dark:focus:ring-celeste dark:focus:border-celeste" id="precio_unitario" placeholder="Ingrese Precio Unitario" required />
                    </div>
                    <div className='col-span-1 mt-7'>
                      <button onClick={() => handleAddDetalle()} className='custom-button'>
                        <BiPlus className='w-5 h-5' />
                        Agregar
                      </button>
                    </div>
                  </div>
                  <div className="ml-4 h-[430px] overflow-auto">
                    <label className='font-bold ml-4'>Detalle Artículos</label>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Título
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Cantidad
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Precio Unitario
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Precio Total
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Eliminar
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {detalles.map((detalle, index) => (
                            <tr key={index}>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="ml-4">
                                    <div className="text-sm font-medium text-gray-900">
                                      {detalle.titulo}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{detalle.cantidad}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                  ${detalle.precio_unitario.toFixed(2)}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                ${detalle.precio_total.toFixed(2)}
                              </td>
                              <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-500">
                                <button onClick={() => onDeleteItem(index)}>
                                  <BiTrash className='w-5 h-5 text-red-500' />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Totales */}
                    <div className="mt-4">
                      <table className="min-w-full">
                        <tbody className="bg-gray-100">
                          <tr>
                            <td className=" py-1 whitespace-nowrap text-right text-sm font-medium text-gray-900">
                              Total :
                            </td>
                            <td className=" py-1 whitespace-nowrap text-left text-sm font-semibold text-green-700">
                              ${valorTotal.toFixed(2)}
                            </td>
                          </tr>
                          <tr>
                          < td className=" py-1 whitespace-nowrap text-right text-sm font-medium text-gray-900">
                              Descuento:
                            </td>
                            <td className=" py-1 whitespace-nowrap text-left text-sm font-semibold text-green-700">
                              ${totalDescuento.toFixed(2)}
                            </td>
                          </tr>
                          <tr>
                          <td className=" py-1 whitespace-nowrap text-right text-sm font-medium text-gray-900">
                              Total Final:
                            </td>
                            <td className="py-1 whitespace-nowrap text-left text-sm font-semibold text-green-700">
                              ${totalPrecio.toFixed(2)}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>


                </div>
            </Modals>
            <Modals
                title='Autorizar Cotización' 
                opModal={isOpen2} 
                handleClose={(newValue)=> setIsOpen2(newValue)} 
                handleNewBook={(newValue) => ''}
            >
                ¿Desea autorizar esta cotización?
              
            </Modals>
            <Modals
                title='Denegar Cotización' 
                opModal={isOpen3} 
                handleClose={(newValue)=> setIsOpen3(newValue)} 
                handleNewBook={(newValue) => ''}
            >
                <div className=''>
                  
                  <label htmlFor="">Observaciones</label><span className="text-red-500">*</span>
                </div>
                  <input type="textarea" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-celeste focus:border-celeste block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-celeste dark:focus:border-celeste" id="editorial" placeholder="Ingrese ..." required />
            </Modals>
            <Modals
                title='Detalle   Cotización' 
                opModal={isOpen4} 
                handleClose={(newValue)=> setIsOpen4(newValue)} 
                handleNewBook={(newValue) => ''}
                showFooter={false}
                size='xs'
            >
              <div className="p-4">
                <h3 className="text-lg font-bold mb-2">Institución</h3>
                <p><strong>Nombre:</strong> {infoDetail?.institucion?.nombre}</p>
                <p><strong>Porcentaje de Descuento:</strong> {infoDetail?.institucion?.porcentaje_descuento}%</p>
                <p><strong>Dirección:</strong> {infoDetail?.institucion?.direccion}</p>
                <p><strong>Contacto Principal:</strong> {infoDetail?.institucion?.contacto_principal}</p>
                <p><strong>Tel. Contacto Principal:</strong> {infoDetail?.institucion?.tel_contacto_principal}</p>
                {infoDetail?.institucion?.contacto_secundario && (
                  <p><strong>Contacto Secundario:</strong> {infoDetail?.institucion?.contacto_secundario}</p>
                )}
                {infoDetail?.institucion?.tel_contacto_secundario && (
                  <p><strong>Tel. Contacto Secundario:</strong> {infoDetail?.institucion?.tel_contacto_secundario}</p>
                )}

                <h3 className="text-lg font-bold mb-2 mt-4">Detalles de Artículos</h3>
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID Inventario</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cantidad</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio Unitario</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio Total</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {infoDetail?.detalle_articulos?.map((articulo, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap">{articulo.id_inventario}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{articulo.cantidad}</td>
                        <td className="px-6 py-4 whitespace-nowrap">${articulo.precio_unitario.toFixed(2)}</td>
                        <td className="px-6 py-4 whitespace-nowrap">${(articulo.cantidad * articulo.precio_unitario).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <h3 className="text-lg font-bold mb-2 mt-4">Resumen</h3>
                <p><strong>Fecha:</strong> {new Date(infoDetail.fecha).toLocaleDateString()}</p>
                <p><strong>Estado:</strong> {getEstadoTexto(infoDetail.estado)}</p>
              </div>
            </Modals>
        </>
    );
};

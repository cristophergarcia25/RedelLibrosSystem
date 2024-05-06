// Sidebar.js

import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import useHasMounted from "../../hooks/useHasMounted";
import { generateUniqueNumber } from "../../funciones/functions";

function Sidebar() {
    const router = useRouter()
    const hasMounted = useHasMounted();
    const uniqueNumber = generateUniqueNumber();



    const logout = async () => {
        const response = await fetch('/api/auth/logout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            // body: JSON.stringify({ email, password }),
          })
          router.push('/')
          localStorage.clear();

          console.log(response)
    }

    const [isHistorialOpen, setIsHistorialOpen] = useState(false);

    const handleHistorialClick = () => {
        setIsHistorialOpen(!isHistorialOpen); // Toggle the menu open/closed
    };


    const [isFacturasOpen, setIsFacturasOpen] = useState(false);
    6
    const handleFacturasClick = () => {
        setIsFacturasOpen(!isFacturasOpen); // Toggle the menu open/closed
    };

    const getEnv = () => {
        console.log('se cargo')
        
      }
  
      useEffect(() => {
        if (hasMounted) {
          getEnv();
        }
      }, [hasMounted]); 


    return (
      <>
        {hasMounted && (
            <aside id="default-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
            <div className="h-full px-3 py-4 overflow-y-auto bg-celeste dark:bg-celeste">
                <a  className="flex items-center ps-2.5 mb-5">
                    <img src="/logoblanco.png" className="h-8 me-3 sm:h-10" alt="Redel Logo" />
                    <span className="self-center text-xl font-semibold whitespace-nowrap text-white dark:text-white">Redel Libros</span>
                </a>
                <ul className="space-y-2 font-medium">
                    <li onClick={()=>router.push(`/welcome/${uniqueNumber}`)}>
                        <a href="#" className="flex items-center p-2 text-white rounded-lg dark:text-white hover:bg-azul dark:hover:bg-azul group">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                        </svg>
    
                        <span className="ms-3">Inicio</span>
                        </a>
                    </li>
                    
                    <li onClick={()=>router.push(`/inventario/${uniqueNumber}`)}>
                        <a href="#" className="flex items-center p-2 text-white rounded-lg dark:text-white  hover:bg-azul dark:hover:bg-azul group">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
                        </svg>
                        <span className="flex-1 ms-3 whitespace-nowrap">Inventario</span>
                        </a>
                    </li>
                    <li                 
                        onClick={()=>router.push(`/libros/${uniqueNumber}`)}
    >
                        <button type="button" className="flex items-center w-full p-2 text-base  text-white rounded-lgtransition duration-75 rounded-lg group  hover:bg-azul dark:hover:bg-azul group dark:text-white " aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                        </svg>
    
                            <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">Libros</span>
                          
                        </button>
                    </li>
                    
                   
                    <li onClick={()=>router.push(`/clientes/${uniqueNumber}`)}>
                        <a href="#" className="flex items-center p-2 text-white rounded-lg dark:text-white hover:bg-azul  dark:hover:bg-azul">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                        </svg>
    
                        <span className="flex-1 ms-3 whitespace-nowrap">Clientes</span>
                        </a>
                    </li>
                    <li onClick={()=>router.push(`/cotizaciones/${uniqueNumber}`)}>
                        <a href="#" className="flex items-center p-2 text-white rounded-lg  dark:text-white hover:bg-azul  dark:hover:bg-azul group">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
    
                        <span className="flex-1 ms-3 whitespace-nowrap">Cotizaciones</span>
                        </a>
                    </li>
                    <li onClick={()=>router.push(`/consignaciones/${uniqueNumber}`)}>
                        <a href="#" className="flex items-center p-2 text-white rounded-lg dark:text-white hover:bg-azul  dark:hover:bg-azul group">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z" />
                        </svg>
                        <span className="flex-1 ms-3 whitespace-nowrap">Consignaciones</span>
                        </a>
                    </li>

                    <li                 
                        onClick={handleFacturasClick}
    >
                        <button type="button" className="flex items-center w-full p-2 text-base  text-white rounded-lgtransition duration-75 rounded-lg group  hover:bg-azul dark:hover:bg-azul group dark:text-white " aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                        </svg>

    
                            <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">Facturas</span>
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                            </svg>
                        </button>
                    </li>
                    {isFacturasOpen && (
                    <ul className="">
                            <li onClick={()=>router.push(`/facturas/facturas/${uniqueNumber}`)}>
                                <a href="#" className="flex items-center w-full p-1 text-white transition duration-75 rounded-lg pl-11 group hover:bg-azul dark:text-white dark:hover:bg-azul">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Zm3.75 11.625a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                                </svg>
                                    Facturas</a> 
                            </li>
                            <li onClick={()=>router.push(`/facturas/prefacturas/${uniqueNumber}`)}>
                                <a href="#" className="flex items-center w-full p-1 text-white transition duration-75 rounded-lg pl-11 group hover:bg-azul dark:text-white dark:hover:bg-azul">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 0 0-9-9Z" />
                                </svg>
                                    Pre-Facturas</a>
                            </li>
                            <li onClick={()=>router.push(`/facturas/anularfacturas/${uniqueNumber}`)}>
                                <a href="#" className="flex items-center w-full p-1 text-white transition duration-75 rounded-lg pl-11 group hover:bg-azul dark:text-white dark:hover:bg-azul">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m6.75 12H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                                </svg>
                                    Anular Facturas</a>
                            </li>
                            
                    </ul>
                )}

                    <li onClick={()=>router.push(`/reportes/${uniqueNumber}`)}>
                        <a href="#" className="flex items-center p-2 text-white rounded-lg dark:text-white  hover:bg-azul  dark:hover:bg-azul group">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
                        </svg>
    
    
                        <span className="flex-1 ms-3 whitespace-nowrap">Reportes</span>
                        </a>
                    </li>
                    
                    <li                 
                        onClick={handleHistorialClick}
    >
                        <button type="button" className="flex items-center w-full p-2 text-base  text-white rounded-lgtransition duration-75 rounded-lg group  hover:bg-azul dark:hover:bg-azul group dark:text-white " aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                        </svg>


    
                            <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">Historial</span>
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                            </svg>
                        </button>
                    </li>
                    {isHistorialOpen && (
                    <ul className="">
                            <li onClick={()=>router.push(`/historial/inventario/${uniqueNumber}`)}>
                                <a href="#" className="flex items-center w-full p-1 text-white transition duration-75 rounded-lg pl-11 group hover:bg-azul dark:text-white dark:hover:bg-azul">
                                    Inventario</a> 
                            </li>
                            <li onClick={()=>router.push(`/historial/libros/${uniqueNumber}`)}>
                                <a href="#" className="flex items-center w-full p-1 text-white transition duration-75 rounded-lg pl-11 group hover:bg-azul dark:text-white dark:hover:bg-azul">
                                    Libros</a>
                            </li>
                            <li onClick={()=>router.push(`/historial/cotizaciones/${uniqueNumber}`)}>
                                <a href="#" className="flex items-center w-full p-1 text-white transition duration-75 rounded-lg pl-11 group hover:bg-azul dark:text-white dark:hover:bg-azul">
                                    Cotizaciones</a>
                            </li>
                            <li onClick={()=>router.push(`/historial/facturas/${uniqueNumber}`)}>
                                <a href="#" className="flex items-center w-full p-1 text-white transition duration-75 rounded-lg pl-11 group hover:bg-azul dark:text-white dark:hover:bg-azul">
                                    Facturas</a>
                            </li>
                            <li onClick={()=>router.push(`/historial/consignaciones/${uniqueNumber}`)}>
                                <a href="#" className="flex items-center w-full p-1 text-white transition duration-75 rounded-lg pl-11 group hover:bg-azul dark:text-white dark:hover:bg-azul">
                                    Consignaciones</a>
                            </li>
                    </ul>
                )}
                    <li onClick={()=>router.push(`/usuarios/${uniqueNumber}`)}>
                        <a href="#" className="flex items-center p-2 text-white rounded-lg dark:text-white  hover:bg-azul  dark:hover:bg-azul group">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                        </svg>
    
                        <span className="flex-1 ms-3 whitespace-nowrap">Usuarios</span>
                        </a>
                    </li>
                    <li onClick={()=> logout()}>
                        <a href="#" className="flex items-center p-2 text-white rounded-lg dark:text-white  hover:bg-azul  dark:hover:bg-azul group">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
                        </svg>
    
                        <span className="flex-1 ms-3 whitespace-nowrap">Cerrar Sesion</span>
                        </a>
                    </li>
                </ul>
            </div>
            </aside>
        )}
     </>
    );
  }
  
  export default Sidebar;
  
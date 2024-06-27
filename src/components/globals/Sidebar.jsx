import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useHasMounted from "../../hooks/useHasMounted";
import { generateUniqueNumber } from "../../funciones/functions";

function Sidebar() {
    const router = useRouter();
    const hasMounted = useHasMounted();
    const uniqueNumber = generateUniqueNumber();

    const [activePath, setActivePath] = useState("");

    useEffect(() => {
        if (hasMounted) {
            setActivePath(router.pathname);
        }
    }, [router.pathname, hasMounted]);

    const handleNavigation = (path) => {
        router.push(path);
        setActivePath(path); 
    };

    const logout = async () => {
        const response = await fetch('/api/auth/logout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        });
        router.push('/');
        localStorage.clear();
        console.log(response);
    };

    const [isHistorialOpen, setIsHistorialOpen] = useState(false);
    const [isFacturasOpen, setIsFacturasOpen] = useState(false);

    return (
        <>
            {hasMounted && (
                <aside id="default-sidebar" className="fixed top-0 left-0 z-40 w-56 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
                    <div className="h-full px-3 py-4 overflow-y-auto text-color-gray-o dark:text-color-gray-o bg-color-gray dark:bg-color-gray">
                        <a className="flex items-center bg-color-green rounded-lg p-1.5 ps-2.5 mb-5">
                            <img src="/logoblanco.png" className="h-4 me-3 sm:h-5" alt="Redel Logo" />
                            <span className="self-center text-lg font-semibold whitespace-nowrap text-color-gray-o dark:text-color-gray-o">Redel Libros</span>
                        </a>
                        <ul className="font-medium">
                            <li onClick={() => handleNavigation(`/welcome/${uniqueNumber}`)}>
                                <a href="#" className={`flex items-center p-2 rounded-lg text-sm text-color-gray-o dark:text-color-gray-o ${activePath.includes('/welcome') ? 'bg-musgo dark:bg-musgo' : ''}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                    </svg>
                                    <span className="ml-3 text-sm">Inicio</span>
                                </a>
                            </li>
                            <li onClick={() => handleNavigation(`/inventario/${uniqueNumber}`)}>
                                <a href="#" className={`flex items-center rounded-lg text-sm p-2 text-color-gray-o dark:text-color-gray-o ${activePath.includes('/inventario') ? 'bg-musgo dark:bg-musgo' : ''}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
                                    </svg>
                                    <span className="flex-1 ms-3 text-sm whitespace-nowrap">Inventario</span>
                                </a>
                            </li>
                            <li onClick={() => handleNavigation(`/libros/${uniqueNumber}`)}>
                                <button type="button" className={`flex items-center w-full p-2 text-sm text-color-gray-o dark:text-color-gray-o transition duration-75 rounded-lg group ${activePath.includes('/libros') ? 'bg-musgo dark:bg-musgo' : ''}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                                    </svg>
                                    <span className="flex-1 ms-3 text-left text-sm rtl:text-right whitespace-nowrap">Libros</span>
                                </button>
                            </li>
                            <li onClick={() => handleNavigation(`/clientes/${uniqueNumber}`)}>
                                <a href="#" className={`flex rounded-lg text-sm items-center p-2 text-color-gray-o dark:text-color-gray-o ${activePath.includes('/clientes') ? 'bg-musgo dark:bg-musgo' : ''}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m.941 3.197a11.977 11.977 0 0 1-5.963 1.584A11.976 11.976 0 0 1 6 18.72m11.059-3.197a6.065 6.065 0 0 0-2.32-2.417m2.32 2.417a3 3 0 1 0-4.682-2.72m0 0a3 3 0 0 0-4.682 2.72m0 0a6.061 6.061 0 0 1-2.32-2.417M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                    </svg>
                                    <span className="flex-1 ms-3 text-sm whitespace-nowrap">Clientes</span>
                                </a>
                            </li>
                            <li onClick={() => handleNavigation(`/cotizaciones/${uniqueNumber}`)}>
                                <a href="#" className={`flex items-center rounded-lg text-sm p-2 text-color-gray-o dark:text-color-gray-o ${activePath.includes('/cotizaciones') ? 'bg-musgo dark:bg-musgo' : ''}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h.008v.008H19.5V12zm-7.5 0h.008v.008H12V12zm-7.5 0h.008v.008H4.5V12zm15 9.375v-2.25a4.5 4.5 0 0 0-4.5-4.5h-9a4.5 4.5 0 0 0-4.5 4.5v2.25M16.5 6a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0z" />
                                    </svg>
                                    <span className="flex-1 ms-3 text-sm whitespace-nowrap">Cotizaciones</span>
                                </a>
                            </li>
                            <li onClick={() => handleNavigation(`/consignaciones/${uniqueNumber}`)}>
                                <a href="#" className={`flex items-center rounded-lg text-sm p-2 text-color-gray-o dark:text-color-gray-o ${activePath.includes('/consignaciones') ? 'bg-musgo dark:bg-musgo' : ''}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h.008v.008H19.5V12zm-7.5 0h.008v.008H12V12zm-7.5 0h.008v.008H4.5V12zm15 9.375v-2.25a4.5 4.5 0 0 0-4.5-4.5h-9a4.5 4.5 0 0 0-4.5 4.5v2.25M16.5 6a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0z" />
                                    </svg>
                                    <span className="flex-1 ms-3 text-sm whitespace-nowrap">Consignaciones</span>
                                </a>
                            </li>
                            <li onClick={() => setIsHistorialOpen(!isHistorialOpen)}>
                                <button type="button" className={`flex items-center w-full text-sm p-2 text-color-gray-o dark:text-color-gray-o transition duration-75 rounded-lg group ${isHistorialOpen ? 'bg-musgo dark:bg-musgo' : ''}`} aria-controls="dropdown-example">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="flex-shrink-0 w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5M21 12a9 9 0 1 1-9-9 9 9 0 0 1 9 9z" />
                                    </svg>
                                    <span className="flex-1 ms-3 text-left text-sm whitespace-nowrap">Historial</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`w-5 h-5 ${isHistorialOpen ? 'rotate-180' : ''}`}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 9l-7.5 7.5L4.5 9" />
                                    </svg>
                                </button>
                                {isHistorialOpen && (
                                    <ul id="dropdown-example" className="py-2 space-y-2">
                                        <li onClick={() => handleNavigation(`/historial/${uniqueNumber}`)}>
                                            <a href="#" className={`flex items-center p-2 pl-11 w-full text-sm font-medium text-color-gray-o dark:text-color-gray-o transition duration-75 rounded-lg group hover:bg-musgo dark:hover:bg-musgo ${activePath.includes('/historial') ? 'bg-musgo dark:bg-musgo' : ''}`}>
                                                Historial de ventas
                                            </a>
                                        </li>
                                    </ul>
                                )}
                            </li>
                            <li onClick={() => setIsFacturasOpen(!isFacturasOpen)}>
                                <button type="button" className={`flex items-center w-full text-sm p-2 text-color-gray-o dark:text-color-gray-o transition duration-75 rounded-lg group ${isFacturasOpen ? 'bg-musgo dark:bg-musgo' : ''}`} aria-controls="dropdown-example">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="flex-shrink-0 w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 9h3.75M9 12.75h6.75M9 16.5h3.75m-6-9V21a.75.75 0 0 0 .75.75h11.25a.75.75 0 0 0 .75-.75V6.93a.75.75 0 0 0-.266-.572L14.09 3.391a.75.75 0 0 0-.484-.183H7.5a.75.75 0 0 0-.75.75z" />
                                    </svg>
                                    <span className="flex-1 ms-3 text-left text-sm whitespace-nowrap">Facturas</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`w-5 h-5 ${isFacturasOpen ? 'rotate-180' : ''}`}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 9l-7.5 7.5L4.5 9" />
                                    </svg>
                                </button>
                                {isFacturasOpen && (
                                    <ul id="dropdown-example" className="py-2 space-y-2">
                                        <li onClick={() => handleNavigation(`/facturas/${uniqueNumber}`)}>
                                            <a href="#" className={`flex items-center p-2 pl-11 w-full text-sm font-medium text-color-gray-o dark:text-color-gray-o transition duration-75 rounded-lg group hover:bg-musgo dark:hover:bg-musgo ${activePath.includes('/facturas') ? 'bg-musgo dark:bg-musgo' : ''}`}>
                                                Facturas de ventas
                                            </a>
                                        </li>
                                        <li onClick={() => handleNavigation(`/facturascompras/${uniqueNumber}`)}>
                                            <a href="#" className={`flex items-center p-2 pl-11 w-full text-sm font-medium text-color-gray-o dark:text-color-gray-o transition duration-75 rounded-lg group hover:bg-musgo dark:hover:bg-musgo ${activePath.includes('/facturascompras') ? 'bg-musgo dark:bg-musgo' : ''}`}>
                                                Facturas de compras
                                            </a>
                                        </li>
                                    </ul>
                                )}
                            </li>
                        </ul>
                        <a onClick={logout} className="flex items-center rounded-lg text-sm p-2 text-color-gray-o dark:text-color-gray-o bg-color-red cursor-pointer mt-10">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-9A2.25 2.25 0 0 0 2.25 5.25v13.5A2.25 2.25 0 0 0 4.5 21h9a2.25 2.25 0 0 0 2.25-2.25V15m-5.25-3h11.25M18 9l3.75 3.75L18 16.5" />
                            </svg>
                            <span className="ml-3 text-sm">Cerrar Sesión</span>
                        </a>
                    </div>
                </aside>
            )}
        </>
    );
}

export default Sidebar;

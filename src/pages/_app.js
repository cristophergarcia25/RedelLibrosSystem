// _app.js

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '../components/globals/Sidebar';
import '../styles/global.css';
import 'tailwindcss/tailwind.css';

function MyApp({ Component, pageProps, router }) {
  // Verifica si la página actual es index.js
  const isIndexPage = router.pathname === '/';

  return (
    <div>
      {/* Renderiza el sidebar solo si la página actual no es index.js */}
      {!isIndexPage && <Sidebar />}
      
      {/* Renderiza el componente de la página actual dentro del sidebar */}
      <div className={isIndexPage ? "" : "ml-64 bg-blanco h-screen"}>
        <Component {...pageProps} />
      </div>
      <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"></ToastContainer>
    </div>
  );
}

export default MyApp;

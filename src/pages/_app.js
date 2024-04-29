// _app.js

import Sidebar from '../components/globals/Sidebar';
import '../styles/global.css';

function MyApp({ Component, pageProps, router }) {
  // Verifica si la página actual es index.js
  const isIndexPage = router.pathname === '/';

  return (
    <div>
      {/* Renderiza el sidebar solo si la página actual no es index.js */}
      {!isIndexPage && <Sidebar />}
      
      {/* Renderiza el componente de la página actual dentro del sidebar */}
      <div className={isIndexPage ? "" : "ml-64"}>
        <Component {...pageProps} />
      </div>
    </div>
  );
}

export default MyApp;

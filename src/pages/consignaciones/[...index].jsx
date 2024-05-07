import React, { useEffect } from 'react'
import useHasMounted from '../../hooks/useHasMounted';
import { Cards } from '../../components/globals/Cards';

const consignaciones = () => {

  //validacion mount para que se valide si hay sesion iniciada si no no cargar nada y regresar al login
  const hasMounted = useHasMounted();

  const getEnv = () => {
    console.log('se cargo')
    
  }

  useEffect(() => {
    console.log(hasMounted)
    if (hasMounted) {
      getEnv();
    }
  }, [hasMounted]); 


  return (
    <>
    {hasMounted && (
      <div className="mb-2 text-2xl font-bold tracking-tight text-black dark:text-black">
        Consignaciones
        <Cards/>
      </div>
    )}
    </>
  )
}

export default consignaciones
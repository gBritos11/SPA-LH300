import { useState, useEffect } from "react";
import { getDestinos } from "../Servicios/api";

const useDestinos = (filtro = '' ) => {
    const [destinos, setDestinos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pagina, setPagina] = useState(1);
    const [tieneMas, setTieneMas] = useState(true);

    useEffect(() => {
        setDestinos([]);
        setPagina(1);
        setTieneMas(true);
    }, [filtro]);

    useEffect(() => {
        const fetchDestinos = async () => {
            try {
                setLoading(true);
               const datos = await getDestinos(filtro, pagina);

               if(datos.length < 9){
                setTieneMas(false);
               }

               setDestinos(prev => pagina === 1 ? datos : [...prev, ...datos]);
               
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchDestinos()
    }, [filtro, pagina]);

    return { destinos, loading, error, setPagina, tieneMas};
}

export default useDestinos;
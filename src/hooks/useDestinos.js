import { useState, useEffect } from "react";
import { getDestinos } from "../servicios/api";

const LIMIT = 9;

const useDestinos = (filtro = '', campoFiltro = 'search') => {
    const [destinos, setDestinos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cargandoMas, setCargandoMas] = useState(false);
    const [error, setError] = useState(null);
    const [pagina, setPagina] = useState(1);
    const [tieneMas, setTieneMas] = useState(true);

    useEffect(() => {
        const fetchDestinos = async () => {
            try {
                // Solo mostramos el spinner principal si es la primera página
                if (pagina === 1) {
                    setLoading(true);
                    setDestinos([]); // Limpiamos para la nueva búsqueda
                } else {
                    setCargandoMas(true);
                }

                const datos = await getDestinos(filtro, pagina, LIMIT, campoFiltro);
                
                setTieneMas(datos.length === LIMIT);
                setDestinos(prev => (pagina === 1 ? datos : [...prev, ...datos]));
                setError(null);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
                setCargandoMas(false);
            }
        };

        const delay = filtro ? 500 : 0;
        const timer = setTimeout(() => {
            fetchDestinos();
        }, delay);

        return () => clearTimeout(timer);

    }, [filtro, pagina, campoFiltro]);

    return { destinos, loading, cargandoMas, error, pagina, setPagina, tieneMas };
};

export default useDestinos;
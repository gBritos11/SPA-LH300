import { useState, useEffect } from "react";
import { getDestinos } from "../Servicios/api";

const LIMIT = 9;

const useDestinos = (filtro = '', campoFiltro = 'seach' ) => {
    const [destinos, setDestinos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cargandoMas, setCargandoMas] = useState(false);
    const [error, setError] = useState(null);
    const [pagina, setPagina] = useState(1);
    const [tieneMas, setTieneMas] = useState(true);

    useEffect(() => {
        setDestinos([]);
        setPagina(1);
        setTieneMas(true);
        setLoading(true);
        setCargandoMas(false);
    }, [filtro, campoFiltro]); //si el usuario cambia el select empazamos de cero con el nuevo campo

    //Este useEffect hace el fetch cada vez que pagina o filtro cambian
    useEffect(() => {
        const fetchDestinos = async () => {
            try {
                if (pagina === 1){
                    setLoading(true);
                    setCargandoMas(false);
                } else {
                    setCargandoMas(true);
                    setLoading(false);
                }

                const datos = await getDestinos(filtro, pagina, LIMIT, campoFiltro);
                if(datos.length < LIMIT){
                    setTieneMas(false);
                }

                setDestinos(prev => 
                    pagina === 1 ? datos : [...prev, ...datos]
                )
               
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
                setCargandoMas(false);
            }
        }

        fetchDestinos()
    }, [filtro, pagina, campoFiltro]); //campo en las dependecias del fetch tambien
    
    return { destinos, loading, cargandoMas, error, pagina, setPagina, tieneMas};
}

export default useDestinos;
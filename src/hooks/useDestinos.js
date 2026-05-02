import { useState, useEffect } from "react";
import { getDestinos } from "../Servicios/api";

const LIMIT = 9;

const useDestinos = (filtro = '' ) => {
    const [destinos, setDestinos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cargandoMas, setCargandoMas] = useState(false);
    const [error, setError] = useState(null);
    const [pagina, setPagina] = useState(1);
    const [tieneMas, setTieneMas] = useState(true);

    useEffect(() => {
        //Agrego un setTimeout para que se evite un fetch por cada tecla apretada
        const timer = setTimeout(() => {
            setDestinos([]);
            setPagina(1);
            setTieneMas(true);
            setLoading(true);
            setCargandoMas(false);
        }, 500)

        //Si el usuario sigue escribiento cancelamos el setTimeout anterior
        return () => clearTimeout(timer);
        
    }, [filtro]);


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

                const datos = await getDestinos(filtro, pagina, LIMIT);
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
    }, [filtro, pagina]);

    return { destinos, loading, cargandoMas, error, pagina, setPagina, tieneMas};
}

export default useDestinos;
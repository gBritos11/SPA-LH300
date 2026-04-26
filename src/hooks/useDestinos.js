import { useState, useEffect } from "react";
import { getDestinos } from "../Servicios/api";

const useDestinos = () => {
    const [destinos, setDestinos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDestinos = async () => {
            try {
               const datos = await getDestinos();
               setDestinos(datos);
               
                console.log('Destinos recibidos:', datos)
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchDestinos()
    }, []);

    return { destinos, loading, error};
}

export default useDestinos;
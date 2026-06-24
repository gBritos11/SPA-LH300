import { useState, useEffect } from "react";
import { getDestinoById } from "../servicios/destino.service.js";

const useDestinoId = (id) => {
    const [destino, setDestino] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;
        if (!id) return;

        const fetchDestino = async() => {
            setCargando(true);
            try {
                const datos = await getDestinoById(id);
                if (isMounted) setDestino(datos);
            } catch (err) {
                if (isMounted) {
                    setError(err.message);
                    setDestino(null);
                }
            } finally {
                if (isMounted) setCargando(false);
            }
        };

        fetchDestino();
        return () => { isMounted = false; }; // Limpieza
    }, [id]);

    return { destino, cargando, error };
}

export default useDestinoId;
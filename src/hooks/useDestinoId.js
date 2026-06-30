import { useState, useEffect } from "react";
import { getDestinoById } from "../servicios/destino.service.js";
import { useTranslation } from "react-i18next";

const useDestinoId = (id) => {
    const { i18n } = useTranslation();
    const [destino, setDestino] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;
        if (!id) return;

        const fetchDestino = async() => {
            setCargando(true);
            setError(null);
            try {
                const datos = await getDestinoById(id, i18n.language);
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
    }, [id, i18n.language]);

    return { destino, cargando, error };
}

export default useDestinoId;
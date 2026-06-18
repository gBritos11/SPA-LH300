import { useState, useEffect } from "react";
import { getDestinos } from "../servicios/destino.service.js";
import apiClient from '../servicios/api.js';

const useRanking = () => {
    const [ranking, setRanking] = useState([]);
    const [cargando, setCargando] = useState(true);

    const fetchRanking = async () => {
        try {
       
            //Traemos todos los destinos limit=100 no treamos solo 9 porque ordenariamos los de 1 sola pag
            const { data } = await apiClient.get('/destinos?page=1&limit=100');

            const lista = Array.isArray(data)
                ? data
                : data.data ?? data.destinos ?? data.results ?? [];

            // Ordenamos de mayor a menor y nos quedamos con 10
            const top10 = lista
                .filter(d => Number(d.rating ?? d.calificacion) > 0)
                .sort((a, b) => Number(b.rating ?? b.calificacion) - Number(a.rating ?? a.calificacion))
                .slice(0, 10);
            setRanking(top10);
        } catch (err) {
            console.error('Error al cargar ranking:', err)
        } finally{
            setCargando(false)
        }
    };

        
    useEffect(() => {
        fetchRanking();
    }, []);

    return { ranking, cargando, refetchRanking: fetchRanking };
}

export default useRanking;
import { useState, useEffect } from "react";
import { getDestinos } from "../Servicios/api";

const useRanking = () => {
    const [ranking, setRanking] = useState([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const fetchRanking = async () => {
            try {
                //Traemos todos los destinos limit=100 no treamos solo 9 porque ordenariamos los de 1 sola pag
                const datos = await getDestinos('', 1, 100);

                //Ordenamos de mayor a menor y nos quedamos con 10
                const top10 = datos
                    .filter(d => d.calificacion > 0)
                    .sort((a, b) => b.calificacion - a.calificacion)
                    .slice(0, 10)
                setRanking(top10)
            } catch (err) {
                console.error('Error al cargar ranking:', err)
            } finally{
                setCargando(false)
            }
        }

        fetchRanking()
    }, []) //[] -> solo se ejecuta al montar el ranking no cambia mientras usuario en pag

    return { ranking, cargando }
}

export default useRanking;
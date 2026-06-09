import { useState, useEffect } from "react";
import { getDestinoById } from "../servicios/api";

const useDestinoId = (id) => {
    //Usamos tres useStates uno por cada estado
    const [destino, setDestino] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        //Usamos useEffect para ejecutar el fetch despues del render
        if (!id) return 

        const fetchDestino = async() => {
            setCargando(true);
            setError(null);

            try{
                const datos = await getDestinoById(id)
                //Le pasamos el id de la funcion del servicio para traer un solo destino

                setDestino(datos);
            } catch (err){
                setError(err.message);
                setDestino(null);
            } finally {
                setCargando(false);
            }
            //Maneja su propio estado de carga
        }
        fetchDestino();
    }, [id]) // si el usuario navega de id1 a 2 el useeffect se vuelve a ejecutar automaticamente con el nuevo id

    return {destino, cargando, error};// El hook retorna los datos especificoss
}

export default useDestinoId;
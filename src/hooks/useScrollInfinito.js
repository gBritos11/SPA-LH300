import { useEffect, useRef } from "react";

//Recibe una fn callback que se ejecuta cuando el elem entre en el viewport, y una condicion para activarse o no
const useScrollInfinito = (callback, activo) => {
    //ref es una referencia al elem DOM que queremos observar (le ponemos un div invisible al final de la lista)
    const observadorRef = useRef(null);

    useEffect(() => {
        //Esto evita lladamas duplicadas a la API
        if (!activo) return;
        
        //creamos observador
        //entries en un arreglo de elem que el observador esta mirando
        const observador = new IntersectionObserver (
            (entries) => {
                if (entries[0].isIntersecting){
                    //El usuario llego al fondo, pedimos mas 
                    callback();
                }   
            },
            //threshols: 0.1 sig que el callback se dispara
            //cuando el 10% del elem es visible
            {rootMargin: '200px'}
        )
        
        //Guardamos la referencia actual del div
        const elementoActual = observadorRef.current;

        //El observador mira a ese div
        if (elementoActual) {
            observador.disconnect();
        }

        //Fn de limpieza cuando el componenete se desmonta o activo cambio, dejamos de observar
        return () => {
            if (elementoActual) {
                observador.unobserve(elementoActual);
            }
        }

    }, [callback, activo])
    
    //Se re ejecuta si callback o activo cambian
    return observadorRef;
}

export default useScrollInfinito;
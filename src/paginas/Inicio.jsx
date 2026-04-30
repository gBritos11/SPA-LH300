import { useState, useCallback } from 'react';
import  useDestinos  from '../hooks/useDestinos';
import useScrollInfinito from '../hooks/useScrollInfinito';
import  Tarjeta from './../componentes/Tarjeta/Tarjeta'
import { useNavigate } from "react-router-dom";
import MensajesApp from "../componentes/MensajesApp/MensajesApp"
import Boton from '../componentes/Boton/Boton';
import Busqueda from '../componentes/Busqueda/Busqueda';

const Inicio = () => {
    const [filtro, setFiltro] = useState('');
    const {destinos, loading, cargandoMas, error, setPagina, tieneMas} = useDestinos(filtro);
    const navigate = useNavigate();
    
    //el useCallback evita que la funcion se recree en cada render, sino el useScrollInfinito se dispararia en loop
    const cargarMas = useCallback(() => {
        setPagina(prev => prev + 1)
    }, [setPagina])

    /* El observador se activa cuando: 1. tieneMas = true(hay mas pag) 2. !loading= no esta cargando (evita doble fetch) */
    const refObservador = useScrollInfinito(cargarMas, tieneMas && !loading && !cargandoMas)

    if (loading && destinos.length === 0 && !filtro){
        return <MensajesApp tipo="cargando" mensaje="Buscando destinos..." />;

    }

    if (error) return (
        <MensajesApp tipo="error" detalle={error}>
            <Boton onClick={() => window.location.reload()}>Reintentar</Boton>
        </MensajesApp>
    )

    return (
        <div className='p-8'>
            <h1 className="text-3xl font-bold md-6">Destinos</h1>
            <div className='mb-8 flex justify-center'>
                <Busqueda valor={filtro} onChange={setFiltro} />
            </div>

            {destinos.length === 0 && !loading && !cargandoMas ? (
                <MensajesApp 
                    tipo="vacio"
                    mensaje={filtro ? `No encontramos destinos para "S{filtro}"` : "No hay destinos disponibles"}
                />
            ) : (
                <div className='grid grid-cols-1 sm:grid:cols-2 md:grid-cols-3 gap-8'>
                    {destinos.map((destino) => (
                        <Tarjeta
                            key={destino.id}
                            destino={destino}
                            action={() => navigate(`/destino/${destino.id}`)}
                        />
                    ))}
                </div>
            )}

            {/* Div invisible- el disparador del scroll infinito */}
            <div ref={refObservador} className="h-4"/>

            {/* Spiner mientras carga la sig pag */}
            {loading && destinos.length > 0 && (
                <MensajesApp tipo="cargando" mensaje="Cargando mas destinos..."/>
            )}

            {/* Fin de lista */}
            {!tieneMas && !cargandoMas && destinos.length > 0 && (
                <p className="text-center text-gray-400 mt-8 text-sm">
                    Has visto todos los destinos 🌍
                </p>
            )}
        </div>
    )
    
}

export default Inicio;
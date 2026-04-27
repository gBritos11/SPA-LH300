import { useEffect, useState } from 'react';
import  useDestinos  from '../hooks/useDestinos';
import  Tarjeta from '../componentes/Tarjeta/Tarjeta'
import { useNavigate } from "react-router-dom";
import Spinner from '../componentes/Spinner/Spinner';
import MensajeError from '../componentes/MensajeError/MensajeError';
import MensajeVacio from '../componentes/MensajeVacio/MensajeVacio';

const Inicio = () => {

    const { destinos, loading, error } = useDestinos();
    const navigate = useNavigate();

    //Estado 1 - Cargando
    if (loading) return < Spinner />;
    //Estado 2 - Error
    if (error) return <MensajeError mensaje={error}/>
    //Estado 3 - Vacio
    if (destinos.length === 0) return < MensajeVacio />
    //Estado 4 - Exito

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold">Destinos</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {destinos.map((destino) => (
                    <Tarjeta
                        key={destino.id}
                        destino={destino}
                        action={() => navigate(`/destino/${destino.id}`)}
                    />
                     ))}
                </div>
        </div>   
    );
}

export default Inicio;
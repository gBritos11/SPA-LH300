import { useEffect, useState } from 'react';
import  useDestinos  from '../hooks/useDestinos';
import  Tarjeta from '../componentes/Tarjeta/Tarjeta'
import { useNavigate } from "react-router-dom";

const Inicio = () => {

    const { destinos, loading, error } = useDestinos();
    const navigate = useNavigate();

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className='animate-spin rounded-full h-16 w-16 border-t-4 border-orange-500' />
                <p className='ml-4 text-orange-600 text-lg'>Cargando destinos...</p>
            </div>
        )
    }

    if (error) {
        return(
            <div className='flex flex-col justify-center items-center min-h-screen gap-4'>
                <p className='text-red-500 text-xl font-semibold'>
                    Algo salió mal. Intentá más tarde.
                </p>
                <p className='text-red-400 text-sm'>{error}</p>
            </div>
        )
    }

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-8">Destinos</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
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
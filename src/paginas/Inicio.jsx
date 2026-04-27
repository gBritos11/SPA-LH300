import { useEffect, useState } from 'react';
import  useDestinos  from '../hooks/useDestinos';
import  Tarjeta from '../componentes/Tarjeta/Tarjeta'
import { useNavigate } from "react-router-dom";


const Inicio = () => {

    const { destinos, loading, error } = useDestinos();
    const navigate = useNavigate();

    if (loading) {
        return <p className="text-center mt-10">Cargando destinos...</p>;
    }

    if (error) {
        return <p className="text-center mt-10 text-red-500">Error: {error}</p>;
    }

    return (
        <div className="bg-beige p-8">
            <h1 className="text-3xl font-bold">Página de Inicio</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {destinos.map((destino) => (
                    <Tarjeta
                        key={destino.id}
                        imagen={destino.imagen}
                        titulo={destino.nombre}
                        descripcion={destino.descripcion}
                        presupuesto={destino.presupuesto}
                        action={() => navigate(`/destino/${destino.id}`)}
                    />
                     ))}
                </div>
        </div>   
    );
}

export default Inicio;
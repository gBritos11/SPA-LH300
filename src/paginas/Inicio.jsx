import { useState } from 'react';
import  useDestinos  from '../hooks/useDestinos';
import  Tarjeta from './../componentes/Tarjeta/Tarjeta'
import { useNavigate } from "react-router-dom";
import MensajesApp from "../componentes/MensajesApp/MensajesApp"
import Boton from '../componentes/Boton/Boton';
import Busqueda from '../componentes/Busqueda/Busqueda';
const Inicio = () => {

    const navigate = useNavigate();
    const [filtro, setFiltro] = useState('');
    const { destinos, loading, error } = useDestinos(filtro);

    
    if (error) return (
        <MensajesApp tipo="error" detalle={error}>
            <Boton onClick={() => window.location.reload()}>Reintentar</Boton>
        </MensajesApp>
    );

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold">Destinos</h1>
                <div className='mb-8 flex justify-center'>
                    <Busqueda valor={filtro} onChange={setFiltro} />
                </div>

                {destinos.length === 0 ? (
                    <MensajesApp 
                        tipo="vacio"
                        mensaje={`No encontramos destinos para "${filtro}"`}
                    />
                ) : (
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {destinos.map((destino) => (
                    <Tarjeta
                        key={destino.id}
                        destino={destino}
                        action={() => navigate(`/destino/${destino.id}`)}
                    />
                     ))}
                </div>
                )}
        </div>   
    );
}

export default Inicio;
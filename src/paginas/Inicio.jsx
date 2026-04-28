import { useState } from 'react';
import  useDestinos  from '../hooks/useDestinos';
import  Tarjeta from './../componentes/Tarjeta/Tarjeta'
import { useNavigate } from "react-router-dom";
import MensajesApp from "../componentes/MensajesApp/MensajesApp"
import Boton from '../componentes/Boton/Boton';
import Busqueda from '../componentes/Busqueda/Busqueda';
const Inicio = () => {

    const { destinos, loading, error } = useDestinos();
    const navigate = useNavigate();

    //Agrego el buscador
    const [filtro, setFiltro] = useState('');
    console.log('filtro actual:', filtro);

    if (loading) return <MensajesApp tipo="cargando" mensaje="Buscando destinos..." />;

    if (error) return (
        <MensajesApp tipo="error" detalle={error}>
            <Boton onClick={() => window.location.reload()}>Reintentar</Boton>
        </MensajesApp>
    );

    if (destinos.length === 0) return <MensajesApp tipo="vacio" mensaje="No hay resultados para esa búsqueda." />;

    const terminoBusqueda = filtro.toLowerCase();
    const destinosFiltrados = destinos.filter((destino) => {
        if(!terminoBusqueda) return true;

        const coincideNombre = (destino.nombre || '').toLowerCase().includes(terminoBusqueda);
        const coincidePais = (destino.pais || '').toLowerCase().includes(terminoBusqueda);
        const coincideDescripcion = (destino.descripcion || '').toLowerCase().includes(terminoBusqueda);

        return coincideNombre || coincidePais || coincideDescripcion;
    })

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold">Destinos</h1>
                <div className='mb-8 flex justify-center'>
                    <Busqueda valor={filtro} onChange={setFiltro} />
                </div>

                {destinosFiltrados.length === 0 ? (
                    <MensajesApp 
                        tipo="vacio"
                        mensaje={`No encontramos destinos para "${filtro}"`}
                    />
                ) : (
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {destinosFiltrados.map((destino) => (
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
                )}
        </div>   
    );
}

export default Inicio;
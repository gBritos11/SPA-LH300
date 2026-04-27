import  useDestinos  from '../hooks/useDestinos';
import  Tarjeta from './../componentes/Tarjeta/Tarjeta'
import { useNavigate } from "react-router-dom";
import MensajesApp from "./../componentes/MensajesApp/MensajesApp"
import Boton from '../componentes/Boton/Boton';

const Inicio = () => {

    const { destinos, loading, error } = useDestinos();
    const navigate = useNavigate();

    if (loading) return <MensajesApp tipo="cargando" mensaje="Buscando destinos..." />;

    if (error) return (
        <MensajesApp tipo="error" detalle={error}>
            <Boton onClick={() => window.location.reload()}>Reintentar</Boton>
        </MensajesApp>
    );

    if (destinos.length === 0) return <MensajesApp tipo="vacio" mensaje="Parece que no hay viajes disponibles." />;

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
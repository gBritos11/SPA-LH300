import { useParams, useNavigate  } from "react-router-dom";
import useDestinoId from '../hooks/useDestinoId';
import MensajesApp from "./../componentes/MensajesApp/MensajesApp"
import Boton from "../componentes/Boton/Boton";
import Favorito from "../componentes/Favorito/Favorito";
import Tarjeta from "../componentes/Tarjeta/Tarjeta";

const Detalles = () => {
  const { id } = useParams();
  const { destino, cargando, error } = useDestinoId(id);
  const navigate = useNavigate();

    if (cargando) return <MensajesApp tipo="cargando" mensaje="Buscando destinos..." />;

    if (error) return (
        <MensajesApp tipo="error" detalle={error}>
            <Boton onClick={() => window.location.reload()}>Reintentar</Boton>
        </MensajesApp>
    );

  return (
    
    <div className="flex flex-col lg:flex-row gap-8 p-8">
      <div className="lg:w-1/2">
        <img
          src={destino.imagen}
          alt={destino.nombre}
          className="w-full h-96 object-cover rounded-lg shadow-md"
        />
      </div>
      
      <div className="lg:w-1/2 flex flex-col justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">{destino.nombre}</h1>
          <p className="mt-2 text-sm text-gray-500">
            {destino.ubicacion}, {destino.pais}
          </p>
          <p className="mt-4 text-gray-700 leading-relaxed">{destino.descripcion}</p>

          <p className="mt-4 text-xl font-semibold text-orange-600">
            Presupuesto: ${destino.presupuesto}
          </p>
          <p className="mt-2 text-gray-500 italic">
            Calificación: {destino.calificacion} 
          </p>

          <div className="mt-4">
            <h2 className="font-semibold text-gray-700">Accesibilidad:</h2>
            <ul className="flex gap-2 mt-2">
              {destino.accesibilidad.map((medio, i) => (
                <li
                  key={i}
                  className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm"
                >
                  {medio}
                </li>
              ))}
            </ul>
          </div>

          {/* Alojamientos */}
          <div className="mt-6">
            <h2 className="font-semibold text-gray-700 mb-4">Alojamientos:</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {destino.alojamiento.map((a, i) => (
                <Tarjeta
                  key={i}
                  destino={{
                    nombre: a.nombre,
                    descripcion: a.reseña,
                    presupuesto: a.presupuesto,
                    pais: a.ubicacion,
                  }}
                  tipo="alojamiento"
                />
              ))}
            </div>
          </div>

        </div>

        <div className="mt-6 flex flex-wrap gap-4">
          {/* Botón de favorito */}
          <Favorito destino={destino} />

          <Boton variante="outline" onClick={() => alert("Destino puntuado!")}>
            Puntuar
          </Boton>
          <Boton variante="outline" onClick={() => navigate("/")}>
            Volver al inicio
          </Boton>
        </div>
      </div>
    </div>
  );
};

export default Detalles;

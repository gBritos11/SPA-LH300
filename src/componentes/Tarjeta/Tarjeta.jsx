import Boton from '../Boton/Boton';
import { ArrowRight } from 'lucide-react';
import estilo from './Tarjeta.module.css';
import Favorito from '../Favorito/Favorito';

const Tarjeta = ({ destino, action, tipo = "destino" }) => { 
  if (!destino) return null;

  const { 
    imagen = 'https://picsum.photos/400/300',
    nombre = 'Sin nombre',
    descripcion = 'Sin descripción disponible',
    presupuesto = 0,
    pais = 'desconocido'
  } = destino;

  // Clases dinámicas según tipo
  const cardClasses =
    tipo === "destino"
      ? "max-w-sm bg-stone-100 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col"
      : "max-w-xs bg-white rounded-lg border border-[#4FC3F7] p-4 shadow-sm flex flex-col";

  return (
    <div className={cardClasses}>
      
      {/* Imagen y botón SOLO para destinos */}
      {tipo === "destino" && (
        <>
          <div className="relative">
             {/* Ícono de favorito en esquina superior derecha */}
             <Favorito destino={destino} className="absolute top-3 right-3" />

            <img 
              src={imagen} 
              alt={nombre} 
              className="w-full h-48 object-cover" 
            />
          </div>

          <div className="p-4 flex flex-col flex-1 text-center">
            <h2 className="text-lg font-semibold text-gray-800 line-clamp-1 h-7 hover:text-xl transition-all duration-300">
              {nombre}
            </h2>
            
            <p className="text-gray-600 mt-2 line-clamp-2 text-sm h-10">
              {pais} - {descripcion}
            </p>
            
            <p className="text-orange-600 font-bold mt-4 text-xl">
              $ {presupuesto}
            </p>

            <Boton 
              onClick={action} 
              variante="primary" 
              iconoDerecha={<ArrowRight size={18} />}
              className="mt-4 w-full" 
            >
              Ver más
            </Boton>
          </div>
        </>
      )}

      {/* Versión simplificada para alojamientos */}
      {tipo === "alojamiento" && (
        <div className="flex flex-col text-left">
          <h2 className="text-base font-semibold text-gray-800">
            {nombre}
          </h2>
          <p className="text-sm text-gray-600 mt-1">{descripcion}</p>
          <p className="text-sm text-orange-600 mt-1">Presupuesto: ${presupuesto}</p>
        </div>
      )}
    </div>
  );
};

export default Tarjeta;

import Boton from '../Boton/Boton';
import { ArrowRight } from 'lucide-react';
import Favorito from '../Favorito/Favorito';
import { useTranslation } from 'react-i18next';

const Tarjeta = ({ destino, action, tipo = "destino" }) => { 
  const { t } = useTranslation();
  if (!destino) return null;

  const { 
    images,
    name: nombre = 'Sin nombre',
    description: descripcion = 'Sin descripción disponible',
    budget: presupuesto = 0,
    country: pais = 'desconocido'
  } = destino;

  const imagen =
  images?.[0]?.url || 'https://picsum.photos/400/300';

  const cardClasses =
    tipo === "destino"
      ? "bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1"
      : "bg-white rounded-xl border border-gray-100 p-4 flex flex-col shadow-sm";

  return (
    <div className={cardClasses}>

      {/* DESTINO */}
      {tipo === "destino" && (
        <>
          <div className="relative overflow-hidden">
            <Favorito destino={destino} className="absolute top-3 right-3 z-10" />
            <img 
              src={imagen} 
              alt={nombre} 
              className="w-full h-52 object-cover hover:scale-105 transition-transform duration-500"
            />
            {/* BADGE PAÍS */}
            <span className="absolute bottom-3 left-3 bg-black/50 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm font-medium">
              {pais}
            </span>
          </div>

          <div className="p-5 flex flex-col flex-1">
            <h2 className="text-base font-bold text-gray-900 truncate mb-1">
              {nombre}
            </h2>
            <p className="text-gray-400 text-sm line-clamp-2 flex-1 leading-relaxed">
              {descripcion}
            </p>
            <div className="mt-5 flex items-center justify-between gap-2">
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider">Desde</p>
                <span className="text-orange-500 font-bold text-xl">
                  $ {presupuesto}
                </span>
              </div>
              <Boton 
                onClick={action} 
                variante="primary" 
                iconoDerecha={<ArrowRight size={16} />}
                className="!px-4 !py-2 !text-sm !rounded-xl"
              >
                {t('tarjeta.ver_mas')}
              </Boton>
            </div>
          </div>
        </>
      )}

      {/* ALOJAMIENTO */}
      {tipo === "alojamiento" && (
        <div className="flex flex-col gap-2">
          <h2 className="text-sm font-bold text-gray-800">{nombre}</h2>
          <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">{descripcion}</p>
          <p className="text-sm font-bold text-orange-500 mt-1">
            {t('tarjeta.presupuesto')}: $ {presupuesto}
          </p>
        </div>
      )}
    </div>
  );
};

export default Tarjeta;
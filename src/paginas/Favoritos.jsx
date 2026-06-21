import { useFavoritos } from "../context/entornoFavoritos";
import Tarjeta from "../componentes/Tarjeta/Tarjeta";
import MensajesApp from "../componentes/MensajesApp/MensajesApp";
import { useState } from 'react';
import Busqueda from '../componentes/Busqueda/Busqueda';
import { useTranslation } from 'react-i18next';
import { Heart } from 'lucide-react';

const Favoritos = () => {
  const { favoritos } = useFavoritos();
  const { t } = useTranslation();

  const [filtro, setFiltro] = useState('');
  const [campoFiltro, setCampoFiltro] = useState('search');

  // Procesamiento y filtrado de favoritos alineado al Schema de Prisma
  const filtrados = favoritos.filter((fav) => {
    const destino = fav.destination; // Corresponde al modelo 'Destination' mapeado por Prisma
    if (!destino) return false;

    const criterio = filtro.toLowerCase();
    if (!filtro) return true;
    
    switch (campoFiltro) {
      case 'country': 
        return destino.country?.toLowerCase().includes(criterio);
      case 'location': 
        return destino.location?.toLowerCase().includes(criterio);
      case 'description': 
        return destino.description?.toLowerCase().includes(criterio);
      default:
        return (
          destino.name?.toLowerCase().includes(criterio) ||
          destino.country?.toLowerCase().includes(criterio) ||
          destino.description?.toLowerCase().includes(criterio)
        );
    }
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="mb-10 flex items-center gap-3">
            <div className="p-3 bg-orange-50 rounded-xl">
                <Heart size={22} className="text-orange-500" />
            </div>
            <div>
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                    {t('favoritos.titulo')}
                </h1>
                <p className="text-gray-400 text-sm mt-0.5">
                    {favoritos.length} {favoritos.length === 1 ? 'destino guardado' : 'destinos guardados'}
                </p>
            </div>
        </div>

        <div className="mb-10 flex justify-center">
            <Busqueda
                valor={filtro} 
                onChange={setFiltro} 
                campoFiltro={campoFiltro}
                onCampoChange={setCampoFiltro}
            />
        </div>

        {filtrados.length === 0 ? (
            <MensajesApp
                tipo="vacio"
                mensaje={
                    filtro
                        ? `${t('favoritos.sin_resultados')} "${filtro}"`
                        : t('favoritos.vacio')
                }
            />
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtrados.map((fav) => (
                    <Tarjeta
                        key={fav.destinationId}
                        destino={fav.destination}
                        action={() => window.location.href = `/destino/${fav.destinationId}`}
                    />
                ))}
            </div>
        )}
    </div>
  );
};

export default Favoritos;
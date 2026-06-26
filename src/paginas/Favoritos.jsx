import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFavoritos } from "../context/entornoFavoritos";
import Tarjeta from "../componentes/Tarjeta/Tarjeta";
import MensajesApp from "../componentes/MensajesApp/MensajesApp";
import Busqueda from '../componentes/Busqueda/Busqueda';
import { useTranslation } from 'react-i18next';
import { Heart } from 'lucide-react';

const Favoritos = () => {
  // Extraemos fetchFavoritos del contexto para asegurar datos frescos
  const { favoritos, fetchFavoritos } = useFavoritos();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const [filtro, setFiltro] = useState('');
  const [campoFiltro, setCampoFiltro] = useState('search');

  useEffect(() => {
    fetchFavoritos();
  }, [fetchFavoritos]);

  // Procesamiento y filtrado de favoritos alineado al Schema de Prisma
    const filtrados = useMemo(() => {
        return favoritos.filter((fav) => {
            const destino = fav.destination;
            if (!destino) return false;

            // Si no vienen traducciones, creamos un objeto vacío pero seguro
            const traducciones = destino.translations || [];
            const trad = traducciones.find(tr => tr.language === i18n.language) || traducciones[0] || {};
            
            const criterio = filtro.toLowerCase();
            if (!filtro) return true;
            
            // Mapeo seguro: buscamos en la traducción o en el destino base
            const nombre = (trad.name || destino.name || '').toLowerCase();
            const pais = (trad.country || destino.country || '').toLowerCase();
            const descripcion = (trad.description || destino.description || '').toLowerCase();

            switch (campoFiltro) {
                case 'country': return pais.includes(criterio);
                case 'location': return (trad.location || '').toLowerCase().includes(criterio);
                case 'description': return descripcion.includes(criterio);
                default:
                    return nombre.includes(criterio) || pais.includes(criterio) || descripcion.includes(criterio);
            }
        });
    }, [favoritos, filtro, campoFiltro, i18n.language]);

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
                        action={() => navigate(`/destino/${fav.destinationId}`)}
                    />
                ))}
            </div>
        )}
    </div>
  );
};

export default Favoritos;
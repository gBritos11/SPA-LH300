import useFavoritos from "../hooks/useFavoritos";
import Tarjeta from "../componentes/Tarjeta/Tarjeta";
import { useNavigate } from "react-router-dom";
import MensajesApp from "../componentes/MensajesApp/MensajesApp";
import { useState } from 'react';
import Busqueda from '../componentes/Busqueda/Busqueda';
import { useTranslation } from 'react-i18next';
import { Heart } from 'lucide-react';

const Favoritos = () => {
  const { favoritos } = useFavoritos();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [filtro, setFiltro] = useState('');
  const [campoFiltro, setCampoFiltro] = useState('search');

  const filtrados = favoritos.filter((destino) => {
    const criterio = filtro.toLowerCase();
    if (!filtro) return true;
    switch (campoFiltro) {
      case 'pais': return destino.pais?.toLowerCase().includes(criterio);
      case 'ubicacion': return destino.ubicacion?.toLowerCase().includes(criterio);
      case 'descripcion': return destino.descripcion?.toLowerCase().includes(criterio);
      default:
        return (
          destino.nombre?.toLowerCase().includes(criterio) ||
          destino.pais?.toLowerCase().includes(criterio) ||
          destino.descripcion?.toLowerCase().includes(criterio)
        );
    }
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

        {/* ENCABEZADO */}
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

        {/* BUSCADOR */}
        <div className="mb-10 flex justify-center">
            <Busqueda
                valor={filtro} 
                onChange={setFiltro} 
                campoFiltro={campoFiltro}
                onCampoChange={setCampoFiltro}
            />
        </div>

        {/* GRILLA */}
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
                {filtrados.map((destino) => (
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
};

export default Favoritos;
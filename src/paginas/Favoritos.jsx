import useFavoritos from "../hooks/useFavoritos";
import Tarjeta from "../componentes/Tarjeta/Tarjeta"
import { useNavigate } from "react-router-dom";
import MensajesApp from "../componentes/MensajesApp/MensajesApp";
import { useState } from 'react';
import Busqueda from '../componentes/Busqueda/Busqueda';

const Favoritos = () => {
  const { favoritos } = useFavoritos();
  const navigate = useNavigate();

  const [filtro, setFiltro] = useState('');
  const [campoFiltro, setCampoFiltro] = useState('search');

  const filtrados = favoritos.filter((destino) => {
    const criterio = filtro.toLowerCase();
    if (!filtro) return true;

    // Aplicamos el filtro según el campo seleccionado
    switch (campoFiltro) {
      case 'pais':
        return destino.pais?.toLowerCase().includes(criterio);
      case 'ubicacion':
        return destino.ubicacion?.toLowerCase().includes(criterio);
      case 'descripcion':
        return destino.descripcion?.toLowerCase().includes(criterio);
      default: // 'search' o todos los campos
        return (
          destino.nombre?.toLowerCase().includes(criterio) ||
          destino.pais?.toLowerCase().includes(criterio) ||
          destino.descripcion?.toLowerCase().includes(criterio)
        );
    }
  });

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6 text-brown">Mis Favoritos</h1>

      <div className='mb-8 flex justify-center'>
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
              ? `No encontramos resultados para "${filtro}" según "${campoFiltro}" en favoritos.`
              : "Todavía no tienes destinos guardados."
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

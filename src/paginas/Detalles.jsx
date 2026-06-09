import { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import useDestinoId from '../hooks/useDestinoId';
import MensajesApp from "./../componentes/MensajesApp/MensajesApp"
import Boton from "../componentes/Boton/Boton";
import { generarPDF } from '../servicios/pdfService';
import Tarjeta from "../componentes/Tarjeta/Tarjeta";
import SelectorEstrellas from "../componentes/SelectorEstrellas/SelectorEstrellas";
import { votarDestino } from "../servicios/votacionService";
import { Download, Loader2, CheckCircle, ArrowLeft, MapPin, Heart } from "lucide-react";
import { useTranslation } from 'react-i18next';
import useFavoritos from '../hooks/useFavoritos';

const Detalles = () => {
  const { id } = useParams();
  const { destino, cargando, error } = useDestinoId(id);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { esFavorito, validacionFavorito } = useFavoritos();

  const [destinoLocal, setDestinoLocal] = useState(null);
  const [votando, setVotando] = useState(false);
  const [generando, setGenerando] = useState(false);
  const [estadoPDF, setEstadoPDF] = useState(null);

  useEffect(() => {
    if (!cargando && (error || !destino || Object.keys(destino).length === 0)) {
      navigate("/error", { replace: true });
    }
  }, [destino, cargando, error, navigate]);

  if (cargando) return <MensajesApp tipo="cargando" />;
  if (!destino || Object.keys(destino).length === 0) return null;

  // Normalización de datos para que el componente consuma lo que viene de la API
  const destinoMostrado = destinoLocal || destino;
  const datosDestino = {
    id: destinoMostrado.id,
    nombre: destinoMostrado.name,
    descripcion: destinoMostrado.description,
    ubicacion: destinoMostrado.location,
    pais: destinoMostrado.country,
    presupuesto: destinoMostrado.budget,
    calificacion: destinoMostrado.rating || 0,
    cantidadVotos: destinoMostrado.votes || 0,
    imagen: destinoMostrado.image || 'https://picsum.photos/400/300',
    accesibilidad: destinoMostrado.accessibility || [],
    alojamiento: destinoMostrado.accommodations || []
  };

  const obtenerVotosRealizados = () => JSON.parse(localStorage.getItem('misVotosPuntajes') || '{}');
  const miVotoGuardado = obtenerVotosRealizados()[datosDestino.id];
  const yaVoto = !!miVotoGuardado;
  const guardado = esFavorito(datosDestino.id);

  const handleVotar = async (puntaje) => {
    setVotando(true);
    try {
      const actualizado = await votarDestino(destinoMostrado, puntaje);
      const votosActuales = obtenerVotosRealizados();
      localStorage.setItem('misVotosPuntajes', JSON.stringify({ ...votosActuales, [datosDestino.id]: puntaje }));
      setDestinoLocal(actualizado);
    } catch (err) {
      console.error('Error al votar:', err);
    } finally {
      setVotando(false);
    }
  };

  const handleDescargarPDF = async () => {
    setGenerando(true);
    try {
      await generarPDF(destinoMostrado);
      setEstadoPDF('exito');
    } catch (err) {
      setEstadoPDF('error');
    } finally {
      setGenerando(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <button onClick={() => navigate("/")} className="flex items-center gap-2 text-gray-400 hover:text-gray-700 text-sm mb-8 transition-colors group">
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        {t('detalles.volver')}
      </button>

      <div className="flex flex-col lg:flex-row gap-10">
        <div className="lg:w-1/2">
          <div className="relative rounded-2xl overflow-hidden shadow-md">
            <img src={datosDestino.imagen} alt={datosDestino.nombre} className="w-full h-[420px] object-cover" />
            <div className="absolute bottom-4 left-4 flex items-center gap-1.5 bg-black/50 backdrop-blur-sm text-white text-sm px-3 py-1.5 rounded-full">
              <MapPin size={14} />
              <span>{datosDestino.ubicacion}, {datosDestino.pais}</span>
            </div>
          </div>
        </div>

        <div className="lg:w-1/2 flex flex-col gap-6">
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">{datosDestino.nombre}</h1>
          <p className="text-gray-500 leading-relaxed">{datosDestino.descripcion}</p>

          <div className="flex items-center gap-4">
            <div className="bg-orange-50 rounded-2xl px-6 py-4 flex-1 text-center">
              <p className="text-xs text-orange-400 uppercase tracking-widest font-medium mb-1">{t('detalles.presupuesto')}</p>
              <p className="text-3xl font-bold text-orange-500">$ {datosDestino.presupuesto}</p>
            </div>
            <div className="bg-gray-50 rounded-2xl px-6 py-4 flex-1 text-center">
              <p className="text-xs text-gray-400 uppercase tracking-widest font-medium mb-1">{t('detalles.promedio')}</p>
              <p className="text-3xl font-bold text-gray-800">{datosDestino.calificacion}<span className="text-base font-normal text-gray-400"> / 5</span></p>
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
            <SelectorEstrellas puntajeActual={miVotoGuardado || datosDestino.calificacion} onVotar={handleVotar} bloqueado={yaVoto || votando} />
          </div>

          {datosDestino.accesibilidad.length > 0 && (
            <div>
              <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">{t('detalles.accesibilidad')}</h2>
              <ul className="flex flex-wrap gap-2">
                {datosDestino.accesibilidad.map((medio, i) => (
                  <li key={i} className="px-4 py-1.5 bg-[#0a1628] text-white rounded-full text-xs font-medium">{medio}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Detalles;
// Realizo importaciones
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import useDestinoId from '../hooks/useDestinoId';
import MensajesApp from "./../componentes/MensajesApp/MensajesApp";
import Boton from "../componentes/Boton/Boton";
import CarruselDestino from "../componentes/CarruselDestino/CarruselDestino";
import { generarPDF } from '../servicios/pdfService';
import SelectorEstrellas from "../componentes/SelectorEstrellas/SelectorEstrellas";
import { votarDestino } from "../servicios/votacionService";
import { ArrowLeft, MapPin, Heart, Download, Briefcase, Car } from "lucide-react"; 
import { useTranslation } from 'react-i18next';
import { useFavoritos } from '../context/entornoFavoritos'; 
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Detalles = () => {
  const { id } = useParams();
  const { destino, cargando, error } = useDestinoId(id);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  
  const { esFavorito, toggleFavorito } = useFavoritos();

  const [destinoLocal, setDestinoLocal] = useState(null);
  const [votando, setVotando] = useState(false);
  const [generando, setGenerando] = useState(false);

  const data = destinoLocal ? destinoLocal : destino;
  const yaVoto = data?.userVote != null;

  useEffect(() => {
    if (!cargando && (error || !destino || Object.keys(destino).length === 0)) {
      navigate("/error", { replace: true });
    }
  }, [destino, cargando, error, navigate]);

  if (cargando) return <MensajesApp tipo="cargando" />;
  if (!data || Object.keys(data).length === 0) return null;

  const trad = data.translations?.find(tr => tr.language === i18n.language) 
               || data.translations?.[0] 
               || {};

  const datosDestino = {
    id: data.id,
    nombre: trad.name || 'Sin nombre',
    descripcion: trad.description || 'Sin descripción',
    ubicacion: trad.location || 'Desconocido',
    pais: trad.country || 'Desconocido',
    presupuesto: data.budget,
    calificacion: data.rating || 0,
    cantidadVotos: data.votesCount || 0,
    imagen: data.images?.[0]?.url || 'https://picsum.photos/400/300',
    alojamientos: data.accommodations || [], // Array desde Prisma
    transportes: data.transportations || []   // Array desde Prisma
  };

  const isFav = esFavorito(data.id);
  const ratingFormateado = Number(data.rating ?? 0).toFixed(1);

  const handleVotar = async (puntaje) => {
    if (votando || yaVoto) return;
    setDestinoLocal({ ...data, userVote: puntaje });
    setVotando(true);
    try {
        const res = await votarDestino(data.id, Number(puntaje));
        const destinoActualizado = res?.data?.destination ?? res?.destination ?? res;
        if (!destinoActualizado || typeof destinoActualizado !== 'object') throw new Error("Respuesta inválida");
        setDestinoLocal({ ...data, ...destinoActualizado, userVote: puntaje });
        toast.success("Tu voto fue guardado");
    } catch(error) {
        const msg = error?.response?.data?.error;
        if(msg === "El usuario ya votó este destino") {
            setDestinoLocal({ ...data, userVote: data.userVote });
        }
        toast.error(msg || "Error al votar");
    } finally {
        setVotando(false);
    }
  };

  const handleDescargarPDF = async () => {
    setGenerando(true);
    try {
      await generarPDF(datosDestino);
    } catch (err) {
      toast.error("Error al generar PDF");
    } finally {
      setGenerando(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* Botón volver */}
      <button onClick={() => navigate("/")} className="flex items-center gap-2 text-gray-400 hover:text-gray-700 text-sm mb-8 transition-colors group">
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        {t('detalles.volver')}
      </button>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* COLUMNA IZQUIERDA: CARRUSEL E IMÁGENES */}
        <div className="lg:w-1/2">
          <div className="relative rounded-2xl overflow-hidden shadow-md">
            <CarruselDestino imagenes={data.images || []} altText={datosDestino.nombre} />
            <div className="absolute bottom-4 left-4 flex items-center gap-1.5 bg-black/50 backdrop-blur-sm text-white text-sm px-3 py-1.5 rounded-full z-20 pointer-events-none">
              <MapPin size={14} />
              <span>{datosDestino.ubicacion}, {datosDestino.pais}</span>
            </div>
          </div>
        </div>

        {/* COLUMNA DERECHA: TEXTOS Y ACCIONES */}
        <div className="lg:w-1/2 flex flex-col gap-6">
          <div className="flex justify-between items-start gap-4">
            <h1 className="text-4xl font-bold text-gray-900 tracking-tight flex-1">{datosDestino.nombre}</h1>
            <div className="flex items-center gap-1">
                <button 
                  type="button"
                  disabled={generando}
                  onClick={handleDescargarPDF}
                  className={`p-3 rounded-full transition-colors ${generando ? 'opacity-50' : 'hover:bg-gray-100 text-gray-400 hover:text-orange-500'}`}
                >
                  <Download size={28} className={generando ? "animate-pulse text-orange-400" : ""} />
                </button>
                <button 
                    type="button"
                    onClick={() => toggleFavorito(data)}
                    className="p-3 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <Heart className={isFav ? "fill-orange-500 text-orange-500" : "text-gray-400"} size={28} />
                </button>
            </div>
          </div>

          <p className="text-gray-500 leading-relaxed">{datosDestino.descripcion}</p>
          
          <div className="flex items-center gap-4">
            <div className="bg-orange-50 rounded-2xl px-6 py-4 flex-1 text-center">
              <p className="text-xs text-orange-400 uppercase tracking-widest font-medium mb-1">{t('detalles.presupuesto')}</p>
              <p className="text-3xl font-bold text-orange-500">$ {datosDestino.presupuesto}</p>
            </div>
            <div className="bg-gray-50 rounded-2xl px-6 py-4 flex-1 text-center">
              <p className="text-xs text-gray-400 uppercase tracking-widest font-medium mb-1">{t('detalles.promedio')}</p>
              <p className="text-3xl font-bold text-gray-800">{ratingFormateado}<span className="text-base font-normal text-gray-400"> / 5</span></p>
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
              <SelectorEstrellas
                  puntajeActual={data.userVote ?? 0}
                  onVotar={handleVotar}
                  bloqueado={yaVoto || votando}
              />
          </div>

          {/* SECCIÓN: TRANSPORTES DISPONIBLES */}
          {datosDestino.transportes.length > 0 && (
            <div className="border-t border-gray-100 pt-4">
              <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                <Car size={14} /> {t('detalles.transporte') || "Transportes Disponibles"}
              </h2>
              <ul className="flex flex-wrap gap-2">
                {datosDestino.transportes.map((trans, i) => (
                  <li key={i} className="px-4 py-1.5 bg-[#0a1628] text-white rounded-full text-xs font-medium shadow-sm">
                    <span className="capitalize">{trans.type}</span> - <span className="text-gray-300 text-[11px]">{trans.provider}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* SECCIÓN: ALOJAMIENTOS */}
          {datosDestino.alojamientos.length > 0 && (
            <div className="border-t border-gray-100 pt-4">
              <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                <Briefcase size={14} /> {t('detalles.alojamientos') || "Alojamientos Sugeridos"}
              </h2>
              <div className="grid grid-cols-1 gap-3">
                {datosDestino.alojamientos.map((aloj, i) => (
                  <div key={i} className="bg-gray-50 border border-gray-100 rounded-xl p-4 shadow-sm flex flex-col gap-1">
                    <div className="flex justify-between items-start">
                      <h3 className="text-sm font-bold text-gray-800">{aloj.name}</h3>
                      <span className="text-xs font-semibold text-orange-500 bg-orange-50 px-2 py-0.5 rounded-md">
                        ${aloj.pricePerNight} / noche
                      </span>
                    </div>
                    <span className="text-[11px] text-gray-400 font-medium capitalize">{aloj.type} {aloj.stars ? `• ${aloj.stars}⭐` : ""}</span>
                    <p className="text-xs text-gray-500 mt-1 leading-normal">{aloj.description}</p>
                    <span className="text-[10px] text-gray-400 mt-1 italic">📍 {aloj.location}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Detalles;
// Realizo importaciones
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import useDestinoId from '../hooks/useDestinoId';
import MensajesApp from "./../componentes/MensajesApp/MensajesApp"
import Boton from "../componentes/Boton/Boton";
import { generarPDF } from '../servicios/pdfService';
import SelectorEstrellas from "../componentes/SelectorEstrellas/SelectorEstrellas";
import { votarDestino } from "../servicios/votacionService";
import { ArrowLeft, MapPin, Heart } from "lucide-react"; // Importamos Heart
import { useTranslation } from 'react-i18next';
import { useFavoritos } from '../context/entornoFavoritos'; // IMPORTACIÓN CORREGIDA
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Detalles = () => {
  const { id } = useParams();
  const { destino, cargando, error } = useDestinoId(id);
  const navigate = useNavigate();
  const { t } = useTranslation();
 
  // Usamos el contexto de favoritos
  const { esFavorito, toggleFavorito } = useFavoritos();

  // Inicializo estados
  const [destinoLocal, setDestinoLocal] = useState(null);
  const [votando, setVotando] = useState(false);
  const [generando, setGenerando] = useState(false);
  const [estadoPDF, setEstadoPDF] = useState(null);

  const data = destinoLocal ? destinoLocal : destino;
  const yaVoto = data?.userVote != null;

  useEffect(() => {
    if (!cargando && (error || !destino || Object.keys(destino).length === 0)) {
      navigate("/error", { replace: true });
    }
  }, [destino, cargando, error, navigate]);

  if (cargando) return <MensajesApp tipo="cargando" />;
  if (!destino || Object.keys(destino).length === 0) return null;

  const datosDestino = {
    id: data.id,
    nombre: data.name,
    descripcion: data.description,
    ubicacion: data.location,
    pais: data.country,
    presupuesto: data.budget,
    calificacion: data.rating || 0,
    cantidadVotos: data.votesCount || 0,
    imagen: data.images?.[0]?.url || 'https://picsum.photos/400/300',
    accesibilidad: data.accessibility || [],
  };

  // Verificamos si es favorito usando la función del contexto
  const isFav = esFavorito(datosDestino.id);

  const ratingFormateado = Number(data.rating ?? 0).toFixed(1);

  const handleVotar = async (puntaje) => {

    if (votando || yaVoto) return;

    setDestinoLocal({
        ...data,
        userVote: puntaje
    });

    setVotando(true);

    try {

        const res = await votarDestino(
            data.id,
            Number(puntaje)
        );

        const destinoActualizado =
            res?.data?.destination ?? res?.destination ?? res;

        if (!destinoActualizado || typeof destinoActualizado !== 'object') {
            throw new Error("Respuesta inválida");
        }

        setDestinoLocal({
            ...data,
            ...destinoActualizado,
            userVote: puntaje
        });

        toast.success("Tu voto fue guardado");

    } catch(error) {

    const msg = error?.response?.data?.error;

    if(msg === "El usuario ya votó este destino") {

        setDestinoLocal({
            ...data,
            userVote: data.userVote
        });

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
              <img 
                src={data.images?.[0]?.url || 'https://picsum.photos/400/300'}
                alt={data.name} 
                className="w-full h-[420px] object-cover"
              />
            <div className="absolute bottom-4 left-4 flex items-center gap-1.5 bg-black/50 backdrop-blur-sm text-white text-sm px-3 py-1.5 rounded-full">
              <MapPin size={14} />
              <span>{data.location}, {data.country}</span>
            </div>
          </div>
        </div>

        <div className="lg:w-1/2 flex flex-col gap-6">
          <div className="flex justify-between items-start">
            <h1 className="text-4xl font-bold text-gray-900 tracking-tight">{data.name}</h1>
            
            {/* BOTÓN DE FAVORITOS INTEGRADO */}
            <button 
                type="button"
                disabled={actualizandoFavorito}
                onClick={() => toggleFavorito(datosDestino)}
                className={`p-3 rounded-full transition-colors ${actualizandoFavorito ? 'cursor-not-allowed opacity-70' : 'hover:bg-gray-100 cursor-pointer'}`}
            >
                <Heart 
                    className={isFav ? "fill-orange-500 text-orange-500" : "text-gray-400"} 
                    size={28} 
                />
            </button>
          </div>

          <p className="text-gray-500 leading-relaxed">{data.description}</p>
          
          <div className="flex items-center gap-4">
            <div className="bg-orange-50 rounded-2xl px-6 py-4 flex-1 text-center">
              <p className="text-xs text-orange-400 uppercase tracking-widest font-medium mb-1">{t('detalles.presupuesto')}</p>
              <p className="text-3xl font-bold text-orange-500">$ {data.budget}</p>
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

          {data.accessibility?.length > 0 && (
            <div>
              <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">{t('detalles.accesibilidad')}</h2>
              <ul className="flex flex-wrap gap-2">
                {data.accessibility?.map((medio, i) => (
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
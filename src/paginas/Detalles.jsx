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
  const [mensajeVoto, setMensajeVoto] = useState(null);
  const [generando, setGenerando] = useState(false);
  const [estadoPDF, setEstadoPDF] = useState(null);

  useEffect(() => {
    if (estadoPDF === 'exito') {
      const timer = setTimeout(() => setEstadoPDF(null), 7000);
      return () => clearTimeout(timer);
    }
  }, [estadoPDF]);

  if (cargando) return <MensajesApp tipo="cargando" />;

  if (error) return (
    <MensajesApp tipo="error" detalle={error}>
      <Boton onClick={() => window.location.reload()}>{t('detalles.reintentar')}</Boton>
    </MensajesApp>
  );

  if (!destino) return (
    <div className="max-w-7xl mx-auto px-6 py-20 flex flex-col items-center">
      <MensajesApp 
        tipo="vacio" 
        mensaje={t('mensajes.vacio')} 
      />
      <Boton className="mt-6" onClick={() => navigate("/")}>
        {t('detalles.volver')}
      </Boton>
    </div>
  );

  const obtenerVotosRealizados = () => JSON.parse(localStorage.getItem('misVotosPuntajes') || '{}');
  const miVotoGuardado = obtenerVotosRealizados()[destino.id];
  const yaVoto = !!miVotoGuardado;
  const destinoMostrado = destinoLocal || destino;
  const guardado = esFavorito(destinoMostrado.id);

  const handleVotar = async (puntaje) => {
    setVotando(true);
    setMensajeVoto(null);
    try {
      const actualizado = await votarDestino(destinoMostrado, puntaje);
      const votosActuales = obtenerVotosRealizados();
      localStorage.setItem('misVotosPuntajes', JSON.stringify({ ...votosActuales, [destino.id]: puntaje }));
      setDestinoLocal(actualizado);
      setMensajeVoto('exito');
    } catch (err) {
      console.error('Error al votar:', err);
      setMensajeVoto('error');
    } finally {
      setVotando(false);
    }
  };

  const handleDescargarPDF = async () => {
    setGenerando(true);
    setEstadoPDF(null);
    try {
      await generarPDF(destinoMostrado);
      setEstadoPDF('exito');
    } catch (err) {
      setEstadoPDF('error');
      console.error('Error al generar PDF:', err);
    } finally {
      setGenerando(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      {/* BOTÓN VOLVER */}
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-2 text-gray-400 hover:text-gray-700 text-sm mb-8 transition-colors group"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        {t('detalles.volver')}
      </button>

      <div className="flex flex-col lg:flex-row gap-10">

        {/* COLUMNA IZQUIERDA — Solo imagen */}
        <div className="lg:w-1/2">
          <div className="relative rounded-2xl overflow-hidden shadow-md">
            <img
              src={destinoMostrado.imagen}
              alt={destinoMostrado.nombre}
              className="w-full h-[420px] object-cover"
            />
            <div className="absolute bottom-4 left-4 flex items-center gap-1.5 bg-black/50 backdrop-blur-sm text-white text-sm px-3 py-1.5 rounded-full">
              <MapPin size={14} />
              <span>{destinoMostrado.ubicacion}, {destinoMostrado.pais}</span>
            </div>
          </div>
        </div>

        {/* COLUMNA DERECHA */}
        <div className="lg:w-1/2 flex flex-col gap-6">

          {/* TÍTULO + ACCIONES */}
          <div>
            <div className="flex items-start justify-between gap-4 mb-3">

              <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
                {destinoMostrado.nombre}
              </h1>

              {/* ACCIONES */}
              <div className="flex items-center gap-2 shrink-0">

                {/* FAVORITO */}
                <button
                  onClick={() => validacionFavorito(destinoMostrado)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    guardado
                      ? 'bg-orange-50 text-orange-500'
                      : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                  }`}
                >
                  <Heart 
                    size={16} 
                    className={guardado ? "fill-orange-500" : "fill-none stroke-current"} 
                  />
                  <span className="hidden sm:inline">
                    {guardado ? t('detalles.guardado') : t('detalles.guardar')}
                  </span>
                </button>

                {/* DESCARGA PDF */}
                <button 
                  onClick={handleDescargarPDF}
                  disabled={generando}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    estadoPDF === 'exito' 
                      ? 'bg-green-50 text-green-600' 
                      : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                  } ${generando ? 'cursor-wait opacity-70' : 'cursor-pointer'}`}
                >
                  {generando 
                    ? <Loader2 className="animate-spin" size={16} />
                    : estadoPDF === 'exito' 
                      ? <CheckCircle size={16} />
                      : <Download size={16} />
                  }
                  <span className="hidden sm:inline">
                    {generando 
                      ? t('detalles.generando') 
                      : estadoPDF === 'exito' 
                        ? t('detalles.descarga_exitosa') 
                        : t('detalles.descargar')
                    }
                  </span>
                </button>
              </div>
            </div>

            <p className="text-gray-500 leading-relaxed">
              {destinoMostrado.descripcion}
            </p>
          </div>

          {/* PRESUPUESTO Y CALIFICACIÓN */}
          <div className="flex items-center gap-4">
            <div className="bg-orange-50 rounded-2xl px-6 py-4 flex-1 text-center">
              <p className="text-xs text-orange-400 uppercase tracking-widest font-medium mb-1">
                {t('detalles.presupuesto')}
              </p>
              <p className="text-3xl font-bold text-orange-500">
                $ {destinoMostrado.presupuesto}
              </p>
            </div>
            <div className="bg-gray-50 rounded-2xl px-6 py-4 flex-1 text-center">
              <p className="text-xs text-gray-400 uppercase tracking-widest font-medium mb-1">
                {t('detalles.promedio')}
              </p>
              <p className="text-3xl font-bold text-gray-800">
                {destinoMostrado.calificacion}
                <span className="text-base font-normal text-gray-400"> / 5</span>
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {destinoMostrado.cantidadVotos} {t('detalles.votos_comunidad')}
              </p>
            </div>
          </div>

          {/* TU VOTO */}
          {yaVoto && (
            <div className="flex items-center gap-2 text-green-600 bg-green-50 px-4 py-3 rounded-xl text-sm font-medium">
              <CheckCircle size={16} />
              {t('detalles.calificacion')}: {miVotoGuardado} {t('detalles.estrellas')}
            </div>
          )}

          {/* SELECTOR DE ESTRELLAS */}
          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
            <p className="text-sm font-semibold text-gray-600 mb-4">
              {yaVoto ? t('detalles.calificacion_guardada') : t('detalles.da_tu_opinion')}
            </p>
            <SelectorEstrellas
              puntajeActual={miVotoGuardado || destinoMostrado.calificacion}
              onVotar={handleVotar}
              bloqueado={yaVoto || votando}
            />
            {votando && (
              <p className="text-xs text-orange-400 mt-3 flex items-center gap-1.5">
                <Loader2 size={12} className="animate-spin" />
                {t('detalles.voto_enviando')}
              </p>
            )}
            {mensajeVoto === 'exito' && (
              <p className="text-xs text-green-600 mt-3 flex items-center gap-1.5">
                <CheckCircle size={12} />
                {t('detalles.voto_exitoso')}
              </p>
            )}
          </div>

          {/* ACCESIBILIDAD */}
          <div>
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">
              {t('detalles.accesibilidad')}
            </h2>
            <ul className="flex flex-wrap gap-2">
              {destinoMostrado.accesibilidad.map((medio, i) => (
                <li key={i} className="px-4 py-1.5 bg-[#0a1628] text-white rounded-full text-xs font-medium">
                  {medio}
                </li>
              ))}
            </ul>
          </div>

          {/* ALOJAMIENTOS */}
          <div>
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
              {t('detalles.alojamientos')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {destinoMostrado.alojamiento.map((a, i) => (
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
      </div>
    </div>
  );
};

export default Detalles;
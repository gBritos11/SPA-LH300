import { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import useDestinoId from '../hooks/useDestinoId';
import MensajesApp from "./../componentes/MensajesApp/MensajesApp"
import Boton from "../componentes/Boton/Boton";
import { generarPDF } from '../servicios/pdfService';
import Favorito from "../componentes/Favorito/Favorito";
import Tarjeta from "../componentes/Tarjeta/Tarjeta";
import SelectorEstrellas from "../componentes/SelectorEstrellas/SelectorEstrellas";
import { votarDestino } from "../servicios/votacionService";
import { Download, Loader2, CheckCircle } from "lucide-react";

const Detalles = () => {
  const { id } = useParams();
  const { destino, cargando, error } = useDestinoId(id);
  const navigate = useNavigate();

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

  if (cargando) return <MensajesApp tipo="cargando" mensaje="Buscando destinos..." />;

  if (error) return (
    <MensajesApp tipo="error" detalle={error}>
      <Boton onClick={() => window.location.reload()}>Reintentar</Boton>
    </MensajesApp>
  );

  if (!destino) return null;

  // Lógica de Votos Personales (LocalStorage)
  const obtenerVotosRealizados = () => JSON.parse(localStorage.getItem('misVotosPuntajes') || '{}');
  const miVotoGuardado = obtenerVotosRealizados()[destino.id];
  const yaVoto = !!miVotoGuardado;

  // Para datos generales usamos la API, para interacción el estado local
  const destinoMostrado = destinoLocal || destino;

  const handleVotar = async (puntaje) => {
    setVotando(true);
    setMensajeVoto(null);

    try {
      const actualizado = await votarDestino(destinoMostrado, puntaje);
      
      const votosActuales = obtenerVotosRealizados();
      const nuevosVotos = { ...votosActuales, [destino.id]: puntaje };
      localStorage.setItem('misVotosPuntajes', JSON.stringify(nuevosVotos));

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
    <div className="flex flex-col lg:flex-row gap-8 p-8">
      <div className="lg:w-1/2">
        <img
          src={destinoMostrado.imagen}
          alt={destinoMostrado.nombre}
          className="w-full h-96 object-cover rounded-lg shadow-md"
        />
      </div>
      
      <div className="lg:w-1/2 flex flex-col justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">{destinoMostrado.nombre}</h1>
          <p className="mt-2 text-sm text-gray-500 italic">
            {destinoMostrado.ubicacion}, {destinoMostrado.pais}
          </p>
          <p className="mt-4 text-gray-700 leading-relaxed">{destinoMostrado.descripcion}</p>

          <p className="mt-4 text-xl font-semibold text-orange-600">
            Presupuesto: ${destinoMostrado.presupuesto}
          </p>
          
          {/* SECCIÓN DE CALIFICACIÓN: API vs VOTO PERSONAL */}
          <div className="mt-4 flex flex-col gap-1">
            <div className="flex items-center gap-2 text-gray-600">
              <span className="font-medium text-lg">Promedio: {destinoMostrado.calificacion}</span>
              <span className="text-xs">({destinoMostrado.cantidadVotos} votos de la comunidad)</span>
            </div>
            
            {yaVoto && (
              <div className="flex items-center gap-2 text-green-600 font-bold text-sm">
                <CheckCircle size={16} />
                <span>Tu puntuación: {miVotoGuardado} estrellas</span>
              </div>
            )}
          </div>

          {/* SELECTOR DE ESTRELLAS */}
          <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-600 mb-2">
              {yaVoto ? "Calificación guardada" : "¡Danos tu opinión!"}
            </h3>
            <SelectorEstrellas
              puntajeActual={miVotoGuardado || destinoMostrado.calificacion}
              onVotar={handleVotar}
              bloqueado={yaVoto || votando}
            />
            {votando && <p className="text-xs text-orange-500 mt-2 animate-pulse">Enviando voto...</p>}
            {mensajeVoto === 'exito' && <p className="text-xs text-green-600 mt-2">¡Gracias por participar!</p>}
          </div>

          {/* ACCESIBILIDAD */}
          <div className="mt-6">
            <h2 className="font-semibold text-gray-700">Accesibilidad:</h2>
            <ul className="flex gap-2 mt-2">
              {destinoMostrado.accesibilidad.map((medio, i) => (
                <li key={i} className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">
                  {medio}
                </li>
              ))}
            </ul>
          </div>

          {/* ALOJAMIENTOS */}
          <div className="mt-8">
            <h2 className="font-semibold text-gray-700 mb-4">Opciones de alojamiento:</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

        {/* FEEDBACK PDF */}
        {estadoPDF === 'exito' && (
          <div className='mt-4 p-3 bg-green-50 border border-green-200 rounded-lg'>
            <p className='text-green-600 text-sm font-medium text-center'>Ficha descargada correctamente</p>
          </div>
        )}

        <div className="mt-8 flex flex-wrap gap-4 items-center border-t pt-6">
          <Favorito destino={destinoMostrado} />

          <button 
            onClick={handleDescargarPDF}
            disabled={generando}
            className={`p-3 rounded-full transition-all duration-300 ${
              estadoPDF === 'exito' ? 'bg-green-100 text-green-600' : 'bg-gray-50 text-gray-600 hover:bg-gray-200'
            } ${generando ? 'cursor-wait' : 'cursor-pointer'}`}
          >
            {generando ? <Loader2 className="animate-spin" size={24} /> : 
             estadoPDF === 'exito' ? <CheckCircle size={24} /> : <Download size={24} />}
          </button>

          <Boton variant="outline" onClick={() => navigate("/")}>
            Volver al inicio
          </Boton>
        </div>
      </div>
    </div>
  );
};

export default Detalles;
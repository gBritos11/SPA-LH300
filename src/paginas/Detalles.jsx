import { useState } from 'react';
import { useParams, useNavigate  } from "react-router-dom";
import useDestinoId from '../hooks/useDestinoId';
import MensajesApp from "./../componentes/MensajesApp/MensajesApp"
import Boton from "../componentes/Boton/Boton";
import { generarPDF } from '../servicios/pdfService';
import Favorito from "../componentes/Favorito/Favorito";
import Tarjeta from "../componentes/Tarjeta/Tarjeta";
import { Download, Loader2, CheckCircle } from "lucide-react";

const Detalles = () => {
  const { id } = useParams();
  const { destino, cargando, error } = useDestinoId(id);
  const navigate = useNavigate();

    {/* AGREGANDO ESTADO PARA CONTROLAR PDF  empieza en false*/}
    const [generando, setGenerando] = useState(false);
    {/* Estado para el feedback al usuario */}
    const [estadoPDF, setEstadoPDF] = useState(null);

    if (cargando) return <MensajesApp tipo="cargando" mensaje="Buscando destinos..." />;

    if (error) return (
        <MensajesApp tipo="error" detalle={error}>
            <Boton onClick={() => window.location.reload()}>Reintentar</Boton>
        </MensajesApp>
    );

    if (!destino) return null;

    {/* Funcion que se ejecuta al hacer click en el boton */}
    const handleDescargarPDF = async () => {
      //Activamos el estado de generando -> el boton cambia su texto
      setGenerando(true);

      //Reseteamos el mensaje anterior por si el usuario intenta de nuevo
      setEstadoPDF(null);

      try {
        {/* le pasamos el objeto destino completo */}
        {/* El servicio sabe como armar el pdf */}
        await generarPDF(destino);

        {/* Si llegamos aca el pdf se genero sin errores */}
        setEstadoPDF('exito');

        const timer = setTimeout(() => setEstadoPDF(null), 7000);
        return () => clearTimeout(timer);

      } catch (err) {
        {/* Si algo fallo (img no cargo, jsPDF tuvo un problema) */}
        setEstadoPDF('error');
        console.error('Error al generar PDF:', err);

      } finally {
        {/* Se ejecuta simpre, haya error o no. Vuelve habilitar el boton */}
        setGenerando(false);
      }
    }

  return (
    
    <div className="flex flex-col lg:flex-row gap-8 p-8">
      <div className="lg:w-1/2">
        <img
          src={destino.imagen}
          alt={destino.nombre}
          className="w-full h-96 object-cover rounded-lg shadow-md"
        />
      </div>
      
      <div className="lg:w-1/2 flex flex-col justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">{destino.nombre}</h1>
          <p className="mt-2 text-sm text-gray-500">
            {destino.ubicacion}, {destino.pais}
          </p>
          <p className="mt-4 text-gray-700 leading-relaxed">{destino.descripcion}</p>

          <p className="mt-4 text-xl font-semibold text-orange-600">
            Presupuesto: ${destino.presupuesto}
          </p>
          <p className="mt-2 text-gray-500 italic">
            Calificación: {destino.calificacion} 
          </p>

          <div className="mt-4">
            <h2 className="font-semibold text-gray-700">Accesibilidad:</h2>
            <ul className="flex gap-2 mt-2">
              {destino.accesibilidad.map((medio, i) => (
                <li
                  key={i}
                  className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm"
                >
                  {medio}
                </li>
              ))}
            </ul>
          </div>

          {/* Alojamientos */}
          <div className="mt-6">
            <h2 className="font-semibold text-gray-700 mb-4">Alojamientos:</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {destino.alojamiento.map((a, i) => (
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

        {/* Mostramos el msj justo antes del grupo de botones para que sea visible sin hacer scroll */}

        {estadoPDF === 'exito' && (
          <div className='mt-4 p-3 bg-green-50 border border-green-200 rounded-lg'>
            <p className='text-green-600 text-sm font-medium text-center'>
              PDF descargado correctamente
            </p>
          </div>
        )}

        {estadoPDF === 'error' && (
          <MensajesApp 
            tipo="error"  
            mensaje="No se pudo generar el PDF. Intentá de nuevo"
            
          />
        )}

        <div className="mt-6 flex flex-wrap gap-4 items-center">
          {/* Botón de favorito */}
          <Favorito destino={destino} />

          <Boton variant="secondary" onClick={() => alert("Destino puntuado!")}>
            Puntuar
          </Boton>

          <Boton 
            onClick={handleDescargarPDF}
            disabled={generando}
            className={`p-2 rounded-full transition-all duration-300 ${
              estadoPDF === 'exito' 
                ? 'bg-green-100 text-green-600' 
                : 'hover:bg-gray-100 text-gray-600'
              } ${generando ? 'cursor-wait' : 'cursor-pointer'}`}
              title="Descargar PDF"
            >

            <div className="flex items-center gap-2">
              {generando ? (
                <Loader2 className="animate-spin" size={24} />
              ) : estadoPDF === 'exito' ? (
                <CheckCircle size={24} />
              ) : (
                <Download size={24} />
              )}
            </div>
          </Boton>

          <Boton variant="outline" onClick={() => navigate("/")}>
            Volver al inicio
          </Boton>
        </div>
      </div>
    </div>
  );
};

export default Detalles;

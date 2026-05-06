import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from 'react-i18next'; // 1. Importamos el hook

const BannerCarrusel = ({ imagenes }) => {
  const [indiceActual, setIndiceActual] = useState(0);
  const { t } = useTranslation(); // 2. Inicializamos la traducción

  useEffect(() => {
    const intervalo = setInterval(() => {
      siguienteImagen();
    }, 5000);
    return () => clearInterval(intervalo);
  }, [indiceActual]);

  const siguienteImagen = () => {
    setIndiceActual((prev) => (prev === imagenes.length - 1 ? 0 : prev + 1));
  };

  const anteriorImagen = () => {
    setIndiceActual((prev) => (prev === 0 ? imagenes.length - 1 : prev - 1));
  };

  return (
    <div className="relative w-full h-[450px] md:h-[600px] overflow-hidden group shadow-inner bg-slate-900">
      
      {imagenes.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out transform ${
            index === indiceActual ? "opacity-100 scale-100" : "opacity-0 scale-105"
          }`}
        >
          <img
            src={img}
            alt={`Slide ${index}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
        </div>
      ))}

      {/* ✍️ TEXTOS TRADUCIDOS */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pointer-events-none">
        <span className="text-orange-400 font-bold tracking-[0.3em] uppercase text-xs md:text-sm mb-3 animate-in slide-in-from-bottom duration-700">
          {t('banner.subtitulo')} 
        </span>
        <h2 className="text-white text-5xl md:text-7xl font-black mb-4 drop-shadow-2xl animate-in slide-in-from-bottom duration-1000 uppercase tracking-tighter">
          {t('banner.titulo')}
        </h2>
      </div>

      {/* CONTROLES (Glassmorphism) */}
      <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <button
          onClick={anteriorImagen}
          className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-orange-500 hover:border-orange-400 transition-all active:scale-90"
        >
          <ChevronLeft size={28} />
        </button>
        <button
          onClick={siguienteImagen}
          className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-orange-500 hover:border-orange-400 transition-all active:scale-90"
        >
          <ChevronRight size={28} />
        </button>
      </div>

      {/* INDICADORES */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
        {imagenes.map((_, index) => (
          <button
            key={index}
            onClick={() => setIndiceActual(index)}
            className={`h-1.5 transition-all duration-500 rounded-full ${
              index === indiceActual ? "bg-orange-500 w-10" : "bg-white/40 w-4"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default BannerCarrusel;
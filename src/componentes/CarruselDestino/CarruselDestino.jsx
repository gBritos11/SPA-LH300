import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CarruselDestino = ({ imagenes, altText = "Imagen" }) => {
  const [indiceActual, setIndiceActual] = useState(0);

  // Si no hay imágenes, mostramos la de por defecto
  if (!imagenes || imagenes.length === 0) {
    return (
      <img
        src="https://picsum.photos/400/300"
        alt="Sin imagen"
        className="w-full h-[420px] object-cover"
      />
    );
  }

  // Si solo hay 1 imagen, mostramos la imagen sin controles
  if (imagenes.length === 1) {
    return (
      <img
        src={imagenes[0].url || imagenes[0]}
        alt={altText}
        className="w-full h-[420px] object-cover"
      />
    );
  }

  const siguienteImagen = () => {
    setIndiceActual((prev) => (prev === imagenes.length - 1 ? 0 : prev + 1));
  };

  const anteriorImagen = () => {
    setIndiceActual((prev) => (prev === 0 ? imagenes.length - 1 : prev - 1));
  };

  return (
    <div className="relative w-full h-[420px] group overflow-hidden bg-gray-100">
      {/* Contenedor de imágenes deslizable */}
      <div
        className="flex transition-transform duration-500 ease-out h-full"
        style={{ transform: `translateX(-${indiceActual * 100}%)` }}
      >
        {imagenes.map((img, index) => (
          <img
            key={index}
            src={img.url || img}
            alt={`${altText} - foto ${index + 1}`}
            className="w-full h-full object-cover flex-shrink-0"
          />
        ))}
      </div>

      {/* Controles Laterales */}
      <button
        onClick={anteriorImagen}
        className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white text-gray-800 shadow-sm opacity-0 group-hover:opacity-100 transition-all active:scale-95 z-10"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={siguienteImagen}
        className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white text-gray-800 shadow-sm opacity-0 group-hover:opacity-100 transition-all active:scale-95 z-10"
      >
        <ChevronRight size={20} />
      </button>

      {/* Indicadores inferiores */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {imagenes.map((_, index) => (
          <button
            key={index}
            onClick={() => setIndiceActual(index)}
            className={`transition-all duration-300 rounded-full shadow-sm ${
              index === indiceActual ? "bg-white w-6 h-2" : "bg-white/50 w-2 h-2 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default CarruselDestino;
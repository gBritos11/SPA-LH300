import { Heart } from "lucide-react";
import { useFavoritos } from "../../context/entornoFavoritos"; 
import { useTranslation } from 'react-i18next';

const Favorito = ({ destino, className = "" }) => {
  const { esFavorito, toggleFavorito } = useFavoritos(); 
  const { t } = useTranslation();

  const favorito = esFavorito(destino.id);

  return (
    <button
      onClick={(e) => {
        e.stopPropagation(); 
        toggleFavorito(destino); 
      }}
      className={`flex items-center gap-2 ${className}`}
    >
      <span
        className={`p-2 rounded-full transition-colors ${
          favorito
            ? "bg-orange-100 text-orange-600"
            : "bg-gray-100 text-gray-400 hover:text-orange-500 hover:bg-orange-50"
        }`}
      >
        <Heart
          size={20}
          className={favorito ? "fill-current" : "stroke-current"}
        />
      </span>
    </button>
  );
};

export default Favorito;
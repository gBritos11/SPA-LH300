import { Search, XCircle } from "lucide-react";
import { useTranslation } from 'react-i18next';

const Busqueda = ({ valor, onChange, campoFiltro, onCampoChange }) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col sm:flex-row gap-3 w-full max-w-2xl font-montserrat">
      {/* Input de búsqueda */}
      <div className="relative flex-1">
        <Search
          size={20}
          className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-deepblue"
        />

        <input
          type="text"
          placeholder={t('buscador.placeholder')}
          value={valor}
          onChange={(e) => onChange(e.target.value)}
          className="w-full pl-10 pr-10 py-3 rounded-lg border border-gray-300 
                     focus:outline-none focus:border-orange focus:ring-2 focus:ring-orange-200 
                     bg-white text-gray-800 text-sm shadow-sm transition-all duration-200"
        />

        {valor && (
          <button
            onClick={() => onChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-deepblue transition-colors"
          >
            <XCircle size={20} />
          </button>
        )}
      </div>

      {/* Select de campo */}
        <select
            value={campoFiltro}
            onChange={(e) => onCampoChange(e.target.value)}
            className="py-3 px-4 rounded-lg border border-gray-300 
                        focus:outline-none focus:border-orange focus:ring-2 focus:ring-orange-200 
                        bg-white text-deepblue font-montserrat text-sm shadow-sm 
                        transition-all duration-200 cursor-pointer hover:border-sky hover:ring-sky-200"
            >
            <option value="search">{t('buscador.filtro_todos')}</option>
            <option value="pais">{t('buscador.filtro_pais')}</option>
            <option value="ubicacion">{t('buscador.filtro_ubicacion')}</option>
            <option value="descripcion">{t('buscador.filtro_descripcion')}</option>
        </select>
    </div>
  );
};

export default Busqueda;
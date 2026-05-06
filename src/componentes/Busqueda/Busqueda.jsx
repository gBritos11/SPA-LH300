import { Search, XCircle } from "lucide-react";
import { useTranslation } from 'react-i18next';

const Busqueda = ({ valor, onChange, campoFiltro, onCampoChange }) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col sm:flex-row gap-2 w-full max-w-2xl">

      {/* INPUT */}
      <div className="relative flex-1">
        <Search
          size={16}
          className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400"
        />
        <input
          type="text"
          placeholder={t('buscador.placeholder')}
          value={valor}
          onChange={(e) => onChange(e.target.value)}
          className="w-full pl-10 pr-10 py-3 
                     bg-white border border-gray-200 rounded-xl
                     text-gray-800 text-sm placeholder-gray-400
                     shadow-sm
                     focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100
                     transition-all duration-200"
        />
        {valor && (
          <button
            onClick={() => onChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 transition-colors"
          >
            <XCircle size={16} />
          </button>
        )}
      </div>

      {/* SELECT */}
      <div className="relative">
        <select
          value={campoFiltro}
          onChange={(e) => onCampoChange(e.target.value)}
          className="appearance-none h-full
                     pl-4 pr-10 py-3
                     bg-white border border-gray-200 rounded-xl
                     text-gray-600 text-sm
                     shadow-sm cursor-pointer
                     focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100
                     transition-all duration-200"
        >
          <option value="search">{t('buscador.filtro_todos')}</option>
          <option value="pais">{t('buscador.filtro_pais')}</option>
          <option value="ubicacion">{t('buscador.filtro_ubicacion')}</option>
          <option value="descripcion">{t('buscador.filtro_descripcion')}</option>
        </select>

        {/* FLECHA CUSTOM */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

    </div>
  );
};

export default Busqueda;
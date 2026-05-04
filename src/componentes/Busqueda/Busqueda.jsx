import { Search, XCircle } from "lucide-react";

const Busqueda = ({ valor, onChange, campoFiltro, onCampoChange }) => {
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
          placeholder="Buscar destinos..."
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
            <option value="search">Todos</option>
            <option value="pais">País</option>
            <option value="ubicacion">Ubicación</option>
            <option value="descripcion">Descripción</option>
        </select>
    </div>
  );
};

export default Busqueda;
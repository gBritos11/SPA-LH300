import { Search, XCircle } from "lucide-react";

{/* Ahora recibe dos prop nuevas. CampoFiltro -> el campo seleccionado y onCampoChange -> fn para avisar al padre cuando algo cambia el select */}
const Busqueda = ({valor, onChange, campoFiltro, onCampoChange}) => {
    return (
        <div className="flex flex-col sm:flex-row gap-2 w-full max-w-2xl">
            {/* input de busqueda */}
            <div className="relative flex-1">
                <Search
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400"
                />

                <input
                    type="text"
                    placeholder="Buscar destinos..."
                    value={valor}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full pl-10 pr-10 py-2.5 rounded-full border border-gray-300 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 bg-white text-gray-800 text-sm transition-all duration-200"
                />

                {valor && (
                    <button 
                        onClick={() => onChange('')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <XCircle size={18} />
                    </button>
                )}
            </div>
            {/* Select -> le permite al usuario por que campo buscar */}
            <select value={campoFiltro}
                onCampoChange={(e) => onCampoChange(e.target.value)}
                className="py-2.5 px-4 rounded-full border border-gray-300 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 bg-white text-gray-800 text-sm transition-all duration-200 cursor-pointer"
                >
                <option value="search">Todos</option>
                <option value="pais">País</option>
                <option value="ubicacion">Ubicación</option>
                <option value="descripcion">Descripción</option>
            </select>
        </div>
    )
}

export default Busqueda;
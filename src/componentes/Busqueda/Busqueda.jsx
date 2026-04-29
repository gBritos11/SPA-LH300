import { Search, XCircle } from "lucide-react";

const Busqueda = ({valor, onChange}) => {
    return (
        <div className="relative w-full max-w-md m-5">
            <Search 
                size={18} 
                className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400"
            />

        <input 
            type="text"
            placeholder="Buscar por destino o país.."
            value={valor}
            onChange={(e) => onChange(e.target.value)}
            className="w-full pl-10 pr-10 py-2.5 rounded-full border border-gray-300 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 bg-white text-gray-800 text-sm transition-all duration-200"
        />

        {/* La x solo se muestra cuando hay texto escrito */}
        {valor && (
            <button onClick={() => onChange('')} 
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                
                <XCircle size={18} />

            </button>
        )}
        </div>
    )
}

export default Busqueda;
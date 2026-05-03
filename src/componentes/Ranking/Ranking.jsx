import { useNavigate } from "react-router-dom";
import useRanking from "../../hooks/useRanking";
import { Trophy, Star } from "lucide-react";

const Ranking = () => {
    const { ranking, cargando } = useRanking();
    const navigate = useNavigate();

    return (
        <aside className="sticky top-24 h-fit max-h-[80vh] overflow-y-auto w-72 bg-white rounded-xl shadow-lg border border-gray-100 p-4">

            {/* HEADER DEL RANKING */}
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-100">
                <Trophy size={20} className="text-orange-500" />
                <h2 className="font-bold text-gray-800 text-lg">Top 10 Destinos</h2>
            </div>

            {/* ESTADO DE CARGA */}
            {cargando ? (
                <div className="flex justify-center py-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-4 border-orange-200 border-t-orange-500"/>
                </div>
            ) : ranking.length === 0 ? (
                <p className="text-gray-400 text-sm text-center py-4">
                    Sin destinos calificados aún
                </p>
            ) : (
                <ol className="flex flex-col gap-2">
                    {ranking.map((destino, index) => (
                        <li 
                            key={destino.id}
                            onClick={() => navigate(`/destino/${destino.id}`)}
                            className="flex - items-center gap-3 p-2 rounded-lg hover:bg-orange-500 cursor-pointer transition-colors group"
                        >
                        {/* Numero de pos con estilo dif para 1, 2, 3 */}
                        <span className={`
                            text-sm font-bold w-6 text-center shrink-0
                            ${index === 0 ? 'text-yellow-500' : ''}
                            ${index === 1 ? 'text-gray-400' : ''}
                            ${index === 2 ? 'text-orange-700' : ''}
                            ${index > 2 ? 'text-gray-400' : ''}
                        `}>
                            {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}.`}
                        </span>

                        {/* IMAGEN DEL DESTINO */}
                        <img
                            src={destino.imagen || 'https://picsum.photos/40/40'}
                            alt={destino.nombre}
                            className="w-10 h-10 object-cover rounded-md shrink-0"
                        />

                        {/* NOMBRE Y CALIFICACION */}
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-800 truncate group-hover:text-orange-600 transition-colors">
                                {destino.nombre}
                            </p>

                            {/* CALIFICACION CON ESTRELLA */}
                            <div className="flex items-center- gap-1">
                                <Star size={12} className="text-orange-400 fill-current" />
                                <span className="text-xs text-gray-500">
                                    {destino.calificacion}
                                    {destino.cantidadVotos > 0 && (
                                        <span className="ml-1 text-gray-400">
                                            ({destino.cantidadVotos})
                                        </span>
                                    )}

                                </span>
                            </div>
                        </div>
                        </li>
                    ))}
                </ol>
            )
            }
        </aside>
    )
}

export default Ranking;
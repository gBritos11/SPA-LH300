import { useNavigate } from "react-router-dom";
import useRanking from "../../hooks/useRanking";
import { Trophy, Star } from "lucide-react";
import { useTranslation } from 'react-i18next';

const Ranking = () => {
    const { ranking, cargando } = useRanking();
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <aside className="sticky top-24 h-fit max-h-[80vh] overflow-y-auto w-72 bg-white rounded-2xl shadow-sm border border-gray-100 p-5">

            {/* HEADER */}
            <div className="flex items-center gap-2 mb-5 pb-4 border-b border-gray-100">
                <div className="p-2 bg-orange-50 rounded-lg">
                    <Trophy size={16} className="text-orange-500" />
                </div>
                <h2 className="font-bold text-gray-900 text-sm tracking-wide uppercase">
                    {t('ranking.titulo')}
                </h2>
            </div>

            {/* CARGANDO */}
            {cargando ? (
                <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-7 w-7 border-4 border-orange-100 border-t-orange-500"/>
                </div>
            ) : ranking.length === 0 ? (
                <p className="text-gray-400 text-sm text-center py-6">
                    {t('ranking.sin_calificados')}
                </p>
            ) : (
                <ol className="flex flex-col gap-1">
                    {ranking.map((destino, index) => (
                        <li 
                            key={destino.id}
                            onClick={() => navigate(`/destino/${destino.id}`)}
                            className="flex items-center gap-3 p-3 rounded-xl hover:bg-orange-50 cursor-pointer transition-all duration-200 group"
                        >
                            {/* POSICIÓN */}
                            <span className="text-sm font-bold w-6 text-center shrink-0">
                                {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : (
                                    <span className="text-gray-400 text-xs">{index + 1}</span>
                                )}
                            </span>

                            {/* IMAGEN */}
                            <img
                                src={destino.images?.[0]?.url || 'https://picsum.photos/40/40'}
                                alt={destino.name}
                                className="w-9 h-9 object-cover rounded-lg shrink-0"
                            />

                            {/* INFO */}
                            <div className="flex-1 min-w-0">
                                <p className="text-xs font-semibold text-gray-800 truncate group-hover:text-orange-600 transition-colors">
                                    {destino.name}
                                </p>
                                <div className="flex items-center gap-1 mt-0.5">
                                    <Star size={10} className="text-orange-400 fill-current" />
                                    <span className="text-xs text-gray-400">
                                        {Number(destino.rating ?? 0).toFixed(1)}
                                        {destino.votesCount > 0 && (
                                            <span className="ml-1">
                                                ({destino.votesCount} {t('ranking.votos')})
                                            </span>
                                        )}
                                    </span>
                                </div>
                            </div>
                        </li>
                    ))}
                </ol>
            )}
        </aside>
    );
};

export default Ranking;
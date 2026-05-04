import { useState } from "react";
import { Star } from "lucide-react";

{/* recibe: puntajeActual -> calificacion dentro de destino. onVotar -> el usuario elige cant de estrellas. bloqueado -> true si el usuario ya voto ese destino */}
const SelectorEstrellas = ({puntajeActual = 0, onVotar, bloqueado = false}) => {
    {/* estrellasHover guarda sobre que estre esta. null -> el mouse no esta sobre ning estrella */}
    const [estrellasHover, setEstrellasHover] = useState(null);

    {/* se guarda el puntaje */}
    const [puntajeSeleccionado, setPuntajeSeleccionado] = useState(null);

    {/* Determinamos cuantas estrellas mostrar llenas */}
    const estrellasActivas = estrellasHover
        ?? puntajeSeleccionado
        ?? (bloqueado ? puntajeActual : 0)
    
    const handleClick = (numero) => {
        if (bloqueado) return

        setPuntajeSeleccionado(numero);
        {/* avisamos al padre que numero eligio el usuario */}
        onVotar(numero);
    }

    return (
        <div className="flex flex-col gap-2">

            <p className="text-sm font-semibold text-gray-700">
                {bloqueado ? 'Tu puntuación:' : '¿Cómo calificaría este destino'}
            </p>

            {/* grupo de estrellas */}
            <div className="flex items-center gap-1">
                {/* array para mapear las 5 estrellas */}
                {Array.from({length:5}, (_, i) => i + 1).map((numero) => {
                    const estaActiva = numero <= estrellasActivas;

                    return (
                        <button
                            key={numero}
                            disabled={bloqueado}
                            onClick={() => handleClick(numero)}
                            onMouseEnter={() => !bloqueado && setEstrellasHover(numero)}
                            onMouseLeave={() => !bloqueado && setEstrellasHover(null)}
                            className={`
                                transition-all duration-150
                                ${bloqueado
                                    ? 'cursor-default'
                                    : 'cursor-pointer hover:scale-110 active:scale-95'
                                }
                            `}
                        >
                            <Star
                                className={
                                    estaActiva
                                        ? 'text-orange-500 fill-current'
                                        : 'text-gray-300 fill-none'
                                }
                            />

                        </button>
                    )
                })}

                {/* Numero de la calificacion al lado de las esterllas */}
                <span className="ml-2 text-sm text-gray-500">
                    {estrellasActivas > 0 ? `${estrellasActivas} / 5` : ''}

                </span>
            </div>

            {/* Mensaje de bloqueo */}
            {bloqueado && (
                <p className="text-xs text-gray-400 italic">
                    Ya votaste este destino
                </p>
            )}
        </div>
    )

}

export default SelectorEstrellas;
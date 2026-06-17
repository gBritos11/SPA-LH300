import { useState } from "react";
import { Star } from "lucide-react";
import { useTranslation } from "react-i18next";

const SelectorEstrellas = ({
    puntajeActual = 0,
    onVotar,
    bloqueado = false
}) => {

    const { t } = useTranslation();

    const handleClick = (numero) => {
        if (bloqueado) return;

        onVotar?.(numero);
    };


    return (
        <div className="flex flex-col gap-2">

            <p className="text-sm font-semibold text-gray-700">
                {(bloqueado)
                    ? t("selectorEstrellas.tu_puntuacion")
                    : t("selectorEstrellas.pregunta")}
            </p>

            <div className="flex items-center gap-1">
                {Array.from({ length: 5 }, (_, i) => i + 1).map((numero) => {

                    const activa = numero <= puntajeActual;

                    return (
                       <button
                            key={numero}
                            disabled={bloqueado}
                            onClick={() => handleClick(numero)}

                            className={
                                bloqueado
                                ? "cursor-not-allowed opacity-80"
                                : "cursor-pointer hover:scale-110 transition"
                            }
                        >

                            <Star
                                size={32}
                                className={
                                    activa
                                    ? "text-orange-500 fill-orange-500"
                                    : "text-gray-300 fill-none"
                                }
                            />

                        </button>
                    );
                })}

                <span className="ml-2 text-sm text-gray-500">
                    {puntajeActual > 0 
                      ? `${puntajeActual} / 5`
                      : ""
                    }
                </span>

            </div>

             {bloqueado && (
                <p className="text-xs text-red-500 italic">
                    {t("selectorEstrellas.ya_votaste")}
                </p>
            )}

        </div>
    );
};

export default SelectorEstrellas;
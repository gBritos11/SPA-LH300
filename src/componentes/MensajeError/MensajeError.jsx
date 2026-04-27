const MensajeError = ({mensaje}) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-64 gap-3">
            <span className="text-5xl">⚠️</span>

            <p className="text-red-500 text-xl font-semibold text-center">
                No pudimos cargar los destinos
            </p>

            <p className="text-gray-500 text-sm text-center">
                Intentá de nuevo más tarde.
            </p>

            {/* para saber el error real */}
            {mensaje && (
                <p className="text-red-300 text-xs text-center mt-2">
                    Detalle: {mensaje} 
                </p>
            )}
        </div>
    )
}

export default MensajeError;
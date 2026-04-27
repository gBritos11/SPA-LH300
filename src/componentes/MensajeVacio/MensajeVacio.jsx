const MensajeVacio = ({texto = 'No hay destinos disponibles por el momento.'}) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-64 gap-3">
            
            <span className="text-5xl">🗺️</span>
        {/*
            Usamos la prop "texto" con un valor por defecto.
            Valor por defecto = 'No hay destinos disponibles por el momento.'
            Si nadie le pasa la prop, muestra ese texto.
            Si alguien le pasa texto="No tenés favoritos", muestra ese.
        */}
            <p className="text-grar-500 text-xl font-medium text-center">
                {texto}
            </p>
        </div>
    )
}

export default MensajeVacio
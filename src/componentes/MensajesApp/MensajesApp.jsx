const MensajesApp = ({ 
  tipo = 'vacio', 
  mensaje, 
  detalle, 
  icono, 
  children 
}) => {
  
  // Configuraciones por tipo
  const configuracion = {
    cargando: {
      color: "text-orange-600",
      bgIcono: "animate-spin rounded-full h-16 w-16 border-4 border-orange-200 border-t-orange-600",
      textoDefault: "Cargando destinos...",
      emoji: null
    },
    error: {
      color: "text-red-600",
      emoji: "⚠️",
      textoDefault: "Hubo un problema al cargar los destinos."
    },
    vacio: {
      color: "text-gray-500",
      emoji: "🗺️",
      textoDefault: "No hay destinos para mostrar."
    }
  };

  const config = configuracion[tipo];

  return (
    <div className="flex flex-col items-center justify-center min-h-64 gap-4 p-8">
      
      {/* Renderizado de Icono o Spinner */}
      {tipo === 'cargando' ? (
        <div className={config.bgIcono} />
      ) : (
        <span className="text-5xl" role="img" aria-label={tipo}>
          {icono || config.emoji}
        </span>
      )}

      {/* Mensaje Principal */}
      <div className="text-center">
        <p className={`text-xl font-semibold ${config.color}`}>
          {mensaje || config.textoDefault}
        </p>

        {/* Detalle Técnico (Solo si existe) */}
        {detalle && (
          <p className="text-gray-400 text-xs mt-2 font-mono">
            ID Error: {detalle}
          </p>
        )}
      </div>

      {/* Agregar un botón de "Reintentar" o "Volver" */}
      {children && <div className="mt-4">{children}</div>}
    </div>
  );
};

export default MensajesApp;
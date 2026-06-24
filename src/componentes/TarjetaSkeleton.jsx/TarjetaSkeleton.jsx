const TarjetaSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm animate-pulse">
      {/* Espacio para la imagen */}
      <div className="w-full h-48 bg-gray-200 rounded-xl mb-4"></div>
      
      {/* Espacio para el título */}
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
      
      {/* Espacio para la descripción corta */}
      <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
    </div>
  );
};

export default TarjetaSkeleton;
import { useState, useEffect } from "react";

const useFavoritos = () => {
  // Estado inicial: lee localStorage
  const [favoritos, setFavoritos] = useState(() => {
    const guardados = localStorage.getItem("favoritos");
    return guardados ? JSON.parse(guardados) : [];
  });

  // Persistencia: cada vez que cambia favoritos, se guarda en localStorage
  useEffect(() => {
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
  }, [favoritos]);

  // Función: comprobar si un destino está en favoritos
  const esFavorito = (id) => {
    return favoritos.some((destino) => destino.id === id);
  };

  // Función: toggle de favoritos (agregar o quitar)
  const validacionFavorito = (destino) => {
    if (esFavorito(destino.id)) {
      // Opción A: quitar
      setFavoritos(favoritos.filter((fav) => fav.id !== destino.id));
    } else {
      // Opción B: agregar
      setFavoritos([...favoritos, destino]);
    }
  };

  return { favoritos, esFavorito, validacionFavorito };
};

export default useFavoritos;

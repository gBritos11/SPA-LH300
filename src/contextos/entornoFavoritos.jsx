import { createContext, useState, useEffect, useContext } from "react";

//Creamos el entorno, donde los componentes obtendran información
export const FavoritosContext = createContext();

export const FavoritosProvider = ({ children }) => {
  
  // Utilizamos el hook useFavoritos
  const [favoritos, setFavoritos] = useState(() => {
    const guardados = localStorage.getItem("favoritos");
    return guardados ? JSON.parse(guardados) : [];
  });

  useEffect(() => {
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
  }, [favoritos]);

  const esFavorito = (id) => favoritos.some((fav) => fav.id === id);

  const validacionFavorito = (destino) => {
    if (esFavorito(destino.id)) {
      setFavoritos(favoritos.filter((fav) => fav.id !== destino.id));
    } else {
      setFavoritos([...favoritos, destino]);
    }
  };

  return (
    <FavoritosContext.Provider value={{ favoritos, esFavorito, validacionFavorito }}>
      {children}
    </FavoritosContext.Provider>
  );
};
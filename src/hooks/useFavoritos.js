import { useContext } from "react";
import { FavoritosContext } from "./../context/entornoFavoritos";

export const useFavoritos = () => {
  const context = useContext(FavoritosContext);
  if (!context) {
    throw new Error("useFavoritos debe usarse dentro de un FavoritosProvider");
  }
  return context;
};

export default useFavoritos;
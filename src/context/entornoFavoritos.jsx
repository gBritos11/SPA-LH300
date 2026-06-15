// Realizo las importaciones
import { createContext, useState, useEffect, useContext } from "react";
import apiClient from "../servicios/api";
import { UsuarioContext } from "./UsuarioContext";
import toast from 'react-hot-toast';

// Creo contexto react
export const FavoritosContext = createContext();

export const FavoritosProvider = ({ children }) => {
  // Inicializo estados
  const [favoritos, setFavoritos] = useState([]);
  const [cargando, setCargando] = useState(false);
  const { usuario } = useContext(UsuarioContext);

  // Definino la función de carga de favoritos
  const fetchFavoritos = async () => {
    if (!usuario) {
      setFavoritos([]);
      return;
    }
    
    setCargando(true);
    try {
      const { data } = await apiClient.get("/favorites");
      setFavoritos(data);
    } catch (error) {
      toast.error("Error al cargar favoritos:", error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    fetchFavoritos();
  }, [usuario]); 

  const esFavorito = (id) => favoritos.some((fav) => fav.destinationId === id);

  const toggleFavorito = async (destino) => {
    if (!usuario) return;

    const yaEsFavorito = esFavorito(destino.id);

    try {
      if (yaEsFavorito) {
        await apiClient.delete(`/favorites/${destino.id}`);
        await fetchFavoritos();
      } else {
        await apiClient.post("/favorites", { destinationId: destino.id });
        await fetchFavoritos();
      }
    } catch (error) {
      toast.error("No se pudo actualizar favoritos. Intenta de nuevo.");
    }
  };

  return (
    <FavoritosContext.Provider value={{ favoritos, esFavorito, toggleFavorito, cargando }}>
      {children}
    </FavoritosContext.Provider>
  );
};

export const useFavoritos = () => {
  const context = useContext(FavoritosContext);
  if (!context) {
    throw new Error("useFavoritos debe ser usado dentro de un FavoritosProvider");
  }
  return context;
};
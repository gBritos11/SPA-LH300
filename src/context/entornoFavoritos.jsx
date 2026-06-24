import { createContext, useState, useEffect, useContext, useCallback } from "react";
import apiClient from "../servicios/api";
import { UsuarioContext } from "./UsuarioContext";
import toast from 'react-hot-toast';

export const FavoritosContext = createContext();

export const FavoritosProvider = ({ children }) => {
  const [favoritos, setFavoritos] = useState([]);
  const [cargando, setCargando] = useState(false);
  const { usuario } = useContext(UsuarioContext);

  const fetchFavoritos = useCallback(async () => {
    if (!usuario) {
      setFavoritos([]);
      return;
    }
    
    setCargando(true);
    try {
      const { data } = await apiClient.get("/favorites");
      setFavoritos(data);
    } catch (error) {
      // Silenciamos el error si es un 401 porque el interceptor ya lo gestiona
      if (error.response?.status !== 401) {
        toast.error("Error al cargar favoritos");
      }
    } finally {
      setCargando(false);
    }
  }, [usuario]);

  useEffect(() => {
    fetchFavoritos();
  }, [fetchFavoritos]); 

  const esFavorito = (id) => favoritos.some((fav) => fav.destinationId === id);

  const toggleFavorito = async (destino) => {
    if (!usuario) return;

    const yaEsFavorito = esFavorito(destino.id);
    
    // Guardamos estado previo para rollback
    const favoritosPrevios = [...favoritos];

    if (yaEsFavorito) {
      setFavoritos(favoritos.filter(fav => fav.destinationId !== destino.id));
    } else {
      setFavoritos([...favoritos, { destinationId: destino.id, destination: destino }]);
    }

    // Petición al servidor
    try {
      if (yaEsFavorito) {
        await apiClient.delete(`/favorites/${destino.id}`);
      } else {
        await apiClient.post("/favorites", { destinationId: destino.id });
      }
      // Refrescamos para confirmar que el servidor tiene lo mismo que nosotros
      await fetchFavoritos();
    } catch (error) {
      // Revertir si falla
      setFavoritos(favoritosPrevios);
      toast.error("Error al actualizar favoritos");
    }
  };

  return (
    <FavoritosContext.Provider value={{ favoritos, esFavorito, toggleFavorito, cargando, fetchFavoritos }}>
      {children}
    </FavoritosContext.Provider>
  );
};

export const useFavoritos = () => {
  const context = useContext(FavoritosContext);
  if (!context) throw new Error("useFavoritos debe ser usado dentro de un Provider");
  return context;
};
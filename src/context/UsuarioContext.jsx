// Importaciones
import { createContext, useContext, useState, useEffect } from "react";
import { registerRequest, loginRequest, logoutRequest } from "../servicios/auth.service.js";
import apiClient from '../servicios/api.js';
import toast from "react-hot-toast";

// Creo contexto react
export const UsuarioContext = createContext();

export const UsuarioProvider = ({ children }) => {
  // Inicializo estados
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data } = await apiClient.get('/auth/me');
        setUsuario(data);
      } catch (error) {
        setUsuario(null);
      } finally {
        setCargando(false);
      }
    };
    checkSession();
  }, []);

  // Registro
  const register = async (userData) => {
    try {
      const { data } = await registerRequest(userData);
      return data;
    } catch (error) {
      // Lanzamos el error para que el componente lo capture
      throw error.response?.data || error;
    }
  };

  // Login
  const login = async (credenciales) => {
    try {
      const { data } = await loginRequest(credenciales);
      sessionStorage.setItem("accessToken", data.accessToken);
      setUsuario(data.user); 
      return data;
    } catch (error) {
      throw error.response?.data || error;
    }
  };

  // Logout
  const logout = async () => {
    try {
      await logoutRequest();
      sessionStorage.removeItem("accessToken");
      setUsuario(null);
    } catch (error) {
      toast.error("Error al cerrar sesión", error);
    }
  };

  return (
    <UsuarioContext.Provider value={{ usuario, login, logout, register, cargando }}>
      {children}
    </UsuarioContext.Provider>
  );
};

export const useUsuario = () => useContext(UsuarioContext);
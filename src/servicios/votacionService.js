import apiClient from "./api";

export const votarDestino = async (destinationId, score) => {
  try {
    const { data } = await apiClient.post("/votes", {
      destinationId,
      score,
    });
    return data;
  } catch (error) {
    // Aquí filtramos el error para que el componente pueda leer el mensaje del backend
    throw error.response?.data || { error: "Error desconocido al votar" };
  }
};
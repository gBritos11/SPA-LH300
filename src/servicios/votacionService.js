import apiClient from "./api";

export const votarDestino = async (destinationId, score) => {
  const { data } = await apiClient.post("/votes", {
    destinationId,
    score,
  });
  return data;
};
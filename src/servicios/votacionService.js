import apiClient from './api';

export const votarDestino = async (destinoId, puntaje) => {
    const { data } = await apiClient.post('/votes', { 
        destinationId: destinoId, 
        score: puntaje 
    });
    
    return data;
};
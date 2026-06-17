import apiClient from './api';

    export const getDestinos = async (
        pagina = 1, 
        limite = 9, 
        filtro = '', 
        campo = 'search'
    ) => {
    
    let params = new URLSearchParams({
            page: pagina,
            limit: limite,
            filtro: filtro,
            campo: campo
        });

        const { data } = await apiClient.get(
            `/destinos?${params.toString()}`
        );

        return data;
    }

export const getDestinoById = async (id) => {
    const { data } = await apiClient.get(`/destinos/${id}`);
    return data;
}
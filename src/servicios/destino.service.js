import apiClient from './api';

export const getDestinos = async (busqueda = '', pagina = 1, limite = 9, campo = 'search') => {
    let consulta = `?page=${pagina}&limit=${limite}`;
    if (busqueda) {
        consulta += `&${campo}=${busqueda}`;
    }
    const { data } = await apiClient.get(`/destinos${consulta}`);
    return data;
}

export const getDestinoById = async (id) => {
    const { data } = await apiClient.get(`/destinos/${id}`);
    return data;
}
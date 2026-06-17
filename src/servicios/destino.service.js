import apiClient from './api';

export const getDestinos = async (busqueda = '', pagina = 1, limite = 9, campo = 'search', lang = 'es') => {
    let consulta = `?page=${pagina}&limit=${limite}&lang=${lang}`;
    if (busqueda) {
        consulta += `&${campo}=${busqueda}`;
    }

export const getDestinoById = async (id, lang='es') => {
    const { data } = await apiClient.get(`/destinos/${id}?lang=${lang}`);
    return data;
}
import apiClient from './api';

const CAMPO_API = {
    search: 'search',
    pais: 'country',
    ubicacion: 'location',
    descripcion: 'description'
};

export const getDestinos = async (busqueda = '', pagina = 1, limite = 9, campo = 'search', lang = 'es') => {
    const campoQuery = CAMPO_API[campo] || campo;
    let consulta = `?page=${pagina}&limit=${limite}&lang=${lang}`;
    if (busqueda) {
        consulta += `&${campoQuery}=${encodeURIComponent(busqueda)}`;
    }

    const { data } = await apiClient.get(`/destinos${consulta}`);

    if (Array.isArray(data)) return data;
    if (Array.isArray(data.data)) return data.data;
    if (Array.isArray(data.destinos)) return data.destinos;
    if (Array.isArray(data.results)) return data.results;

    return [];
}

export const getDestinoById = async (id, lang = 'es') => {
    const { data } = await apiClient.get(`/destinos/${id}?lang=${lang}`);
    return data;
}
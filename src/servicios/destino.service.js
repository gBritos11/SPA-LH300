import apiClient from './api';

const CAMPO_API = {
    search: 'search',
    pais: 'country',
    ubicacion: 'location',
    descripcion: 'description'
};

export const getDestinos = async (busqueda = '', pagina = 1, limite = 9, campo = 'search', lang = 'es') => {
    try {
        const campoQuery = CAMPO_API[campo] || campo;
        const consulta = new URLSearchParams({
            page: pagina,
            limit: limite,
            lang: lang,
            ...(busqueda && { [campoQuery]: busqueda })
        });

        const { data } = await apiClient.get(`/destinos?${consulta.toString()}`);

        const results = data.data ?? data.destinos ?? data.results ?? (Array.isArray(data) ? data : []);
        return results;
    } catch (error) {
        console.error("Error en getDestinos:", error);
        throw error; // Lanzamos error para que el hook lo maneje
    }
}

export const getDestinoById = async (id, lang = 'es') => {
    const { data } = await apiClient.get(`/destinos/${id}?lang=${lang}`);
    return data;
}
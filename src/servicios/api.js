
{/* URL de MockAPI. Es el unico lugar de toda la app donde esta url existe. Si ma;ana cambia la modificamos aca y el resto de la app sigue funcionando si tocas nada mas */}
const API_URL = import.meta.env.VITE_API_URL;

{/* Esta función NO se exporta — es de uso interno del archivo. */}
{/* Su trabajo es hacer el fetch y manejar los errores comunes */}
{/* para no repetir ese código en cada función pública. */}

const fetchData = async (endpoint) => {
    const respuesta = await fetch(`${API_URL}${endpoint}`);

    if (respuesta.status === 404) {
        return []; 
    }
    
    if (!respuesta.ok) {
        throw new Error(`Error ${respuesta.status}: ${respuesta.statusText}`);
    }
    return respuesta.json();
}


{/* Trae el listado completo de destinos */}
{/* Uso: const destinos = await getDestinos() */}
{/* nuevo parametro campo (default 'search') campo = el nombre de la query param que se usar en la url. SI nadie lo pasa usa search en el campo generico */}
export const getDestinos = async (busqueda = '', pagina = 1, limite = 9, campo='search') => {
    let consulta = `?page=${pagina}&limit=${limite}`;
    if (busqueda){
        consulta += `&${campo}=${busqueda}`;
    }

    return fetchData(`/api/destinos${consulta}`);
}

{/* Trae un destino específico por su ID */}
{/* Uso: const destino = await getDestinoById(1) */}
export const getDestinoById = async (id) => {
    return fetchData(`/api/destinos/${id}`);
}
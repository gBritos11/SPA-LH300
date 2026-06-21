import axios from 'axios';

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true, 
    headers: { 'Content-Type': 'application/json' }
});

// Interceptor para inyectar token
apiClient.interceptors.request.use((config) => {
    const token = sessionStorage.getItem('accessToken');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

// Interceptor para el REFRESH TOKEN AUTOMÁTICO
apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Si el error es 401 y no es un reintento
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            
            try {
                const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/auth/refresh`, {}, { withCredentials: true });

                // Guardamos el nuevo token
                sessionStorage.setItem('accessToken', data.accessToken);

                // Reintentamos la petición original
                return apiClient(originalRequest);
                
            } catch (refreshError) {
                // Si el refresco falla, el Refresh Token también expiró.
                // Limpiamos todo y recargamos para forzar el logout.
                sessionStorage.removeItem('accessToken');
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default apiClient;
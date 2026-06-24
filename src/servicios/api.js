import axios from 'axios';

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true, 
    headers: { 'Content-Type': 'application/json' }
});

apiClient.interceptors.request.use((config) => {
    const token = sessionStorage.getItem('accessToken');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Si el error es 401 y no es un reintento
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            
            try {
                // Usamos apiClient para el refresh para mantener consistencia
                const { data } = await apiClient.post("/auth/refresh");

                sessionStorage.setItem('accessToken', data.accessToken);
                
                // IMPORTANTE: Actualizar el header de la petición original antes de reintentar
                originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
                
                return apiClient(originalRequest);
            } catch (refreshError) {
                // LIMPIEZA
                sessionStorage.removeItem('accessToken');
                
                if (window.location.pathname !== '/login') {
                    window.location.href = '/login'; 
                }
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default apiClient;
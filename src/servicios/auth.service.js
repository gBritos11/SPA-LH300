import apiClient from './api';

export const loginRequest = (credentials) => apiClient.post('/auth/login', credentials);
export const registerRequest = (userData) => apiClient.post('/users', userData);
export const logoutRequest = () => apiClient.post('/auth/logout');
import axios from 'axios';
import Keycloak from 'keycloak-js';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Interceptor para inyectar el token
axiosInstance.interceptors.request.use((config) => {
  const token = keycloak.token; // Asumiendo que guardas la instancia
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;

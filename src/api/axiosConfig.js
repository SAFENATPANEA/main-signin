import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  withCredentials: true
});

// Interceptor para agregar el token a las peticiones
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorDetails = {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
      code: error.code,
      url: error.config?.url
    };
    
    if (error.code === 'ERR_NETWORK') {
      console.error('AXIOS: Error de conexión al servidor. Verifique que el servidor esté ejecutándose y sea accesible:', errorDetails);
    } else {
      console.error('AXIOS: Error en la petición:', errorDetails);
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;

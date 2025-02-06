import axiosInstance from './axiosConfig';

const API_URL = import.meta.env.VITE_BACKEND_URL;

export const login = async (email, password) => {
  try {
    const response = await axiosInstance.post('/auth/login', { 
      email, 
      password 
    });
    return response.data;
  } catch (error) {
    console.error('Error de inicio de sesión:', error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

export const loginWithGoogle = async (accessToken) => {
  try {
    const response = await axiosInstance.post('/auth/google', { token: accessToken });
    return response.data;
  } catch (error) {
    console.error('Error de inicio de sesión con Google:', error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

export const logout = async () => {
  try {
    await axiosInstance.post('/auth/logout');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  } catch (error) {
    console.error('Error de cierre de sesión:', error.response?.data || error.message);
    throw error;
  }
};

export const register = async (userData) => {
  try {
    const response = await axiosInstance.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    console.error('Error de registro:', error.response?.data || error.message);
    throw error.response?.data || error;
  }
};
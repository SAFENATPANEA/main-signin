import axiosInstance from './axiosConfig';

export const login = async (email, password) => {
  try {
    const response = await axiosInstance.post('/auth/login', { 
      email, 
      password 
    });
    return response.data;
  } catch (error) {
    console.error('AXIOS: Error de inicio de sesión:', error.response?.data || error.message);
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
    console.error('AXIOS: Error de cierre de sesión:', error.response?.data || error.message);
    throw error;
  }
};

export const register = async (userData) => {
  try {
    console.log('AXIOS: Datos de registro:', userData);
    const { email, password } = userData;
    const response = await axiosInstance.post('/auth/register', { email, password });
    console.log('AXIOS: Response de registro:', response.data);
    return response.data;
  } catch (error) {
    console.error('AXIOS: Error de registro:', error.response?.data || error.message);
    throw error.response?.data || error;
  }
};
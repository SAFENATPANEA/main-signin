import axiosInstance from './axiosConfig';

export const login = async (email, password) => {
  try {
    console.log('Enviando petición de login:', { email });
    const response = await axiosInstance.post('/auth/login', { 
      email, 
      password 
    });
    console.log('Respuesta de login:', response.data);
    
    if (!response.data || !response.data.token) {
      throw new Error('Respuesta inválida del servidor: falta el token');
    }
    
    return response.data;
  } catch (error) {
    console.error('Error detallado de login:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });
    
    if (error.response?.status === 401) {
      throw new Error('Credenciales inválidas');
    } else if (error.response?.status === 404) {
      throw new Error('Usuario no encontrado');
    } else if (error.code === 'ERR_NETWORK') {
      throw new Error('Error de conexión al servidor');
    }
    
    throw error.response?.data || error;
  }
};

export const loginWithGoogle = async (accessToken) => {
  try {
    console.log('Enviando petición de login con Google');
    const response = await axiosInstance.post('/auth/google', { token: accessToken });
    console.log('Respuesta de login con Google:', response.data);
    
    if (!response.data || !response.data.token) {
      throw new Error('Respuesta inválida del servidor: falta el token');
    }
    
    return response.data;
  } catch (error) {
    console.error('Error detallado de login con Google:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });
    
    if (error.code === 'ERR_NETWORK') {
      throw new Error('Error de conexión al servidor');
    }
    
    throw error.response?.data || error;
  }
};

export const logout = async () => {
  try {
    console.log('Enviando petición de logout');
    await axiosInstance.post('/auth/logout');
    console.log('Logout exitoso');
    
    // Limpiar el almacenamiento local
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  } catch (error) {
    console.error('Error detallado de logout:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });
    
    // Incluso si hay error, limpiamos el almacenamiento local
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    if (error.code === 'ERR_NETWORK') {
      throw new Error('Error de conexión al servidor');
    }
    
    throw error.response?.data || error;
  }
};

export const register = async (userData) => {
  try {
    console.log('Enviando petición de registro:', userData);
    const response = await axiosInstance.post('/auth/register', userData);
    console.log('Respuesta de registro:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error detallado de registro:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });
    
    if (error.response?.status === 409) {
      throw new Error('El usuario ya existe');
    } else if (error.code === 'ERR_NETWORK') {
      throw new Error('Error de conexión al servidor');
    }
    
    throw error.response?.data || error;
  }
};
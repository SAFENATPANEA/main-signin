import React, { createContext, useContext, useState, useEffect } from 'react';
import { login, logout, register, loginWithGoogle } from '../api/authApi.js';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Recuperar usuario del localStorage al iniciar
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    console.log('Stored user:', storedUser);
    console.log('Stored token:', token);
    
    if (storedUser && token) {
      try {
        const parsedUser = JSON.parse(storedUser);
        console.log('Parsed user:', parsedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error al parsear usuario almacenado:', error);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    }
  }, []);

  // Funciones de autenticación
  const signIn = async (email, password) => {
    try {
      console.log('Iniciando sesión con:', email);
      const response = await login(email, password);
      console.log('Respuesta del servidor:', response);
      
      // Extraer el token y crear objeto de usuario
      const token = response.token?.token;
      if (!token) {
        throw new Error('Token no encontrado en la respuesta');
      }

      // Crear objeto de usuario con la información disponible
      const userData = {
        email,
        token
      };

      // Guardar token y usuario
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      
      console.log('Usuario guardado:', userData);
      setUser(userData);
      
      // Redirigir al usuario
      navigate('/maindash');
      return userData;
    } catch (error) {
      console.error('Error en signIn:', error);
      throw error;
    }
  };

  // Cerrar sesión
  const signOut = async () => {
    try {
      console.log('Cerrando sesión...');
      await logout();
      setUser(null);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      console.log('Sesión cerrada exitosamente');
      navigate('/');
    } catch (error) {
      console.error('Error en signOut:', error);
      // Incluso si hay error en el logout de la API, limpiamos el estado local
      setUser(null);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/');
    }
  };

  // Iniciar sesión con Google
  const signInWithGoogle = async (accessToken) => {
    try {
      console.log('Iniciando sesión con Google...');
      const response = await loginWithGoogle(accessToken);
      
      if (!response.token?.token) {
        throw new Error('Token no encontrado en la respuesta');
      }

      const userData = {
        email: response.user?.email || 'Google User',
        token: response.token.token
      };
      
      // Guardar token y usuario
      localStorage.setItem('token', userData.token);
      localStorage.setItem('user', JSON.stringify(userData));
      
      console.log('Usuario de Google guardado:', userData);
      setUser(userData);
      navigate('/setup');
      return userData;
    } catch (error) {
      console.error('Error en signInWithGoogle:', error);
      throw error;
    }
  };

  // Registrarse
  const signUp = async (userData) => {
    try {
      console.log('Registrando usuario:', userData);
      const response = await register(userData);
      console.log('Respuesta de registro:', response);
      navigate('/');
      return response;
    } catch (error) {
      console.error('Error en signUp:', error);
      throw error;
    }
  };

  const value = {
    user,
    signIn,
    signOut,
    signUp,
    googleSignIn: signInWithGoogle
  };

  console.log('Estado actual del usuario:', user);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para consumir el contexto de autenticación
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

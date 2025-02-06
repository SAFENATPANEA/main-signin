import React, { createContext, useContext, useState, useEffect } from 'react';
import { login, logout, register, loginWithGoogle } from '../api/authApi.js';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Recuperar usuario del localStorage al iniciar
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error al parsear usuario almacenado:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  // Funciones de autenticación
  const signIn = async (email, password) => {
    try {
      const response = await login(email, password);
      console.log('Axios response:', response);
      const userData = response.user;
      
      // Guardar token y usuario
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(userData));
      
      setUser(userData);
      return userData;
    } catch (error) {
      console.error('AXIOS: Error en signIn:', error);
      throw error;
    }
  };

  // Cerrar sesión
  const signOut = async () => {
    try {
      await logout();
      setUser(null);
    } catch (error) {
      console.error('Error en signOut:', error);
    }
  };

  // Iniciar sesión con Google
  const signInWithGoogle = async (accessToken) => {
    try {
      const response = await loginWithGoogle(accessToken);
      const userData = response.user;
      
      // Guardar token y usuario
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(userData));
      
      setUser(userData);
      return userData;
    } catch (error) {
      console.error('Error en signInWithGoogle:', error);
      throw error;
    }
  };

  // Registrarse
  const signUp = async (userData) => {
    try {
      const response = await register(userData);
      return response;
    } catch (error) {
      console.error('Error en signUp:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        signIn, 
        signOut, 
        signUp, 
        googleSignIn: signInWithGoogle 
      }}
    >
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
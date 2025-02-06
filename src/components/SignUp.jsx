import React, { useState } from 'react';
import {
  Box,
  Card,
  Typography,
  TextField,
  Button,
  Alert,
  FormControl,
  FormLabel,
  Link,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import { SitemarkIcon } from './CustomIcons.jsx';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    last_name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signUp } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setStatus({ type: 'error', message: 'El nombre es requerido' });
      return false;
    }
    if (!formData.last_name.trim()) {
      setStatus({ type: 'error', message: 'El apellido es requerido' });
      return false;
    }
    if (!formData.email.trim()) {
      setStatus({ type: 'error', message: 'El correo electrónico es requerido' });
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setStatus({ type: 'error', message: 'Correo electrónico inválido' });
      return false;
    }
    if (formData.password.length < 6) {
      setStatus({ type: 'error', message: 'La contraseña debe tener al menos 6 caracteres' });
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setStatus({ type: 'error', message: 'Las contraseñas no coinciden' });
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const userData = {
        name: formData.name,
        last_name: formData.last_name,
        email: formData.email,
        password: formData.password,
      };

      await signUp(userData);
      setStatus({
        type: 'success',
        message: 'Registro exitoso. Serás redirigido al inicio de sesión.'
      });
      
      setTimeout(() => {
        navigate('/', { replace: true });
      }, 2000);

    } catch (error) {
      setStatus({
        type: 'error',
        message: error.response?.data?.message || 'Error al registrar usuario. Por favor, intenta de nuevo.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
        py: 4,
      }}
    >
      <Card sx={{ p: 4, maxWidth: 500, width: '100%', mx: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
          <SitemarkIcon sx={{ mb: 2 }} />
          <Typography variant="h4" component="h1">
            Crear cuenta
          </Typography>
        </Box>

        {status.message && (
          <Alert severity={status.type} sx={{ mb: 2 }}>
            {status.message}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <FormControl>
            <FormLabel htmlFor="name">Nombre</FormLabel>
            <TextField
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              fullWidth
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="last_name">Apellido</FormLabel>
            <TextField
              id="last_name"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              required
              fullWidth
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="email">Correo electrónico</FormLabel>
            <TextField
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              fullWidth
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="password">Contraseña</FormLabel>
            <TextField
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              fullWidth
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="confirmPassword">Confirmar contraseña</FormLabel>
            <TextField
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              fullWidth
            />
          </FormControl>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            disabled={loading}
            sx={{ mt: 1 }}
          >
            {loading ? 'Procesando...' : 'Registrarse'}
          </Button>

          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Typography variant="body2">
              ¿Ya tienes una cuenta?{' '}
              <Link
                component="button"
                variant="body2"
                onClick={() => navigate('/')}
              >
                Inicia sesión
              </Link>
            </Typography>
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

export default SignUp;

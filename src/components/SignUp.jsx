import React, { useState } from 'react';
import {
  Box,
  Card,
  Typography,
  TextField,
  Button,
  Alert,
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
        minHeight: '90vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
        py: 10,
      }}
    >
      <Card 
        elevation={6}
        sx={{ 
          px: 6,
          py: { xs: 6, sm: 4 }, 
          maxWidth: 500, 
          width: '90%', 
          mx: 2,
          borderRadius: 1,
          transition: 'transform 0.2s ease-in-out',
          '&:hover': {
            transform: 'scale(1.01)',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
          },
          backgroundColor: 'background.paper',
          boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          mb: 3 
        }}>
          <SitemarkIcon sx={{ 
            mb: 2,
            fontSize: '64px',
            color: 'primary.main'
          }} />
          <Typography 
            variant="h5" 
            component="h1"
            sx={{
              fontWeight: 600,
              color: 'primary.main'
            }}
          >
            Crear cuenta
          </Typography>
        </Box>

        {status.message && (
          <Alert 
            severity={status.type} 
            sx={{ 
              mb: 3,
              '& .MuiAlert-message': {
                width: '100%',
                textAlign: 'center'
              }
            }}
          >
            {status.message}
          </Alert>
        )}

        <Box 
          component="form" 
          onSubmit={handleSubmit} 
          sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: 2 
          }}
        >
          <TextField
            label="Nombre"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            fullWidth
            autoFocus
          />

          <TextField
            label="Apellido"
            id="last_name"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            required
            fullWidth
          />

          <TextField
            label="Correo electrónico"
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            fullWidth
            autoComplete="email"
          />

          <TextField
            label="Contraseña"
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
            fullWidth
            autoComplete="new-password"
          />

          <TextField
            label="Confirmar contraseña"
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            fullWidth
            autoComplete="new-password"
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            disabled={loading}
            sx={{ 
              mt: 2,
              py: 1.5,
              textTransform: 'none',
              fontSize: '1rem',
              fontWeight: 500,
              borderRadius: 1.5,
              boxShadow: 2,
              '&:hover': {
                boxShadow: 4,
              },
            }}
          >
            {loading ? 'Procesando...' : 'Registrarse'}
          </Button>

          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Typography 
              variant="body2" 
              sx={{ 
                color: 'text.secondary',
                '& .MuiLink-root': {
                  ml: 0.5,
                  color: 'primary.main',
                  textDecoration: 'none',
                  fontWeight: 500,
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                },
              }}
            >
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

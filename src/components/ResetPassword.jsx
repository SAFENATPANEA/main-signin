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
} from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (password !== confirmPassword) {
      setStatus({
        type: 'error',
        message: 'Las contraseñas no coinciden'
      });
      return;
    }

    if (password.length < 6) {
      setStatus({
        type: 'error',
        message: 'La contraseña debe tener al menos 6 caracteres'
      });
      return;
    }

    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/reset-password-confirm`, {
        token,
        newPassword: password
      });
      
      setStatus({
        type: 'success',
        message: 'Tu contraseña ha sido actualizada exitosamente'
      });
      
      setTimeout(() => {
        navigate('/');
      }, 2000);

    } catch (error) {
      setStatus({
        type: 'error',
        message: error.response?.data?.message || 'Error al restablecer la contraseña. Por favor, intenta de nuevo.'
      });
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
        }}
      >
        <Card sx={{ p: 4, maxWidth: 400, width: '100%' }}>
          <Typography variant="h5" component="h1" gutterBottom>
            Enlace inválido
          </Typography>
          <Typography>
            El enlace para restablecer la contraseña es inválido o ha expirado.
          </Typography>
          <Button
            variant="contained"
            fullWidth
            onClick={() => navigate('/')}
            sx={{ mt: 2 }}
          >
            Volver al inicio
          </Button>
        </Card>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
      }}
    >
      <Card sx={{ p: 4, maxWidth: 400, width: '100%' }}>
        <Typography variant="h5" component="h1" gutterBottom>
          Restablecer contraseña
        </Typography>
        
        {status.message && (
          <Alert severity={status.type} sx={{ mb: 2 }}>
            {status.message}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <FormControl>
            <FormLabel htmlFor="password">Nueva contraseña</FormLabel>
            <TextField
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="confirmPassword">Confirmar contraseña</FormLabel>
            <TextField
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              fullWidth
            />
          </FormControl>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
          >
            {loading ? 'Procesando...' : 'Cambiar contraseña'}
          </Button>
        </Box>
      </Card>
    </Box>
  );
};

export default ResetPassword;

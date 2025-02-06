import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Typography
} from '@mui/material';
import { forgotPassword } from '../api/authApi';

const ForgotPassword = ({ open, handleClose }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setError('Por favor ingresa tu correo electrónico');
      return;
    }

    try {
      setError('');
      setSuccess(false);
      setLoading(true);
      
      await forgotPassword(email);
      setSuccess(true);
      
      // Cerrar el modal después de 3 segundos
      setTimeout(() => {
        handleClose();
        setEmail('');
        setSuccess(false);
      }, 3000);
      
    } catch (error) {
      setError(error.message || 'Error al enviar el correo de recuperación');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEmail('');
    setError('');
    setSuccess(false);
    handleClose();
  };

  return (
    <Dialog 
      open={open} 
      onClose={resetForm}
      sx={{
        '& .MuiDialog-paper': {
          width: '100%',
          maxWidth: '400px',
        }
      }}
    >
      <DialogTitle sx={{
        textAlign: 'center',
        pt: '24px',
        pb: '16px',
      }}>
        Recuperar Contraseña
      </DialogTitle>
      
      <DialogContent sx={{
        px: '24px !important',
        pt: '16px !important',
        pb: '8px !important',
      }}>
        <Typography 
          variant="body2" 
          color="text.secondary" 
          sx={{ 
            mb: 2,
            textAlign: 'center'
          }}
        >
          Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
        </Typography>

        {error && (
          <Alert 
            severity="error" 
            sx={{ 
              mb: 2,
              '& .MuiAlert-message': {
                width: '100%',
                textAlign: 'center'
              }
            }}
          >
            {error}
          </Alert>
        )}
        
        {success && (
          <Alert 
            severity="success" 
            sx={{ 
              mb: 2,
              '& .MuiAlert-message': {
                width: '100%',
                textAlign: 'center'
              }
            }}
          >
            Se ha enviado un enlace de recuperación a tu correo electrónico
          </Alert>
        )}
        
        <TextField
          autoFocus
          required
          fullWidth
          id="email"
          name="email"
          label="Correo Electrónico"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="none"
          autoComplete="email"
          disabled={loading || success}
          sx={{ mt: 1 }}
        />
      </DialogContent>
      
      <DialogActions sx={{ 
        px: 3,
        py: 2,
        justifyContent: 'space-between'
      }}>
        <Button 
          onClick={resetForm}
          disabled={loading}
          sx={{
            minWidth: '100px',
            textTransform: 'none',
            '&:hover': {
              backgroundColor: 'transparent',
            },
          }}
        >
          Cerrar
        </Button>
        <Button 
          variant="contained" 
          onClick={handleSubmit}
          disabled={loading || success}
          sx={{
            minWidth: '120px',
            textTransform: 'none',
            '&:hover': {
              backgroundColor: 'primary.dark',
            },
          }}
        >
          {loading ? <CircularProgress size={24} /> : 'Enviar'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ForgotPassword;
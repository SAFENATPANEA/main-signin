import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import axios from 'axios';

export default function ForgotPassword({ open, handleClose }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/reset-password-request`, {
        email
      });
      
      setStatus({
        type: 'success',
        message: 'Si el correo existe en nuestra base de datos, recibirás un enlace para restablecer tu contraseña.'
      });
      
      setTimeout(() => {
        handleClose();
        setEmail('');
        setStatus({ type: '', message: '' });
      }, 3000);

    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Hubo un error al procesar tu solicitud. Por favor, intenta de nuevo.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: 'form',
        onSubmit: handleSubmit,
        sx: { 
          backgroundImage: 'none',
          borderRadius: 1,
          minWidth: { xs: '90%', sm: '400px' },
          maxWidth: '450px',
          transition: 'transform 0.2s ease-in-out',
          '&:hover': {
            transform: 'scale(1.01)',
          },
          overflow: 'hidden',
        },
      }}
      TransitionProps={{
        timeout: 200,
      }}
      scroll="paper"
      sx={{
        '& .MuiDialog-container': {
          overflow: 'hidden',
        },
      }}
    >
      <DialogTitle sx={{
        pb: 0,
        pt: 2.5,
        px: 3,
        typography: 'h5',
        fontWeight: 600,
        textAlign: 'center',
        color: 'primary.main'
      }}>
        Restablecer contraseña
      </DialogTitle>
      <DialogContent sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        width: '90%',
        px: 3,
        pt: '16px !important',
        pb: '8px !important',
      }}>
        <DialogContentText sx={{
          textAlign: 'center',
          color: 'text.secondary',
          fontSize: '0.95rem',
          mb: 2
        }}>
          Ingresa tu dirección de correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
        </DialogContentText>
        {status.message && (
          <Alert 
            severity={status.type} 
            sx={{ 
              mb: 2,
              '& .MuiAlert-message': {
                width: '100%',
                textAlign: 'center'
              }
            }}
          >
            {status.message}
          </Alert>
        )}
        <TextField
          autoFocus
          required
          fullWidth
          id="email"
          label="Correo Electrónico"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="none"
          autoComplete="email"
          sx={{ mb: 1 }}
        />
      </DialogContent>
      <DialogActions sx={{ 
        pb: 3, 
        px: 3,
        gap: 1,
        justifyContent: 'center'
      }}>
        <Button 
          onClick={handleClose} 
          disabled={loading}
          sx={{
            minWidth: '120px',
            textTransform: 'none',
            fontSize: '0.95rem',
            borderRadius: 1.5,
            py: 1,
          }}
        >
          Cancelar
        </Button>
        <Button 
          variant="contained" 
          type="submit"
          disabled={loading}
          sx={{
            minWidth: '120px',
            textTransform: 'none',
            fontSize: '0.95rem',
            borderRadius: 1.5,
            py: 1,
            boxShadow: 2,
            '&:hover': {
              boxShadow: 4,
            },
          }}
        >
          {loading ? 'Enviando...' : 'Continuar'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
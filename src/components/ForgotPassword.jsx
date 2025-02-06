import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import OutlinedInput from '@mui/material/OutlinedInput';
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
        sx: { backgroundImage: 'none' },
      }}
    >
      <DialogTitle>Restablecer contraseña</DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
        <DialogContentText>
          Ingresa tu dirección de correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
        </DialogContentText>
        {status.message && (
          <Alert severity={status.type} sx={{ mt: 1 }}>
            {status.message}
          </Alert>
        )}
        <OutlinedInput
          autoFocus
          required
          margin="dense"
          id="email"
          name="email"
          placeholder="Correo electrónico"
          type="email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </DialogContent>
      <DialogActions sx={{ pb: 3, px: 3 }}>
        <Button onClick={handleClose} disabled={loading}>
          Cancelar
        </Button>
        <Button 
          variant="contained" 
          type="submit"
          disabled={loading}
        >
          {loading ? 'Enviando...' : 'Continuar'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
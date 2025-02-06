import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography } from '@mui/material';

const Setup = () => {
  const [initialCash, setInitialCash] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!initialCash || isNaN(initialCash)) {
      setError('Por favor, ingresa un valor válido para el efectivo inicial.');
      return;
    }
    navigate('/transactions'); // Redirige al panel de transacciones
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        maxWidth: 400,
        margin: 'auto',
        padding: 4,
      }}
    >
      <Typography variant="h4" align="center">
        Configuración Inicial
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <TextField
        label="Efectivo Inicial"
        type="number"
        value={initialCash}
        onChange={(e) => setInitialCash(e.target.value)}
        required
      />
      <Button type="submit" variant="contained" color="primary">
        Confirmar
      </Button>
    </Box>
  );
};

export default Setup;
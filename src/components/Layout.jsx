import React from 'react';
import { Box, Container } from '@mui/material';
import Navigation from './Navigation.jsx';
import { useAuth } from '../contexts/AuthContext.jsx';

const Layout = ({ children }) => {
  const { user } = useAuth();

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Navigation />
      <Box
        component="main"
        sx={{
          pt: user ? 10 : 0, // Añade padding top solo si hay usuario (barra de navegación visible)
          minHeight: '100vh',
        }}
      >
        <Container maxWidth="lg">
          {children}
        </Container>
      </Box>
    </Box>
  );
};

export default Layout;

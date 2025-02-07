import React from 'react';
import { Box, Container } from '@mui/material';
import Navigation from './Navigation.jsx';
import { useAuth } from '../../contexts/AuthContext.jsx';

const Layout = ({ children }) => {
  const { user } = useAuth();
  
  console.log('Layout - Estado del usuario:', user);

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column',
      minHeight: '100vh', 
      bgcolor: 'background.default' 
    }}>
      <Navigation />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: user ? 10 : 0,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Container 
          maxWidth="lg" 
          sx={{ 
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {children}
        </Container>
      </Box>
    </Box>
  );
};

export default Layout;

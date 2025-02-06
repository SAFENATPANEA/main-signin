import React from 'react';
import { 
  AppBar, 
  Box, 
  Button, 
  Toolbar, 
  Typography,
  useTheme
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext.jsx';
import fornavw from '../assets/fornavw.png';
import { styled } from '@mui/material/styles';

// Componentes estilizados
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: '#618c35',
  boxShadow: '0px 1px 10px rgba(0, 0, 0, 0.1)',
}));

const LogoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  flexGrow: 1,
  '& img': {
    height: '40px',
    marginRight: theme.spacing(2),
    transition: 'transform 0.3s ease',
    '&:hover': {
      transform: 'scale(1.05)',
    },
  },
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  padding: theme.spacing(1, 3),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(1, 5),
  },
}));

const BrandText = styled(Typography)(({ theme }) => ({
  color: '#ffffff',
  fontWeight: 600,
  letterSpacing: '0.5px',
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.1rem',
  },
}));

const LogoutButton = styled(Button)(({ theme }) => ({
  color: '#ffffff',
  borderColor: '#ffffff',
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(1, 3),
  fontWeight: 600,
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderColor: '#ffffff',
  },
  transition: 'all 0.3s ease',
}));

const Navigation = () => {
  const { signOut } = useAuth();
  const theme = useTheme();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <StyledAppBar position="static">
        <StyledToolbar>
          <LogoContainer>
            <img 
              src={fornavw}
              alt="MegaSeller POS"
            />
            <BrandText variant="h6">
              MegaSeller POS
            </BrandText>
          </LogoContainer>
          <LogoutButton 
            onClick={signOut}
            variant="outlined"
          >
            Cerrar Sesión
          </LogoutButton>
        </StyledToolbar>
      </StyledAppBar>
    </Box>
  );
};

export default Navigation;

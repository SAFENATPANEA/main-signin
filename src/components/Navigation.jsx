import React from 'react';
import { 
  AppBar, 
  Box, 
  Button, 
  Toolbar, 
  Typography,
  useTheme,
  IconButton,
  Container,
  useScrollTrigger,
  Menu,
  MenuItem,
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext.jsx';
import fornavw from '../assets/fornavw.png';
import { styled } from '@mui/material/styles';
import { Menu as MenuIcon, AccountCircle } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

// Función para el efecto de elevación al scroll
function ElevationScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

// Componentes estilizados
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: 'linear-gradient(90deg, #618c35 0%, #7baf44 100%)',
  backdropFilter: 'blur(10px)',
  transition: 'all 0.3s ease-in-out',
  '&.MuiPaper-elevation4': {
    boxShadow: '0 4px 20px 0 rgba(0,0,0,0.1)',
  },
}));

const LogoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  borderRadius: theme.shape.borderRadius,
  flexGrow: 1,
  gap: theme.spacing(2),
  '& img': {
    height: '40px',
    transition: 'transform 0.3s ease',
    '&:hover': {
      transform: 'scale(1.05)',
    },
  },
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: 70,
  padding: theme.spacing(0, 3),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(0, 5),
  },
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
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
  borderColor: 'rgba(255, 255, 255, 0.5)',
  borderRadius: '50px',
  padding: theme.spacing(0.8, 3),
  fontWeight: 600,
  textTransform: 'none',
  fontSize: '0.95rem',
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(5px)',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderColor: '#ffffff',
    transform: 'translateY(-1px)',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  },
  '&:active': {
    transform: 'translateY(0)',
  },
  transition: 'all 0.2s ease-in-out',
}));

const MenuButton = styled(IconButton)(({ theme }) => ({
  display: 'none',
  color: '#ffffff',
  marginRight: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    display: 'flex',
  },
}));

const Navigation = (props) => {
  const { signOut, user } = useAuth();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  console.log('Navigation - Estado del usuario:', user);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      console.log('Navigation - Iniciando logout');
      await signOut();
      handleClose();
      console.log('Navigation - Logout completado');
    } catch (error) {
      console.error('Navigation - Error al cerrar sesión:', error);
    }
  };

  // Solo renderiza la barra de navegación si hay un usuario autenticado
  if (!user || !user.token) {
    console.log('Navigation - No hay usuario autenticado');
    return null;
  }

  console.log('Navigation - Renderizando barra de navegación');
  return (
    <ElevationScroll {...props}>
      <StyledAppBar>
        <Container maxWidth="xl">
          <StyledToolbar>
            <MenuButton
              edge="start"
              aria-label="menu"
              onClick={handleClick}
              sx={{ display: { xs: 'flex', sm: 'none' } }}
            >
              <AccountCircle />
            </MenuButton>
            
            <LogoContainer>
              <img 
                src={fornavw}
                alt="MegaSeller POS"
              />
              <BrandText variant="h6" noWrap>
                MegaSeller POS
              </BrandText>
            </LogoContainer>
            
            <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', gap: 2 }}>
              <IconButton
                onClick={handleClick}
                sx={{ color: 'white' }}
              >
                <AccountCircle />
              </IconButton>
              <LogoutButton
                variant="outlined"
                onClick={handleLogout}
              >
                Cerrar Sesión
              </LogoutButton>
            </Box>
            
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  mt: 1.5,
                },
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <MenuItem onClick={handleClose} disabled>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {user.email}
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleClose}>Perfil</MenuItem>
              <MenuItem onClick={handleClose}>Mi Cuenta</MenuItem>
              <MenuItem onClick={handleLogout}>Cerrar Sesión</MenuItem>
            </Menu>
          </StyledToolbar>
        </Container>
      </StyledAppBar>
    </ElevationScroll>
  );
};

export default Navigation;

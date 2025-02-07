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
import { useAuth } from '../../contexts/AuthContext.jsx';
import fornavw from '../../assets/fornavw.png';
import { styled } from '@mui/material/styles';
import { Menu as MenuIcon, AccountCircle } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import SideMenuIcon from "@mui/icons-material/Menu"
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



const Navigation = ({ toggleSidebar, toggleDarkMode, sidebarOpen }) => {
  const { signOut, user } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

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

  if (!user || !user.token) {
    console.log('Navigation - No hay usuario autenticado');
    return null;
  }

  console.log('Navigation - Renderizando barra de navegación');
  return (
    <StyledAppBar>
        <Container maxWidth="xl">
          <StyledToolbar>
          <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={toggleSidebar}
          sx={{ marginRight: 2 }}
        >
          <MenuIcon />
        </IconButton>
            <LogoContainer>
              <img 
                src={fornavw}
                alt="MegaSeller POS"
              />
              <BrandText variant="h6" noWrap>
                MegaSeller POS
              </BrandText>
            </LogoContainer>
            
            <Box sx={{ 
              display: { xs: 'none', sm: 'flex' }, 
              alignItems: 'center', 
              gap: 2,
              ml: 'auto'
            }}>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 1,
                cursor: 'pointer'
              }} onClick={handleClick}>
                <IconButton sx={{ color: 'white', p: 0 }}>
                  <AccountCircle sx={{ fontSize: '2.2rem' }} />
                </IconButton>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    color: 'white',
                    display: { xs: 'none', md: 'block' }
                  }}
                >
                  {user.email}
                </Typography>
              </Box>
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
              <MenuItem onClick={handleClose}>Perfil</MenuItem>
              <MenuItem onClick={handleClose}>Mi Cuenta</MenuItem>
              <MenuItem onClick={handleLogout}>Cerrar Sesión</MenuItem>
            </Menu>
          </StyledToolbar>
        </Container>
      </StyledAppBar>
  );
};

export default Navigation;

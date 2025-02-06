import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#618c35', // Verde Oscuro 1
      light: '#87a668', // Verde Claro
      dark: '#4a6b29', // Versión más oscura del verde principal
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#87a668', // Verde Claro
      light: '#a8bf91',
      dark: '#618c35',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#F2F2F2', // Gris Claro
      paper: '#FFFFFF',
    },
    text: {
      primary: '#333333', // Gris Oscuro 1
      secondary: '#666666', // Gris Oscuro 2
    },
    card: {
      background: '#D0D9C7', // Verde Suave
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0px 2px 4px rgba(97, 140, 53, 0.2)',
          },
        },
        outlined: {
          borderColor: '#618c35',
          '&:hover': {
            backgroundColor: 'rgba(97, 140, 53, 0.04)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#87a668',
            },
            '&:hover fieldset': {
              borderColor: '#618c35',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#618c35',
            },
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#D0D9C7',
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
          borderRadius: 12,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#618c35',
        },
      },
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      color: '#333333',
      fontWeight: 700,
    },
    h2: {
      color: '#333333',
      fontWeight: 600,
    },
    h3: {
      color: '#333333',
      fontWeight: 600,
    },
    h4: {
      color: '#333333',
      fontWeight: 600,
    },
    h5: {
      color: '#333333',
      fontWeight: 600,
    },
    h6: {
      color: '#333333',
      fontWeight: 600,
    },
    body1: {
      color: '#333333',
    },
    body2: {
      color: '#666666',
    },
  },
  shape: {
    borderRadius: 8,
  },
});

export default theme;

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext.jsx';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Divider,
  Alert,
  Stack,
  CircularProgress,
} from '@mui/material';
import { Google as GoogleIcon, Facebook as FacebookIcon } from '@mui/icons-material';
import forpage from './assets/forpage.png';
import ForgotPassword from './components/ForgotPassword.jsx';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const { signIn, googleSignIn, facebookSignIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setError('');
    setLoading(true);

    try {
      console.log('Intentando iniciar sesión con:', email);
      await signIn(email, password);
      console.log('Inicio de sesión exitoso');
    } catch (error) {
      console.error('Error en handleSubmit:', error);
      setError(error.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    if (loading) return;

    setError('');
    setLoading(true);

    try {
      console.log('Intentando iniciar sesión con Google');
      await googleSignIn();
      console.log('Inicio de sesión con Google exitoso');
    } catch (error) {
      console.error('Error en handleGoogleSignIn:', error);
      setError(error.message || 'Error al iniciar sesión con Google');
    } finally {
      setLoading(false);
    }
  };

  const handleFacebookSignIn = async () => {
    if (loading) return;

    setError('');
    setLoading(true);

    try {
      console.log('Intentando iniciar sesión con Facebook');
      await facebookSignIn();
      console.log('Inicio de sesión con Facebook exitoso');
    } catch (error) {
      console.error('Error en handleFacebookSignIn:', error);
      setError(error.message || 'Error al iniciar sesión con Facebook');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <img
          src={forpage}
          alt="MegaSeller POS"
          style={{ height: '90px', marginBottom: '16px' }}
        />
        <Typography component="h2" variant="h5">
          Iniciar Sesión
        </Typography>

        <Paper
          elevation={4}
          sx={{
            padding: 4,
            marginTop: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            transition: 'transform 0.2s ease-in-out',
            '&:hover': {
              transform: 'scale(1.01)',
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
            },
          }}
        >
          {error && (
            <Alert severity="error" sx={{ mb: 2, width: '100%' }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Correo Electrónico"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Iniciar Sesión'}
            </Button>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%', mb: 2 }}>
              <Button
                onClick={() => setForgotPasswordOpen(true)}
                sx={{ textTransform: 'none' }}
                disabled={loading}
              >
                ¿Olvidaste tu contraseña?
              </Button>
            </Box>

            <Divider sx={{ my: 2 }}>o continuar con</Divider>

            <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<GoogleIcon />}
                onClick={handleGoogleSignIn}
                disabled={loading}
              >
                Google
              </Button>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<FacebookIcon />}
                onClick={handleFacebookSignIn}
                sx={{ backgroundColor: '#1877F2', color: 'white', '&:hover': { backgroundColor: '#1665D8' } }}
                disabled={loading}
              >
                Facebook
              </Button>
            </Stack>

            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Typography variant="body2">
                ¿No tienes una cuenta?{' '}
                <Link to="/register" style={{ textDecoration: 'none', color: 'primary.main' }}>
                  Regístrate aquí
                </Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
      <ForgotPassword
        open={forgotPasswordOpen}
        handleClose={() => setForgotPasswordOpen(false)}
      />
    </Container>
  );
};

export default SignIn;
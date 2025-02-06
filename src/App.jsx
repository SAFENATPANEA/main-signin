import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import ForgotPassword from './components/ForgotPassword.jsx';
import AppTheme from './theme/AppTheme.jsx';
import ColorModeSelect from './theme/ColorModeSelect.jsx';
import { GoogleIcon, FacebookIcon, SitemarkIcon } from './components/CustomIcons.jsx';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import SignIn from './SignIn.jsx';
import Setup from './SetUp.jsx';
import Transactions from './Transactions.jsx'; 
import ResetPassword from './components/ResetPassword.jsx'; 
import SignUp from './components/SignUp.jsx';
import Layout from './components/Layout.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';
import { useAuth } from './contexts/AuthContext.jsx';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme/theme.js';

// Componente para proteger rutas
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/" replace />;
  }
  return children;
};

// Componente para redireccionar si ya está autenticado
const PublicRoute = ({ children }) => {
  const { user } = useAuth();
  
  if (user) {
    return <Navigate to="/setup" replace />;
  }
  return children;
};


const App = () => {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <Router>
            <Layout>
              <Routes>
                <Route
                  path="/"
                  element={
                    <PublicRoute>
                      <SignIn />
                    </PublicRoute>
                  }
                />
                <Route
                  path="/register"
                  element={
                    <PublicRoute>
                      <SignUp />
                    </PublicRoute>
                  }
                />
                <Route
                  path="/setup"
                  element={
                    <ProtectedRoute>
                      <Setup />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/transactions"
                  element={
                    <ProtectedRoute>
                      <Transactions />
                    </ProtectedRoute>
                  }
                />
                <Route path="/forgot-password" element={<ResetPassword />} />
                <Route
                  path="/material-ui/getting-started/templates/sign-in/"
                  element={
                    <PublicRoute>
                      <SignIn />
                    </PublicRoute>
                  }
                />
              </Routes>
            </Layout>
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </GoogleOAuthProvider>
  );
};

export default App;
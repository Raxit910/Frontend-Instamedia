import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { ThemeProvider } from '@mui/material/styles';
import muiTheme from './theme/muiTheme.js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/AuthContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={muiTheme}>
      <AuthProvider>
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
        <App />
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);

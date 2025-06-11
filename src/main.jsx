import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { ThemeProvider } from '@mui/material/styles';
import muiTheme from './theme/muiTheme.js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={muiTheme}>
      <ToastContainer position="top-right" autoClose={1200} hideProgressBar />
      <App />
    </ThemeProvider>
  </StrictMode>
);

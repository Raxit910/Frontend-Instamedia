import { createTheme } from '@mui/material/styles';

const muiTheme = createTheme({
  palette: {
    primary: {
      main: '#3b82f6', // Tailwind blue-500
    },
    secondary: {
      main: '#f59e0b', // Tailwind amber-500
    },
  },
  typography: {
    fontFamily: `'Inter', 'Roboto', 'Arial', sans-serif`,
  },
});

export default muiTheme;

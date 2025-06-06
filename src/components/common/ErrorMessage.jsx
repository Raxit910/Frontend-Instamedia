import { Alert, AlertTitle } from '@mui/material';

const ErrorMessage = ({ title = 'Error', message, severity = 'error', sx = {} }) => {
  return (
    <Alert severity={severity} sx={{ mb: 2, ...sx }}>
      {title && <AlertTitle>{title}</AlertTitle>}
      {message}
    </Alert>
  );
};

export default ErrorMessage;

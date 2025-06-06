import { Box, Typography, Card, CardContent } from '@mui/material';

const Messages = () => {
  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Messages
      </Typography>
      <Card>
        <CardContent>
          <Typography color="text.secondary">
            Messages functionality will be implemented here.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Messages;

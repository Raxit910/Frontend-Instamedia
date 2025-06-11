import { Box, Typography, Card, CardContent } from '@mui/material';

const Messages = () => {
  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Messages
      </Typography>
      <Card>
        <CardContent>
          <Typography color="text.secondary">Messages functionality is coming soon!</Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Messages;

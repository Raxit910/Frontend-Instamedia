import { Box, Typography, Card, CardContent } from '@mui/material';

const SavedPosts = () => {
  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Saved Posts
      </Typography>
      <Card>
        <CardContent>
          <Typography color="text.secondary">
            Saved posts functionality will be implemented here.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SavedPosts;

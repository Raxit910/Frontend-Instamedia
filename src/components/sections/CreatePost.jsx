import { Box, Typography, Card, CardContent } from '@mui/material';

const CreatePost = () => {
  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Create Post
      </Typography>
      <Card>
        <CardContent>
          <Typography color="text.secondary">
            Create post functionality will be implemented here.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CreatePost;

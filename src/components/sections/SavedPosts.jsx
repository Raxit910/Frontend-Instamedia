import { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, Card, Container } from '@mui/material';
import PostCard from '../../components/posts/PostCard';
import { savedPostApi } from '../../api/savedPostApi';
import { showError } from '../../utils/toast';

const SavedPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSavedPosts = async () => {
    try {
      const res = await savedPostApi.getSavedPosts();
      console.log(res);
      setPosts(res.data.posts);
    } catch {
      showError('Failed to fetch saved posts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSavedPosts();
  }, []);

  return (
    <Box sx={{ mx: 'auto' }}>
      <Typography variant="h5" gutterBottom sx={{ mb: 3, fontWeight: 600 }}>
        Saved Posts
      </Typography>

      <Card sx={{ mb: 3, boxShadow: 2 }}>
        <Container>
          <Box maxWidth="600px" mx="auto" mt={3}>
            {loading ? (
              <CircularProgress />
            ) : posts.length === 0 ? (
              <Typography color="text.secondary" textAlign="center" mb={2}>
                No saved posts found.
              </Typography>
            ) : (
              posts.map((post) => <PostCard key={post.id} post={post} />)
            )}
          </Box>
        </Container>
      </Card>
    </Box>
  );
};

export default SavedPosts;

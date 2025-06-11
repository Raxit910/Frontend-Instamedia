import { Box, CircularProgress, Typography, Card, CardContent } from '@mui/material';
import PostCard from '../posts/PostCard';
import { useInfiniteScrollPosts } from '../../hooks/useInfiniteScrollPosts';

const PostFeed = () => {
  const { posts, loading, hasMore, loaderRef } = useInfiniteScrollPosts();

  return (
    <Box sx={{ mx: 'auto' }}>
      <Typography variant="h5" gutterBottom sx={{ mb: 3, fontWeight: 600 }}>
        Home Feed
      </Typography>

      <Card sx={{ mb: 3, boxShadow: 2 }}>
        <CardContent>
          <Box maxWidth="600px" mx="auto" mt={3}>
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}

            {/* Loader / End message */}
            <Box ref={loaderRef} textAlign="center" mt={2}>
              {loading && <CircularProgress />}
              {!hasMore && <Typography variant="body2">You're all caught up!</Typography>}
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default PostFeed;

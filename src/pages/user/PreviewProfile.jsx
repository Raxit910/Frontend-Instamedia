import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Avatar, Typography, Button, Box, CircularProgress, Divider, Grid } from '@mui/material';
import { userApi } from '../../api/userApi';
import { showSuccess, showError } from '../../utils/toast';
import Header from '../../components/layout/Header';
import FollowersModal from '../../components/profile/FollowersModal';
import { PersonAdd, PersonRemove } from '@mui/icons-material';
import UserPosts from '../../components/profile/UserPosts';
import { postApi } from '../../api/postApi';

const PreviewProfile = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [followersModalOpen, setFollowersModalOpen] = useState(false);
  const [followingModalOpen, setFollowingModalOpen] = useState(false);
  const [isTogglingFollow, setIsTogglingFollow] = useState(false);
  const navigate = useNavigate();

  const fetchProfile = async () => {
    setLoading(true);
    setUser(null);
    setPosts([]);
    try {
      const res = await userApi.getUserPreview(username);
      setUser(res.data.user);

      // Fetch posts only if profile exists and was successfully fetched
      try {
        const resPosts = await postApi.getPostByUsername(username);
        setPosts(resPosts.data.posts);
      } catch (postErr) {
        console.error('Failed to load posts:', postErr);
        showError('Failed to load posts');
        setPosts([]);
      }
    } catch (err) {
      if (err.response && err.response.status === 404) {
        console.log(`Profile for ${username} not found. Redirecting to 404.`);
        navigate('/404', { replace: true }); // Redirect to 404 page
      } else {
        // Handle other errors (e.g., network issues, server errors)
        console.log(err.response?.data?.message || 'Failed to fetch profile');
        showError('Failed to load user profile. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [username, navigate]);

  const handleToggleFollow = async () => {
    setIsTogglingFollow(true);
    try {
      const response = await userApi.toggleFollow(user.id);

      if (response.data.success) {
        setUser((prev) => ({
          ...prev,
          isFollowing: response.data.isFollowing,
          followingCount: response.data.isFollowing
            ? prev.followingCount + 1
            : prev.followingCount - 1,
        }));

        showSuccess(response.data.message);
      } else {
        showError(response.data.message || 'Failed to toggle follow');
      }
    } catch (err) {
      console.error('Follow toggle error:', err);
      showError(err.response?.data?.message || 'An error occurred');
    } finally {
      setIsTogglingFollow(false);
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (!user) {
    return <Typography>User not found</Typography>;
  }

  return (
    <>
      <Header /> {/* always show header on profile page */}
      <Box
        p={2}
        maxWidth="md"
        margin="auto"
        sx={{
          paddingTop: '64px',
          minHeight: '100vh',
          backgroundColor: 'background.paper',
        }}
      >
        <Box sx={{ marginTop: '10px', display: 'flex', justifyContent: 'flex-start' }}>
          <Typography variant="h5" fontWeight="bold" mb={3}>
            User Profile
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4} display="flex" flexDirection="column" alignItems="center">
              <Avatar src={user.avatarUrl} sx={{ width: 120, height: 120, mb: 2 }} />
              <Button
                variant={user.isFollowing ? 'outlined' : 'contained'}
                color={user.isFollowing ? 'inherit' : 'primary'}
                startIcon={
                  isTogglingFollow ? (
                    <CircularProgress size={16} />
                  ) : user.isFollowing ? (
                    <PersonRemove />
                  ) : (
                    <PersonAdd />
                  )
                }
                onClick={handleToggleFollow}
                disabled={isTogglingFollow}
                fullWidth
              >
                {user.isFollowing ? 'Following' : 'Follow'}
              </Button>
            </Grid>

            <Grid item xs={12} md={8}>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                {user.username}
              </Typography>

              <Typography variant="body1" color="text.secondary" paragraph>
                {user.bio || 'No bio available'}
              </Typography>

              <Box display="flex" gap={4} mb={2}>
                <Button
                  variant="text"
                  onClick={() => setFollowersModalOpen(true)}
                  sx={{ flexDirection: 'column', minWidth: 'auto' }}
                >
                  <Typography variant="h6" fontWeight="bold">
                    {user.followingCount ?? 0}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Followers
                  </Typography>
                </Button>

                <Button
                  variant="text"
                  onClick={() => setFollowingModalOpen(true)}
                  sx={{ flexDirection: 'column', minWidth: 'auto' }}
                >
                  <Typography variant="h6" fontWeight="bold">
                    {user.followersCount ?? 0}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Following
                  </Typography>
                </Button>

                <Button sx={{ flexDirection: 'column', display: 'flex', alignItems: 'center' }}>
                  <Typography variant="h6" fontWeight="bold">
                    {user.postCount ?? 0}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Posts
                  </Typography>
                </Button>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Typography variant="body2" color="text.secondary">
                Joined {new Date(user.createdAt).toLocaleDateString()}
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <Box mt={4}>
          <UserPosts posts={posts} />
        </Box>
      </Box>
      <FollowersModal
        open={followersModalOpen}
        onClose={() => setFollowersModalOpen(false)}
        userId={user.id}
        type="followers"
      />
      <FollowersModal
        open={followingModalOpen}
        onClose={() => setFollowingModalOpen(false)}
        userId={user.id}
        type="following"
      />
    </>
  );
};

export default PreviewProfile;

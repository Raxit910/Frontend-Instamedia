import { useState } from 'react';
import { Avatar, Typography, Button, Box, Divider, Grid } from '@mui/material';
import { LuPencil, LuUserPlus } from 'react-icons/lu';
import EditProfileModal from '../../components/profile/EditProfileModal';
import FollowersModal from '../../components/profile/FollowersModal';
import { useUserProfile } from '../../hooks/useUserProfile';
import { useAuth } from '../../hooks/useAuth';
import { useParams } from 'react-router-dom';
import Header from '../../components/layout/Header';
import UserPosts from '../../components/profile/UserPosts';

const UserProfilePage = () => {
  const { username } = useParams();
  const { user } = useAuth();
  const { profile, posts, loading, toggleFollow } = useUserProfile(username);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [followersModalOpen, setFollowersModalOpen] = useState(false);
  const [followingModalOpen, setFollowingModalOpen] = useState(false);

  if (loading) {
    return (
      <>
        <Header /> {/* show header while loading */}
        <Box display="flex" justifyContent="center" p={4}>
          <Typography>Loading...</Typography>
        </Box>
      </>
    );
  }

  if (!profile) {
    return (
      <>
        <Header />
        <Typography>User not found.</Typography>
      </>
    );
  }

  const isOwnProfile = user?.id === profile.id;

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
            Your Profile
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4} display="flex" flexDirection="column" alignItems="center">
              <Avatar src={profile.avatarUrl} sx={{ width: 120, height: 120, mb: 2 }} />
              {isOwnProfile ? (
                <Button
                  variant="outlined"
                  startIcon={<LuPencil size={16} />}
                  onClick={() => setEditModalOpen(true)}
                  fullWidth
                >
                  Edit Profile
                </Button>
              ) : (
                <Button
                  variant={profile.isFollowing ? 'outlined' : 'contained'}
                  startIcon={<LuUserPlus size={16} />}
                  onClick={toggleFollow}
                  fullWidth
                  color={profile.isFollowing ? 'inherit' : 'primary'}
                >
                  {profile.isFollowing ? 'Following' : 'Follow'}
                </Button>
              )}
            </Grid>

            <Grid item xs={12} md={8}>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                {profile.username}
              </Typography>

              <Typography variant="body1" color="text.secondary" paragraph>
                {profile.bio || 'No bio available'}
              </Typography>

              <Box display="flex" gap={4} mb={2}>
                <Button
                  variant="text"
                  onClick={() => setFollowersModalOpen(true)}
                  sx={{ flexDirection: 'column', minWidth: 'auto' }}
                >
                  <Typography variant="h6" fontWeight="bold">
                    {profile._count.following}
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
                    {profile._count.followers}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Following
                  </Typography>
                </Button>

                <Button sx={{ flexDirection: 'column', display: 'flex', alignItems: 'center' }}>
                  <Typography variant="h6" fontWeight="bold">
                    {profile._count.posts}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Posts
                  </Typography>
                </Button>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Typography variant="body2" color="text.secondary">
                Joined {new Date(profile.createdAt).toLocaleDateString()}
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <Box mt={4}>
          <UserPosts posts={posts} isOwnProfile={isOwnProfile} />
        </Box>
      </Box>
      {/* Modals */}
      <EditProfileModal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        profile={profile}
      />
      <FollowersModal
        open={followersModalOpen}
        onClose={() => setFollowersModalOpen(false)}
        userId={profile.id}
        type="followers"
      />
      <FollowersModal
        open={followingModalOpen}
        onClose={() => setFollowingModalOpen(false)}
        userId={profile.id}
        type="following"
      />
    </>
  );
};

export default UserProfilePage;

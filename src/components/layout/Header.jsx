import { useAuth } from '../../hooks/useAuth';
import { AppBar, Toolbar, Typography, Avatar, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogoClick = () => {
    if (user) {
      navigate('/dashboard');
    }
  };

  const handleProfileClick = () => {
    if (user?.username) {
      navigate(`/profile/${user.username}`);
    }
  };

  return (
    <AppBar position="fixed" sx={{ zIndex: 1300, bgcolor: 'primary.main' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Button onClick={handleLogoClick}>
          <Typography variant="h5" component="div" fontWeight="bold" sx={{ color: 'white' }}>
            Instamedia
          </Typography>
        </Button>

        <Box display="flex" alignItems="center" gap={2}>
          <Button
            onClick={handleProfileClick}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              color: 'white',
              textTransform: 'none',
            }}
          >
            <Avatar src={user?.avatarUrl} sx={{ width: 32, height: 32 }} />
            <Typography variant="body1">{user?.username}</Typography>
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

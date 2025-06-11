import React from 'react';
import {
  Card,
  CardContent,
  Avatar,
  Typography,
  Box,
  Button,
  CircularProgress,
} from '@mui/material';
import { PersonAdd, PersonRemove } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const UserCard = ({ user, isFollowing, isLoading, onToggleFollow }) => {
  const navigate = useNavigate();

  const handleUserClick = (username) => {
    navigate(`/preview-profile/${username}`);
  };

  return (
    <Card
      sx={{
        height: '100%',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: 4,
        },
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <Button onClick={() => handleUserClick(user.username)}>
            <Avatar
              src={user.avatarUrl}
              alt={user.username}
              sx={{
                width: 64,
                height: 64,
                border: '3px solid',
                borderColor: 'primary.main',
                fontSize: '1.5rem',
              }}
            >
              {user.username?.charAt(0).toUpperCase()}
            </Avatar>
          </Button>
          <Box sx={{ textAlign: 'center', flex: 1 }}>
            <Typography variant="h6" component="h3" sx={{ fontWeight: 600, mb: 0.5 }}>
              {user.username}
            </Typography>

            {user.bio && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  mb: 1,
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  lineHeight: 1.4,
                }}
              >
                {user.bio}
              </Typography>
            )}
          </Box>

          <Button
            variant={isFollowing ? 'outlined' : 'contained'}
            color={isFollowing ? 'inherit' : 'primary'}
            startIcon={
              isLoading ? (
                <CircularProgress size={16} />
              ) : isFollowing ? (
                <PersonRemove />
              ) : (
                <PersonAdd />
              )
            }
            onClick={onToggleFollow}
            disabled={isLoading}
            sx={{
              minWidth: 110,
              textTransform: 'none',
              fontWeight: 600,
            }}
          >
            {isLoading ? 'Loading...' : isFollowing ? 'Unfollow' : 'Follow'}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default UserCard;

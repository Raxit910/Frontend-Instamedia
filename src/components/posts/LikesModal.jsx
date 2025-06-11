import { useState, useEffect } from 'react';
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Button,
  Typography,
  Box,
} from '@mui/material';
import Modal from '../common/Modal';
import { likeApi } from '../../api/likeApi';
import { showError } from '../../utils/toast';
import { useNavigate } from 'react-router-dom';

const LikesModal = ({ open, onClose, postId }) => {
  const [likes, setLikes] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (open && postId) {
      fetchLikes();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, postId]);

  const fetchLikes = async () => {
    try {
      setLoading(true);
      const response = await likeApi.getPostLikes(postId);
      setLikes(response.data.likes);
    } catch (error) {
      showError('Failed to fetch likes.');
      console.error('Error fetching likes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewUser = (username) => {
    onClose(); // Close modal first
    navigate(`/preview-profile/${username}`);
  };

  return (
    <Modal open={open} onClose={onClose} title="Liked by">
      <Box>
        {loading ? (
          <Typography align="center" p={2}>
            Loading...
          </Typography>
        ) : likes.length === 0 ? (
          <Typography align="center" p={2} color="text.secondary">
            No likes found
          </Typography>
        ) : (
          <List>
            {likes.map((user) => (
              <ListItem key={user.id} divider>
                <ListItemAvatar>
                  <Avatar src={user.avatarUrl} />
                </ListItemAvatar>
                <ListItemText primary={user.username} />
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => handleViewUser(user.username)}
                >
                  View
                </Button>
              </ListItem>
            ))}
          </List>
        )}
      </Box>
    </Modal>
  );
};

export default LikesModal;

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
import { commentApi } from '../../api/commentApi';
import { showError } from '../../utils/toast';
import { useNavigate } from 'react-router-dom';

const UserCommentsModal = ({ postId, open, onClose }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (open && postId) {
      fetchComments();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, postId]);

  const fetchComments = async () => {
    try {
      setLoading(true);
      const response = await commentApi.getPostComments(postId);
      setComments(response.data.comments);
    } catch (error) {
      showError('Failed to fetch comments.');
      console.error('Error fetching comments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewUser = (username) => {
    onClose(); // Close modal first
    navigate(`/preview-profile/${username}`);
  };

  return (
    <Modal open={open} onClose={onClose} title="Comments by">
      <Box>
        {loading ? (
          <Typography align="center" p={2}>
            Loading...
          </Typography>
        ) : comments.length === 0 ? (
          <Typography align="center" p={2} color="text.secondary">
            No comments found
          </Typography>
        ) : (
          <List>
            {comments.map((comment) => (
              <ListItem key={comment.id} divider>
                <ListItemAvatar>
                  <Avatar src={comment.user.avatarUrl} />
                </ListItemAvatar>
                <ListItemText primary={comment.user.username} secondary={comment.content} />
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => handleViewUser(comment.user.username)}
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

export default UserCommentsModal;

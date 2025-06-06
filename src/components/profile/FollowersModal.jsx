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
import { userApi } from '../../api/userApi';
import { showError } from '../../utils/toast';
import { useNavigate } from 'react-router-dom';

const FollowersModal = ({ open, onClose, userId, type }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (open && userId) {
      fetchUsers();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, userId, type]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response =
        type === 'followers'
          ? await userApi.getFollowers(userId)
          : await userApi.getFollowing(userId);

      setUsers(response.data[type]);
    } catch {
      showError(`No ${type} found.`);
    } finally {
      setLoading(false);
    }
  };

  const handleViewUser = (username) => {
    onClose(); // Close modal first
    navigate(`/preview-profile/${username}`);
  };

  const title = type === 'followers' ? 'Followers' : 'Following';

  return (
    <Modal open={open} onClose={onClose} title={title}>
      <Box>
        {loading ? (
          <Typography align="center" p={2}>
            Loading...
          </Typography>
        ) : users.length === 0 ? (
          <Typography align="center" p={2} color="text.secondary">
            No {type} found
          </Typography>
        ) : (
          <List>
            {users.map((user) => (
              <ListItem key={user.id} divider>
                <ListItemAvatar>
                  <Avatar src={user.avatarUrl} />
                </ListItemAvatar>
                <ListItemText primary={user.username} secondary={user.bio} />
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

export default FollowersModal;

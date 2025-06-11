import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
} from '@mui/material';
import { postApi } from '../../api/postApi';
import { showError, showSuccess } from '../../utils/toast';
import Modal from '../common/Modal';

const DeleteConfirmationModal = ({ postId, open, onClose, onDeleteSuccess }) => {
  const handleDelete = async () => {
    try {
      await postApi.deletePost(postId);
      showSuccess('Post deleted');
      onClose();
      if (onDeleteSuccess) onDeleteSuccess(postId); // Update local post list
    } catch {
      showError('Failed to delete post');
    }
  };

  return (
    <Modal open={open} onClose={onClose} title="Delete Post">
      <Box p={2} display="flex" flexDirection="column" gap={2}>
        <Typography>
          Are you sure you want to delete this post? This action cannot be undone.
        </Typography>
        <Box display="flex" gap={2} justifyContent="flex-end">
          <Button onClick={onClose} variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Delete
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DeleteConfirmationModal;

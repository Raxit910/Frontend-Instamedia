import {
  Box,
  Modal,
  Typography,
  IconButton,
  Avatar,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
} from '@mui/material';
import { FiX } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import { commentApi } from '../../api/commentApi';
import { showError, showSuccess } from '../../utils/toast';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAuth } from '../../hooks/useAuth';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  maxWidth: 500,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 3,
  maxHeight: '80vh',
  overflowY: 'auto',
};

const CommentModal = ({ open, onClose, postId, onCommentAdded, onCommentDeleted }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState(null);

  const { user } = useAuth();

  const fetchComments = async () => {
    try {
      const res = await commentApi.getPostComments(postId);
      setComments(res.data.comments);
    } catch {
      showError('Failed to load comments');
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    try {
      setLoading(true);
      const res = await commentApi.createComment(postId, { content: newComment });
      setComments([res.data.comment, ...comments]);
      onCommentAdded?.();
      setNewComment('');
      showSuccess('Comment added');
    } catch {
      showError('Failed to add comment');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteComment = async () => {
    try {
      await commentApi.deleteComment(deleteTargetId);
      setComments(comments.filter((c) => c.id !== deleteTargetId));
      onCommentDeleted?.();
      showSuccess('Comment deleted');
    } catch {
      showError('Failed to delete comment');
    } finally {
      setDeleteTargetId(null);
    }
  };

  useEffect(() => {
    if (open) fetchComments();
  }, [open]);

  return (
    <>
      <Modal open={open} onClose={onClose}>
        <Box sx={{ ...style, position: 'relative' }}>
          {/* Close Button */}
          <IconButton
            onClick={onClose}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              color: 'grey.700',
            }}
          >
            <FiX />
          </IconButton>

          <Typography variant="h6" mb={2}>
            Comments
          </Typography>

          {/* Comment List */}
          {comments.map((comment) => (
            <Box key={comment.id} display="flex" gap={1} mb={1}>
              <Avatar src={comment.user.avatarUrl} />
              <Box flex={1}>
                <Typography variant="body2" fontWeight="bold">
                  {comment.user.username}
                </Typography>
                <Typography variant="body2">{comment.content}</Typography>
              </Box>
              {comment.user.id === user.id && (
                <IconButton onClick={() => setDeleteTargetId(comment.id)}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              )}
            </Box>
          ))}

          {/* Add Comment */}
          <Box mt={2} display="flex" gap={1}>
            <TextField
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              fullWidth
              size="small"
            />
            <Button variant="contained" onClick={handleAddComment} disabled={loading}>
              Post
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Confirm Delete Dialog */}
      <Dialog
        open={!!deleteTargetId}
        onClose={() => setDeleteTargetId(null)}
        sx={{ width: '100%', maxWidth: '360', p: '2', borderRadius: '2' }}
      >
        <DialogTitle sx={{ fontSize: '1rem', textAlign: 'center' }}>
          Are you sure you want to delete this comment?
        </DialogTitle>
        <DialogActions sx={{ justifyContent: 'center', gap: 1 }}>
          <Button onClick={() => setDeleteTargetId(null)} variant="outlined" color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteComment} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CommentModal;

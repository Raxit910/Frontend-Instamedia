import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { TextField, Button, Box, Avatar, IconButton, Typography } from '@mui/material';
import { LuCamera } from 'react-icons/lu';
import Modal from '../common/Modal';
import { userApi } from '../../api/userApi';
import { useAuth } from '../../hooks/useAuth';
import { showSuccess, showError } from '../../utils/toast';

const schema = yup.object({
  username: yup
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(30, 'Username cannot exceed 30 characters')
    .matches(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
  bio: yup.string().max(500, 'Bio cannot exceed 500 characters'),
});

const EditProfileModal = ({ open, onClose, profile }) => {
  const { updateUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(profile?.avatarUrl || '');

  const {
    register,
    handleSubmit,
    formState: { errors },
    // reset
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      username: profile?.username || '',
      bio: profile?.bio || '',
    },
  });

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      // Upload avatar if changed
      if (avatarFile) {
        await userApi.uploadAvatar(avatarFile);
      }

      // Update profile data
      const response = await userApi.updateProfile(data);
      console.log(response.data.user);
      updateUser(response.data.user);
      showSuccess('Profile updated successfully');
      onClose();
    } catch (error) {
      showError(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose} title="Edit Profile">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box display="flex" flexDirection="column" gap={3} p={2}>
          {/* Avatar Upload */}
          <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
            <Box position="relative">
              <Avatar src={avatarPreview} sx={{ width: 100, height: 100 }} />
              <IconButton
                component="label"
                sx={{
                  position: 'absolute',
                  bottom: -5,
                  right: -5,
                  bgcolor: 'primary.main',
                  color: 'white',
                  '&:hover': { bgcolor: 'primary.dark' },
                }}
                size="small"
              >
                <LuCamera size={16} />
                <input type="file" hidden accept="image/*" onChange={handleAvatarChange} />
              </IconButton>
            </Box>
            <Typography variant="body2" color="text.secondary">
              Click camera icon to change avatar
            </Typography>
          </Box>

          {/* Username Field */}
          <TextField
            {...register('username')}
            label="Username"
            error={!!errors.username}
            helperText={errors.username?.message}
            fullWidth
          />

          {/* Bio Field */}
          <TextField
            {...register('bio')}
            label="Bio"
            multiline
            rows={4}
            error={!!errors.bio}
            helperText={errors.bio?.message}
            fullWidth
          />

          {/* Action Buttons */}
          <Box display="flex" gap={2} justifyContent="flex-end">
            <Button onClick={onClose} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" disabled={loading}>
              {loading ? 'Saving...' : 'Save Changes'}
            </Button>
          </Box>
        </Box>
      </form>
    </Modal>
  );
};

export default EditProfileModal;

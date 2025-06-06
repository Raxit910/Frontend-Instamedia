import { useState, useEffect } from 'react';
import { userApi } from '../api/userApi';
import { showSuccess, showError } from '../utils/toast';
import { useAuth } from './useAuth';

export const useUserProfile = (username) => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(user);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!username) return;

    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await userApi.getUserProfile(username);
        setProfile(response.data.user);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch profile');
        showError.error('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [username, user]);

  const toggleFollow = async () => {
    if (!profile) return;

    try {
      const response = await userApi.toggleFollow(profile.id);
      setProfile((prev) => ({
        ...prev,
        isFollowing: response.data.isFollowing,
        _count: {
          ...prev._count,
          followers: prev._count.followers + (response.data.isFollowing ? 1 : -1),
        },
      }));
      showSuccess.success(response.data.message);
    } catch (err) {
      showError.error(err.response?.data?.message || 'Failed to update follow status');
    }
  };

  return { profile, setProfile, loading, error, toggleFollow };
};

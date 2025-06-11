import { useState, useEffect } from 'react';
import { userApi } from '../api/userApi';
import { showSuccess, showError } from '../utils/toast';
import { useAuth } from './useAuth';
import { postApi } from '../api/postApi';
import { useNavigate } from 'react-router-dom';

export const useUserProfile = (username) => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(user);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!username && !user?.username) {
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      setLoading(true);
      setError(null);
      setProfile(null); // Clear previous profile data
      try {
        const response = await userApi.getUserProfile(username);
        setProfile(response.data.user);

        // Fetch posts only if profile exists and was successfully fetched
        try {
          const resPosts = await postApi.getPostByUsername(username);
          setPosts(resPosts.data.posts);
        } catch (postErr) {
          // Log specific error for posts, but don't redirect to 404 for just posts failing
          console.error('Failed to load posts:', postErr);
          showError('Failed to load posts for this profile');
          setPosts([]); // Clear posts if fetching fails
        }
      } catch (err) {
        if (err.response && err.response.status === 404) {
          console.log(`Profile for ${username} not found. Redirecting to 404.`);
          navigate('/404', { replace: true }); // Redirect to 404 page
        } else {
          // Handle other errors (e.g., network issues, server errors)
          setError(err.response?.data?.message || 'Failed to fetch profile');
          showError('Failed to load own profile. Please try again.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [username, user, navigate]);

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

  return { profile, posts, setProfile, loading, error, toggleFollow };
};

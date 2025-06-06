import React, { useState, useCallback } from 'react';
import {
  Box,
  Typography,
  TextField,
  Card,
  CardContent,
  Grid,
  InputAdornment,
  CircularProgress,
  Alert,
  Chip,
  Skeleton,
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { userApi } from '../../api/userApi';
import { showSuccess, showError } from '../../utils/toast';
import { debounce } from '../../utils/debounce';
import UserCard from '../profile/UserCard';

const SearchSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [followingInProgress, setFollowingInProgress] = useState(new Set());
  const [hasSearched, setHasSearched] = useState(false);

  const debouncedSearch = useCallback(
    debounce(async (query) => {
      if (!query.trim()) {
        setSearchResults([]);
        setHasSearched(false);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError('');

      try {
        const response = await userApi.searchUsers(query, 0, 20);
        if (response.data.success) {
          setSearchResults(response.data.users);
          setHasSearched(true);
        } else {
          setError('Failed to search users');
        }
      } catch (err) {
        console.error('Search error:', err);
        setError('An error occurred while searching');
        setSearchResults([]);
      } finally {
        setLoading(false);
      }
    }, 300),
    []
  );

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (query.trim()) {
      setLoading(true);
      debouncedSearch(query);
    } else {
      setSearchResults([]);
      setHasSearched(false);
      setLoading(false);
    }
  };

  const handleToggleFollow = async (userId, isCurrentlyFollowing) => {
    setFollowingInProgress((prev) => new Set([...prev, userId]));

    try {
      const response = await userApi.toggleFollow(userId);

      if (response.data.success) {
        setSearchResults((prevResults) =>
          prevResults.map((user) =>
            user.id === userId ? { ...user, isFollowing: !isCurrentlyFollowing } : user
          )
        );
        showSuccess(
          isCurrentlyFollowing ? 'User unfollowed successfully' : 'User followed successfully'
        );
      } else {
        showError(response.message);
      }
    } catch (err) {
      console.error('Follow toggle error:', err);
      showError(err.response?.data?.message);
    } finally {
      setFollowingInProgress((prev) => {
        const newSet = new Set(prev);
        newSet.delete(userId);
        return newSet;
      });
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setHasSearched(false);
    setError('');
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 2 }}>
      <Typography variant="h5" gutterBottom sx={{ mb: 3, fontWeight: 600 }}>
        Find Friends
      </Typography>

      <Card sx={{ mb: 3, boxShadow: 2 }}>
        <CardContent>
          <TextField
            fullWidth
            placeholder="Search users by username or bio..."
            value={searchQuery}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
              endAdornment: loading && (
                <InputAdornment position="end">
                  <CircularProgress size={20} />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              },
            }}
          />

          {searchQuery && (
            <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
              <Chip
                label={`Searching for: "${searchQuery}"`}
                onDelete={clearSearch}
                variant="outlined"
                size="small"
              />
            </Box>
          )}
        </CardContent>
      </Card>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {loading && !searchResults.length ? (
        <Box>
          <Typography variant="h6" gutterBottom>
            Searching...
          </Typography>
          <Grid container spacing={2}>
            {[1, 2, 3, 4].map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item}>
                <Card sx={{ textAlign: 'center', padding: 2 }}>
                  <CardContent>
                    <Skeleton
                      variant="circular"
                      width={60}
                      height={60}
                      sx={{ mx: 'auto', mb: 1 }}
                    />
                    <Skeleton variant="text" width="50%" sx={{ mx: 'auto', mb: 1 }} />
                    <Skeleton
                      variant="rectangular"
                      width={100}
                      height={36}
                      sx={{ mx: 'auto', borderRadius: 2 }}
                    />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      ) : hasSearched ? (
        <Box>
          <Typography variant="h6" gutterBottom>
            Search Results ({searchResults.length})
          </Typography>

          {searchResults.length === 0 ? (
            <Card>
              <CardContent sx={{ textAlign: 'center', py: 4 }}>
                <SearchIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  No users found
                </Typography>
                <Typography color="text.secondary">
                  Try searching with different keywords
                </Typography>
              </CardContent>
            </Card>
          ) : (
            <Grid container spacing={2}>
              {searchResults.map((user) => (
                <Grid item xs={12} sm={6} md={4} key={user.id}>
                  <UserCard
                    user={user}
                    isFollowing={user.isFollowing}
                    isLoading={followingInProgress.has(user.id)}
                    onToggleFollow={() => handleToggleFollow(user.id, user.isFollowing)}
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      ) : (
        <Card>
          <CardContent sx={{ textAlign: 'center', py: 4 }}>
            <SearchIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Discover People
            </Typography>
            <Typography color="text.secondary">
              Start typing to search for users by username or bio
            </Typography>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default SearchSection;

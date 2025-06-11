import { Avatar, Box, Typography, IconButton } from '@mui/material';
import {
  Favorite,
  FavoriteBorder,
  ChatBubbleOutline,
  Bookmark,
  BookmarkBorder,
} from '@mui/icons-material';
import { getTimeAgo } from '../../utils/timeAgo';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { likeApi } from '../../api/likeApi';
import { savedPostApi } from '../../api/savedPostApi';
import CommentModal from './CommentModal';
import { showError } from '../../utils/toast';

const PostCard = ({ post }) => {
  const [liked, setLiked] = useState(post.isLikedByCurrentUser);
  const [likesCount, setLikesCount] = useState(post.likesCount);
  const [commentsCount, setCommentsCount] = useState(post.commentsCount);
  const [savedPost, setSavedPost] = useState(post.isSavedByCurrentUser);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);

  const toggleLike = async () => {
    // Optimistic update
    setLiked((prevLiked) => !prevLiked);
    setLikesCount((prevCount) => prevCount + (liked ? -1 : 1));

    try {
      await likeApi.toggleLike(post.id); // Call backend to toggle like
    } catch (error) {
      // Revert UI if API fails
      showError('Failed to toggle like:', error);
      setLiked((prevLiked) => !prevLiked);
      setLikesCount((prevCount) => prevCount + (liked ? 1 : -1));
    }
  };

  const toggleSave = async () => {
    setSavedPost((prev) => !prev);
    try {
      await savedPostApi.toggleSavePost(post.id);
    } catch (error) {
      showError('Failed to toggle save:', error);
      setSavedPost((prev) => !prev);
    }
  };

  // Custom Arrows
  const CustomNextArrow = ({ className, style, onClick }) => (
    <div
      className={className}
      style={{
        ...style,
        display: 'block',
        zIndex: 2,
        right: 10,
        top: '50%',
        transform: 'translateY(-50%)',
        fontSize: '1.5rem',
        color: '#fff',
        cursor: 'pointer',
      }}
      onClick={onClick}
    />
  );

  const CustomPrevArrow = ({ className, style, onClick }) => (
    <div
      className={className}
      style={{
        ...style,
        display: 'block',
        zIndex: 2,
        left: 10,
        top: '50%',
        transform: 'translateY(-50%)',
        fontSize: '1.5rem',
        color: '#fff',
        cursor: 'pointer',
      }}
      onClick={onClick}
    />
  );

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
  };

  return (
    <Box sx={{ border: '1px solid #ddd', borderRadius: 2, p: 2, mb: 2 }}>
      {/* Header */}
      <Box display="flex" alignItems="center" gap={2} mb={1}>
        <Avatar src={post.user.avatarUrl} />
        <Box>
          <Typography
            component={Link}
            to={`/preview-profile/${post.user.username}`}
            fontWeight="bold"
          >
            {post.user.username}
          </Typography>
          <Typography variant="caption"> • </Typography>
          <Typography variant="caption">{getTimeAgo(post.createdAt)}</Typography>
        </Box>
      </Box>

      {/* Image Carousel with Custom Arrows */}
      {post.images.length > 0 && (
        <Box position="relative" mb={1}>
          <Slider {...sliderSettings}>
            {post.images.map((url, idx) => (
              <Box key={idx}>
                <img
                  src={url}
                  alt={`post-img-${idx}`}
                  style={{
                    width: '100%',
                    maxHeight: 400,
                    objectFit: 'cover',
                    borderRadius: 8,
                  }}
                />
              </Box>
            ))}
          </Slider>
        </Box>
      )}

      {/* Content */}
      <Box mb={1} dangerouslySetInnerHTML={{ __html: post.content }} />

      {/* Actions */}
      <Box display="flex" alignItems="center" gap={1}>
        <IconButton onClick={toggleLike}>
          {liked ? <Favorite color="error" /> : <FavoriteBorder />}
        </IconButton>
        <Typography>{likesCount}</Typography>

        <IconButton onClick={() => setIsCommentModalOpen(true)} sx={{ ml: 2 }}>
          <ChatBubbleOutline fontSize="small" />
        </IconButton>
        <Typography>{commentsCount}</Typography>

        <IconButton onClick={toggleSave} sx={{ ml: 'auto' }}>
          {savedPost ? <Bookmark color="primary" /> : <BookmarkBorder />}
        </IconButton>
      </Box>

      {/* Comment Modal */}
      <CommentModal
        open={isCommentModalOpen}
        onClose={() => setIsCommentModalOpen(false)}
        postId={post.id}
        onCommentAdded={() => setCommentsCount((prev) => prev + 1)}
        onCommentDeleted={() => setCommentsCount((prev) => prev - 1)}
      />
    </Box>
  );
};

export default PostCard;

import { useState } from 'react';
import { Box, Typography, IconButton, Card, CardContent, Button, Grid } from '@mui/material';
import { AiOutlineDelete } from 'react-icons/ai';
import Slider from 'react-slick';
import LikesModal from '../posts/LikesModal';
import UserCommentModal from './UserCommentModal';
import DeleteConfirmationModal from './DeleteConfirmationModal';

const UserPosts = ({ posts: initialPosts, isOwnProfile }) => {
  const [likesModalPostId, setLikesModalPostId] = useState(null);
  const [commentsModalPostId, setCommentsModalPostId] = useState(null);
  const [deleteModalPostId, setDeleteModalPostId] = useState(null);
  const [posts, setPosts] = useState(initialPosts);

  const handlePostDelete = (deletedPostId) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== deletedPostId));
  };

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
      }}
      onClick={onClick}
    />
  );

  const sliderSettings = {
    dots: true,
    arrows: true,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          arrows: false,
          dots: true,
        },
      },
    ],
  };

  return (
    <Box mt={2}>
      <Typography variant="subtitle1" gutterBottom mb={2}>
        Posts <hr />
      </Typography>
      <Grid
        container
        spacing={2}
        justifyContent="center"
        alignItems="flex-start"
        sx={{
          maxWidth: '1000px',
          width: '100%',
          margin: '0 auto',
        }}
      >
        {posts.map((post) => (
          <Grid item xs={12} sm={6} md={4} key={post.id}>
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: 2,
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                height: 340, // fixed height for uniformity
                position: 'relative',
              }}
            >
              {post.images.length > 0 && (
                <Box
                  sx={{
                    position: 'relative',
                    width: '100%',
                    paddingTop: '100%', // 1:1 ratio
                    overflow: 'hidden',
                  }}
                >
                  {post.images.length > 1 ? (
                    <Slider
                      {...sliderSettings}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                      }}
                    >
                      {post.images.map((img) => (
                        <Box
                          key={img.id}
                          component="img"
                          src={img.url}
                          alt="Post image"
                          sx={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                          }}
                        />
                      ))}
                    </Slider>
                  ) : (
                    <Box
                      component="img"
                      src={post.images[0]?.url}
                      alt="Post image"
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  )}
                </Box>
              )}

              <CardContent sx={{ p: 1.5, flexGrow: 1 }}>
                <Box mb={1} sx={{ overflow: 'hidden' }}>
                  <div
                    dangerouslySetInnerHTML={{ __html: post.content }}
                    style={{
                      fontSize: '14px',
                      color: '#444',
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  />
                </Box>

                <Box
                  display="flex"
                  gap={1.5}
                  alignItems="center"
                  justifyContent="space-between"
                  sx={{ mt: 'auto' }}
                >
                  <Box display="flex" gap={1}>
                    <Button
                      size="small"
                      sx={{ color: 'purple', fontSize: '12px', textTransform: 'none' }}
                      onClick={() => setLikesModalPostId(post.id)}
                    >
                      {post._count.likes} Likes
                    </Button>
                    <Button
                      size="small"
                      sx={{ color: 'purple', fontSize: '12px', textTransform: 'none' }}
                      onClick={() => setCommentsModalPostId(post.id)}
                    >
                      {post._count.comments} Comments
                    </Button>
                  </Box>

                  {isOwnProfile && (
                    <IconButton
                      size="small"
                      onClick={() => setDeleteModalPostId(post.id)}
                      sx={{
                        color: 'gray',
                        '&:hover': {
                          color: 'red',
                        },
                      }}
                    >
                      <AiOutlineDelete size={16} />
                    </IconButton>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Modals */}
      <LikesModal
        postId={likesModalPostId}
        open={Boolean(likesModalPostId)}
        onClose={() => setLikesModalPostId(null)}
      />
      <UserCommentModal
        postId={commentsModalPostId}
        open={Boolean(commentsModalPostId)}
        onClose={() => setCommentsModalPostId(null)}
      />
      <DeleteConfirmationModal
        postId={deleteModalPostId}
        open={Boolean(deleteModalPostId)}
        onClose={() => setDeleteModalPostId(null)}
        onDeleteSuccess={handlePostDelete}
      />
    </Box>
  );
};

export default UserPosts;

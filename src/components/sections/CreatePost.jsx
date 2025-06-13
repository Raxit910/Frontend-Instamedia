import { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  IconButton,
  Grid,
  CircularProgress,
} from '@mui/material';
import { PhotoCamera, Delete } from '@mui/icons-material';
import Cropper from 'react-easy-crop';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import { showSuccess, showError } from '../../utils/toast';
import { postApi } from '../../api/postApi';
import Modal from '../common/Modal';
import getCroppedImg from '../../utils/cropImage';

const MAX_IMAGES = 4;

const CreatePost = () => {
  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content: '',
  });

  const [images, setImages] = useState([]);
  const [croppingImage, setCroppingImage] = useState(null);
  const [cropData, setCropData] = useState({ zoom: 1, crop: { x: 0, y: 0 }, croppedPixels: null });
  const [croppingIndex, setCroppingIndex] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.slice(0, MAX_IMAGES - images.length);
    newImages.forEach((file, index) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCroppingImage(reader.result);
        setCroppingIndex(images.length + index);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleCropComplete = async (_, croppedAreaPixels) => {
    const croppedBlob = await getCroppedImg(croppingImage, croppedAreaPixels);
    if (croppedBlob) {
      setImages((prev) => {
        const newImages = [...prev];
        newImages[croppingIndex] = croppedBlob;
        return newImages;
      });
    }
    setCroppingImage(null);
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!editor?.getHTML().trim() && images.length === 0) return;

    setLoading(true);
    const formData = new FormData();
    formData.append('content', editor.getHTML());
    images.forEach((img, idx) => {
      const file = new File([img], `post_image_${idx}.jpeg`, { type: img.type || 'image/jpeg' });
      formData.append('images', file);
    });
    for (let [key, value] of formData.entries()) {
      console.log(key, value, value instanceof File && value.name);
    }

    try {
      const response = await postApi.createPost(formData);
      if (response.data.success) {
        showSuccess('Post created successfully!');
        editor.commands.clearContent();
        setImages([]);
      } else {
        showError(response.data.message);
      }
    } catch (err) {
      showError(err.response?.data?.message || 'Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Create Post
      </Typography>

      <Card>
        <CardContent>
          {/* Tiptap Editor */}
          <Box
            sx={{
              border: '1px solid #ccc',
              borderRadius: 2,
              p: 2,
              mb: 2,
              '& .ProseMirror': {
                outline: 'none',
                border: 'none',
                minHeight: '50px',
              },
            }}
          >
            <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
              <Button
                sx={{ p: 0 }}
                variant={editor.isActive('bold') ? 'contained' : 'outlined'}
                onClick={() => editor.chain().focus().toggleBold().run()}
              >
                <b>B</b>
              </Button>
              <Button
                sx={{ p: 0 }}
                variant={editor.isActive('italic') ? 'contained' : 'outlined'}
                onClick={() => editor.chain().focus().toggleItalic().run()}
              >
                <i>I</i>
              </Button>
              <Button
                sx={{ p: 0 }}
                variant={editor.isActive('underline') ? 'contained' : 'outlined'}
                onClick={() => editor.chain().focus().toggleUnderline().run()}
              >
                <u>U</u>
              </Button>
              <Button
                sx={{ p: 0 }}
                variant={editor.isActive('strike') ? 'contained' : 'outlined'}
                onClick={() => editor.chain().focus().toggleStrike().run()}
              >
                <s>S</s>
              </Button>
            </Box>

            <EditorContent editor={editor} />
          </Box>

          {/* Image Upload */}
          <Button
            variant="outlined"
            component="label"
            startIcon={<PhotoCamera />}
            disabled={images.length >= MAX_IMAGES}
            sx={{ mb: 2 }}
          >
            Upload Image(s)
            <input hidden accept="image/*" type="file" multiple onChange={handleImageChange} />
          </Button>

          {/* Preview */}
          <Grid container spacing={2} sx={{ mb: 2 }}>
            {images.map((img, idx) => (
              <Grid item xs={6} sm={3} key={idx}>
                <Box position="relative">
                  <img
                    src={typeof img === 'string' ? img : URL.createObjectURL(img)}
                    alt="preview"
                    style={{ width: '100%', borderRadius: 8 }}
                  />
                  <IconButton
                    onClick={() => removeImage(idx)}
                    size="small"
                    sx={{ position: 'absolute', top: 5, right: 5, bgcolor: 'white' }}
                  >
                    <Delete fontSize="small" />
                  </IconButton>
                </Box>
              </Grid>
            ))}
          </Grid>

          {/* Submit Button */}
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={loading || (!editor?.getHTML().trim() && images.length === 0)}
          >
            {loading ? <CircularProgress size={24} /> : 'Post'}
          </Button>
        </CardContent>
      </Card>

      {/* Crop Modal */}
      {croppingImage && (
        <Modal open={true} onClose={() => setCroppingImage(null)}>
          <Box sx={{ height: 450, position: 'relative', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ flexGrow: 1, position: 'relative' }}>
              <Cropper
                image={croppingImage}
                crop={cropData.crop}
                zoom={cropData.zoom}
                aspect={1}
                onCropChange={(crop) => setCropData({ ...cropData, crop })}
                onZoomChange={(zoom) => setCropData({ ...cropData, zoom })}
                onCropComplete={(_, croppedPixels) =>
                  setCropData((prev) => ({ ...prev, croppedPixels }))
                }
              />
            </Box>
            <Box textAlign="right" mt={2}>
              <Button
                variant="contained"
                onClick={() => handleCropComplete(null, cropData.croppedPixels)}
              >
                Crop Image
              </Button>
            </Box>
          </Box>
        </Modal>
      )}
    </Box>
  );
};

export default CreatePost;

"use client";

import React, { useState } from 'react';
import { supabase } from '../services/supabaseClient';
import Grid from '@mui/material/Unstable_Grid2';
import {
  Button,
  Paper,
  TextField,
  InputAdornment,
  Alert,
  InputLabel,
  Snackbar,
  Box,
} from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Popover from '@mui/material/Popover';

const cocoCategories = [
  'person', 'bicycle', 'car', 'motorcycle', 'airplane', 'bus', 'train', 'truck',
  'boat', 'traffic light', 'fire hydrant', 'stop sign', 'parking meter', 'bench',
  'bird', 'cat', 'dog', 'horse', 'sheep', 'cow', 'elephant', 'bear', 'zebra', 'giraffe',
  'backpack', 'umbrella', 'handbag', 'tie', 'suitcase', 'frisbee', 'skis', 'snowboard',
  'sports ball', 'kite', 'baseball bat', 'baseball glove', 'skateboard', 'surfboard',
  'tennis racket', 'bottle', 'wine glass', 'cup', 'fork', 'knife', 'spoon', 'bowl',
  'banana', 'apple', 'sandwich', 'orange', 'broccoli', 'carrot', 'hot dog', 'pizza',
  'donut', 'cake', 'chair', 'couch', 'potted plant', 'bed', 'dining table', 'toilet',
  'tv', 'laptop', 'mouse', 'remote', 'keyboard', 'cell phone', 'microwave', 'oven',
  'toaster', 'sink', 'refrigerator', 'book', 'clock', 'vase', 'scissors', 'teddy bear',
  'hair drier', 'toothbrush', 'others',
];

export function VideoUpload() {
  const [success, setSuccess] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleHowTo = (event) => { setAnchorEl(event.currentTarget); };
  const closeHowTo = () => { setAnchorEl(null); };
  const openHowTo = Boolean(anchorEl);
  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };
  const handleSumission = async (event) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.target);
    const imageFile = formData.get('image-file-input');
    const videoFile = formData.get('video-file-input');
    const productTitle = formData.get('product-title-input');
    const productCategory = formData.get('product-category-input');
    const productPrice = formData.get('price-input');
    let imageLink = "";
    let videoLink = "";

    if (imageFile) {
      if (!['image/jpeg', 'image/png'].includes(imageFile.type)) {
        alert('Please select a valid image file (jpg or png).');
        return;
      }
      const { data, error } = await supabase.storage
        .from('korokoro_bucket')
        .upload(`public/${imageFile.name}`, imageFile, {
          cacheControl: '3600',
          upsert: true
        });
      if (error) {
        console.log(error);
        alert('Error uploading image file.');
        return;
      }
      const imageData = supabase
        .storage
        .from('korokoro_bucket')
        .getPublicUrl(`public/${imageFile.name}`)
      imageLink = imageData.data.publicUrl;
    }

    if (videoFile && !videoFile.type.includes('video/mp4')) {
      alert('Please select a valid video file (mp4).');
      return;
    }

    if (videoFile) {
      const { data, error } = await supabase.storage
        .from('korokoro_bucket')
        .upload(`public/${videoFile.name}`, videoFile, {
          cacheControl: '3600',
          upsert: true
        });
      if (error) {
        console.log(error);
        alert('Error uploading video file.');
        return;
      }
      const videoData = supabase
        .storage
        .from('korokoro_bucket')
        .getPublicUrl(`public/${videoFile.name}`)
      videoLink = videoData.data.publicUrl;
    }
    const { data, error } = await supabase
      .from('products')
      .upsert([
        {
          title: productTitle,
          category: productCategory,
          price: productPrice,
          image_link: imageLink,
          video_link: videoLink,
        },
      ]);
    if (error) {
      console.log(error);
    } else {
      setLoading(false);
      setSuccess(true);
      setSnackbarOpen(true);
      window.location.reload();
    }
  };

  return (
    <Paper sx={{ padding: '1.5rem', }} elevation={4}>
      <Grid container spacing={2}>
        <Grid xs={12}>
          <h2> Add your product </h2>
        </Grid>
        <Grid xs={12}>
          <form onSubmit={handleSumission}>
            <Grid container spacing={2} rowSpacing={4}>
              <Grid xs={12}>
                <TextField
                  label="Product Title"
                  name="product-title-input"
                  size="small"
                  InputLabelProps={{
                    style: {
                      fontSize: '1rem',
                    },
                  }}
                  fullWidth
                  required
                />
              </Grid>
              <Grid xs={12}>
                <Autocomplete
                  id="product-category"
                  options={cocoCategories}
                  renderInput={(params) => <TextField {...params} InputLabelProps={{
                    style: {
                      fontSize: '1rem',
                    },
                  }} size="small" name="product-category-input" required label="Product Category" />}
                />
              </Grid>
              <Grid container xs={12} spacing={2.5}>
                <InputLabel required htmlFor="video-file-input">Video (.mp4)</InputLabel>
                <Grid xs={10} display="flex" >
                  <TextField
                    name="video-file-input"
                    type="file"
                    size="small"
                    accept="video/mp4"
                    // InputLabelProps={{ fontSize: '0.5rem' }}
                    required
                  />
                </Grid>
                <Grid xs={2}>
                  <span style={{ fontSize: '2.4rem', height: '1rem', cursor: 'pointer' }} variant="outlined" onClick={handleHowTo}>
                    &#9432;
                  </span>
                  <Popover
                    open={openHowTo}
                    anchorEl={anchorEl}
                    onClose={closeHowTo}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}>
                    <video autoPlay controls loop muted width="400">
                      <source src="/how_to.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </Popover>
                </Grid>
              </Grid>
              <Grid xs={12}>
                <InputLabel required htmlFor="image-file-input">Image (.jpg, .png)</InputLabel>
                <TextField
                  name="image-file-input"
                  type="file"
                  size="small"
                  accept="image/png, image/jpg"
                  fullWidth
                  required
                />
              </Grid>

              <Grid xs={12}>
                <TextField
                  label="Price"
                  type="number"
                  name="price-input"
                  min="0"
                  size="small"
                  fullWidth
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        ₦
                      </InputAdornment>
                    ),
                    style: {
                      fontSize: '1rem',
                    },
                  }}
                />
              </Grid>
              <Grid xs={12}>
                <Box sx={{ display: 'flex' }}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{
                      boxShadow: '0 0 0.05rem 0.1rem rgba(0, 0, 0, 0.4)',
                      background: 'none',
                      color: 'black',
                      border: 'none',
                      margin: '0 auto',
                      padding: '1rem',
                      width: '8rem',
                    }}
                    disabled={loading}
                  >
                    {loading ? 'Uploading...' : 'Upload'}{/* Change button label based on loading state */}
                  </Button>
                  {
                    success &&
                    <Snackbar open={snackbarOpen} autoHideDuration={2500} onClose={handleSnackbarClose}>
                      <Alert severity="success" >
                        Product added successfully!
                      </Alert>
                    </Snackbar>
                  }
                </Box>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid >
    </Paper >
  );
};

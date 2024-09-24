import React, { useState } from 'react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Typography, Grid, Card, CardMedia } from '@mui/material';
import { styled } from '@mui/system';
import { PhotoCamera } from '@mui/icons-material';

const FormContainer = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  gap: '20px',
  padding: '30px',
  maxWidth: '1200px',
  margin: '0 auto',
  backgroundColor: '#f4f5f7',
  borderRadius: '12px',
  boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
  flexWrap: 'wrap',
});

const LeftSection = styled('div')({
  flex: 1,
  minWidth: '300px',
});

const RightSection = styled('div')({
  flex: 1,
  minWidth: '300px',
});

const SectionCard = styled(Card)({
  width: '100%',
  padding: '20px',
  borderRadius: '12px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
});

const FormField = styled('div')({
  margin: '15px 0',
  width: '100%',
});

const ImagePreviewContainer = styled(Grid)({
  marginTop: '15px',
  gap: '15px',
});

const PreviewImage = styled(Card)({
  width: '100%',
  maxWidth: '140px',
  height: '140px',
  overflow: 'hidden',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  position: 'relative',
  '&:hover img': {
    opacity: 0.8,
  },
});

const UploadButton = styled(Button)({
  backgroundColor: '#0066cc',
  color: '#ffffff',
  '&:hover': {
    backgroundColor: '#004a99',
  },
});

const AddProduct: React.FC = () => {
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState('');
  const [images, setImages] = useState<File[]>([]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newImages = Array.from(event.target.files).slice(0, 4);
      setImages(newImages);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle form submission and make API call
    console.log({ productName, description, price, category, stock, images });
  };

  return (
    <FormContainer>
      <LeftSection>
        <Typography variant="h4" gutterBottom>
          Add Product
        </Typography>
        <form onSubmit={handleSubmit}>
          <SectionCard>
            <Typography variant="h6" gutterBottom>
              Product Details
            </Typography>
            <FormField>
              <TextField
                label="Product Name"
                variant="outlined"
                fullWidth
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                required
              />
            </FormField>
            <FormField>
              <TextField
                label="Description"
                variant="outlined"
                fullWidth
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                multiline
                rows={4}
              />
            </FormField>
            <FormField>
              <TextField
                label="Price"
                variant="outlined"
                type="number"
                fullWidth
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </FormField>
            <FormField>
              <FormControl variant="outlined" fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  label="Category"
                  required
                >
                  <MenuItem value="Electronics">Electronics</MenuItem>
                  <MenuItem value="Clothing">Clothing</MenuItem>
                  <MenuItem value="Books">Books</MenuItem>
                  {/* Add more categories as needed */}
                </Select>
              </FormControl>
            </FormField>
            <FormField>
              <TextField
                label="Stock"
                variant="outlined"
                type="number"
                fullWidth
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                required
              />
            </FormField>
          </SectionCard>
          <FormField>
            <Button type="submit" variant="contained" color="primary" size="large">
              Add Product
            </Button>
          </FormField>
        </form>
      </LeftSection>
      <RightSection>
        <SectionCard>
          <Typography variant="h6" gutterBottom>
            Product Images
          </Typography>
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="contained-button-file"
            type="file"
            multiple
            onChange={handleImageChange}
          />
          <label htmlFor="contained-button-file">
            <UploadButton
              variant="contained"
              component="span"
              startIcon={<PhotoCamera />}
            >
              Upload Images
            </UploadButton>
          </label>
          <ImagePreviewContainer container>
            {images.map((image, index) => (
              <Grid item xs={6} sm={4} md={3} key={index}>
                <PreviewImage>
                  <CardMedia
                    component="img"
                    image={URL.createObjectURL(image)}
                    alt={`Preview ${index + 1}`}
                    title={`Preview ${index + 1}`}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </PreviewImage>
              </Grid>
            ))}
          </ImagePreviewContainer>
        </SectionCard>
      </RightSection>
    </FormContainer>
  );
};

export default AddProduct;

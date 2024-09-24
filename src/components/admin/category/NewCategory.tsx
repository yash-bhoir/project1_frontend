import React, { useState } from 'react';
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
  Container,
  FormControl,
} from '@mui/material';

const NewCategory: React.FC = () => {
  const [categoryName, setCategoryName] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle form submission and make API call
    console.log({ categoryName });
    // Reset the form
    setCategoryName('');
  };

  return (
    <Container maxWidth="sm" style={{ padding: '20px' }}>
      <Card>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            Add New Product Category
          </Typography>
          <form onSubmit={handleSubmit}>
            <FormControl fullWidth margin="normal">
              <TextField
                label="Category Name"
                variant="outlined"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                required
              />
            </FormControl>
            {/* Add more form fields as needed */}
            <Grid container spacing={2} style={{ marginTop: '20px' }}>
              <Grid item xs={12} sm={6}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Add Category
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  type="reset"
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  onClick={() => setCategoryName('')}
                >
                  Reset
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default NewCategory;

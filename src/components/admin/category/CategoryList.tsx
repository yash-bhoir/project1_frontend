import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

const initialCategories = [
  { id: 1, name: 'Electronics' },
  { id: 2, name: 'Clothing' },
  { id: 3, name: 'Books' },
  // Add more categories as needed
];

const CategoryList: React.FC = () => {
  const [categories, setCategories] = useState(initialCategories);
  const [editingCategory, setEditingCategory] = useState<{ id: number; name: string } | null>(null);
  const [newCategoryName, setNewCategoryName] = useState('');

  const handleDelete = (id: number) => {
    setCategories(categories.filter((category) => category.id !== id));
  };

  const handleEditOpen = (category: typeof initialCategories[0]) => {
    setEditingCategory(category);
    setNewCategoryName(category.name);
  };

  const handleEditClose = () => {
    setEditingCategory(null);
    setNewCategoryName('');
  };

  const handleEditSave = () => {
    if (editingCategory) {
      setCategories(
        categories.map((category) =>
          category.id === editingCategory.id ? { ...category, name: newCategoryName } : category
        )
      );
      handleEditClose();
    }
  };

  return (
    <div style={{ padding: '30px' }}>
      <Typography variant="h4" gutterBottom>
        Category List
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Category ID</TableCell>
              <TableCell>Category Name</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell>{category.id}</TableCell>
                <TableCell>{category.name}</TableCell>
                <TableCell align="right">
                  <IconButton color="primary" onClick={() => handleEditOpen(category)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => handleDelete(category.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {editingCategory && (
        <Dialog open={!!editingCategory} onClose={handleEditClose}>
          <DialogTitle>Edit Category</DialogTitle>
          <DialogContent>
            <TextField
              label="Category Name"
              fullWidth
              margin="normal"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              required
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleEditClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleEditSave} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default CategoryList;

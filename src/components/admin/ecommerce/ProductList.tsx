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
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Typography,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

const initialProducts = [
  { id: 1, name: 'Product 1', description: 'Description 1', price: 100, imageUrl: 'https://via.placeholder.com/150' },
  { id: 2, name: 'Product 2', description: 'Description 2', price: 150, imageUrl: 'https://via.placeholder.com/150' },
  // Add more products as needed
];

const ProductList: React.FC = () => {
  const [products, setProducts] = useState(initialProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingProduct, setEditingProduct] = useState<{ id: number; name: string; description: string; price: number; imageUrl: string } | null>(null);

  const handleDelete = (id: number) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const handleEditOpen = (product: typeof initialProducts[0]) => {
    setEditingProduct(product);
  };

  const handleEditClose = () => {
    setEditingProduct(null);
  };

  const handleEditSave = () => {
    setProducts(products.map((product) => (product.id === editingProduct?.id ? editingProduct : product)));
    handleEditClose();
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ padding: '30px' }}>
      <Typography variant="h4" gutterBottom>
        Product List
      </Typography>
      <TextField
        variant="outlined"
        fullWidth
        placeholder="Search products"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ marginBottom: '20px' }}
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <img src={product.imageUrl} alt={product.name} style={{ width: '100px', height: 'auto' }} />
                </TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>${product.price}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleEditOpen(product)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => handleDelete(product.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {editingProduct && (
        <Dialog open={!!editingProduct} onClose={handleEditClose}>
          <DialogTitle>Edit Product</DialogTitle>
          <DialogContent>
            <TextField
              label="Name"
              fullWidth
              margin="normal"
              value={editingProduct.name}
              onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
            />
            <TextField
              label="Description"
              fullWidth
              margin="normal"
              value={editingProduct.description}
              onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
            />
            <TextField
              label="Price"
              type="number"
              fullWidth
              margin="normal"
              value={editingProduct.price}
              onChange={(e) => setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) })}
            />
            <TextField
              label="Image URL"
              fullWidth
              margin="normal"
              value={editingProduct.imageUrl}
              onChange={(e) => setEditingProduct({ ...editingProduct, imageUrl: e.target.value })}
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

export default ProductList;

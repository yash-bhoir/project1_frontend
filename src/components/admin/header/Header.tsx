import React from 'react';
import { AppBar, Toolbar, InputBase, Box } from '@mui/material';
import { Search } from '@mui/icons-material';

const Header: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        marginTop: '0px',
        marginBottom : '30px',
        height : '50px'
      }}
    >
      <AppBar
        position="static"
        color="default"
        sx={{
          borderRadius: '20px',
          width: '80%',
          maxWidth: '600px',
          backgroundColor: '#fff'
         
        }}
      >
        <Toolbar sx={{ minHeight: '48px' }}> {/* Adjust Toolbar height */}
          <InputBase
            placeholder="Search…"
            startAdornment={<Search />}
            sx={{
                marginBottom: '8px',
              borderRadius: '30px',
              backgroundColor: '#fff', // Light background for better contrast
              width: '100%', // Full width for better alignment
            }}
          />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;

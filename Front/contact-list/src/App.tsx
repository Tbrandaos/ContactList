import { AppBar, Toolbar, Typography } from '@mui/material';
import React from 'react';
import People from './pages/People';

function App() {
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit" component="div">
            Photos
          </Typography>
        </Toolbar>
      </AppBar>
      <People></People>
    </div>
  );
}

export default App;

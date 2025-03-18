import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Box, Button, Container, Snackbar, TextField, Typography } from '@mui/material';

import { loginRequest } from '../../lib/api/login.ts';
import { RoutePath } from '../../lib/config/routeConfig.tsx';
import { login } from '../../store/slices/authSlice.ts';

export const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const response = await loginRequest(username, password);
    if (response && response.token) {
      dispatch(login(response.token));
      navigate(RoutePath.table);
    } else {
      setErrorMessage(response.error);
    }
  };

  const handleCloseSnackbar = () => {
    setErrorMessage('');
  };

  return (
    <Container maxWidth="sm">
      <Box display="flex" flexDirection="column" alignItems="center" mt={10}>
        <Typography variant="h4" gutterBottom>
          Log In
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <TextField
            label="Username"
            fullWidth
            margin="normal"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Login
          </Button>
        </form>
      </Box>

      <Snackbar
        open={!!errorMessage}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={errorMessage}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{
          '& .MuiSnackbarContent-root': {
            backgroundColor: '#f44336',
            color: '#fff',
            borderRadius: '4px',
            boxShadow: 3,
          },
        }}
      />
    </Container>
  );
};

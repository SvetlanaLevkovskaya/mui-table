import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Box, Button, CircularProgress, Container, TextField, Typography } from '@mui/material';

import { SnackbarNotification } from '../../components';
import { loginRequest } from '../../lib/api/login.ts';
import { RoutePath } from '../../lib/config/routeConfig.tsx';
import { login } from '../../store/slices/authSlice.ts';

export const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await loginRequest(username, password);
      if (response && response.token) {
        dispatch(login(response.token));
        navigate(RoutePath.table);
      } else {
        setErrorMessage(response.error);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage('Login failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setErrorMessage('');
  };

  return (
    <Container maxWidth="sm">
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h4" gutterBottom>
          Log In
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <TextField
            label="user[N]"
            fullWidth
            margin="normal"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="password"
            type="password"
            fullWidth
            margin="normal"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={isLoading}
            sx={{
              position: 'relative',
              '&.Mui-disabled': {
                backgroundColor: '#00a68c',
                opacity: 0.7,
              },
            }}
            startIcon={isLoading ? <CircularProgress size={12} color="inherit" /> : null}
          >
            Login
          </Button>
        </form>
      </Box>

      <SnackbarNotification message={errorMessage} onClose={handleCloseSnackbar} />
    </Container>
  );
};

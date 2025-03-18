import { useNavigate } from 'react-router-dom';

import { Box, Button, Typography } from '@mui/material';

import { RoutePath } from '../../lib/config/routeConfig.tsx';

export const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '80dvh',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexGrow: 1,
          px: 2,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            gap: 1.25,
          }}
        >
          <Typography variant="h4" fontWeight={500}>
            Oh, it seems you're a little lost...
          </Typography>
          <Typography variant="h6" fontWeight={500}>
            The page you are looking for does not exist
          </Typography>
          <Button
            sx={{
              mt: 2,
              px: 3,
              py: 1,
              borderRadius: 1,
              backgroundColor: '#2ee5ac',
              border: '1px solid #2ee5ac',
              color: 'white',
              transition: 'all 0.3s ease',
              '&:hover': {
                opacity: 0.7,
              },
            }}
            onClick={() => navigate(RoutePath.login)}
          >
            Go Home
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

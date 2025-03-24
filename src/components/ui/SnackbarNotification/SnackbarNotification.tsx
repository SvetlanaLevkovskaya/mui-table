import { Snackbar } from '@mui/material';

export const SnackbarNotification = ({
  message,
  onClose,
}: {
  message: string;
  onClose: () => void;
}) => (
  <Snackbar
    open={!!message}
    autoHideDuration={6000}
    onClose={onClose}
    message={message}
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
);

import { Snackbar } from '@mui/material';

export const SnackbarNotification = ({
  message,
  onClose,
}: {
  message: string;
  onClose: () => void;
}) => <Snackbar open={!!message} autoHideDuration={6000} onClose={onClose} message={message} />;

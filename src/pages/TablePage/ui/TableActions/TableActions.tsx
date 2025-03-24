import { Box, Button, CircularProgress } from '@mui/material';

type Props = {
  onAddRecord: () => void;
  onLogOut: () => void;
  isLoading: boolean;
};

export const TableActions = ({ onAddRecord, onLogOut, isLoading }: Props) => (
  <Box display="flex" justifyContent="space-between" width="100%" mb={2}>
    <Button
      variant="contained"
      color="primary"
      onClick={onAddRecord}
      disabled={isLoading}
      sx={{
        minWidth: 140,
        position: 'relative',
        '&.Mui-disabled': {
          backgroundColor: '#00a68c',
          opacity: 0.7,
        },
      }}
      startIcon={isLoading ? <CircularProgress size={12} color="inherit" /> : null}
    >
      {isLoading ? 'Adding...' : 'Add Record'}
    </Button>
    <Button variant="outlined" color="primary" onClick={onLogOut}>
      Log Out
    </Button>
  </Box>
);

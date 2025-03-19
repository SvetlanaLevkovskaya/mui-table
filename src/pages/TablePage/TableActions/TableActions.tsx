import { Box, Button } from '@mui/material';

type Props = {
  onAddRecord: () => void;
  onLogOut: () => void;
};

export const TableActions = ({ onAddRecord, onLogOut }: Props) => (
  <Box display="flex" justifyContent="space-between" width="100%" mb={2}>
    <Button variant="contained" color="primary" onClick={onAddRecord}>
      Add Record
    </Button>
    <Button variant="contained" color="secondary" onClick={onLogOut}>
      Log Out
    </Button>
  </Box>
);

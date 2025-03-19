import { createTheme } from '@mui/material';

export const themeConfig = createTheme({
  palette: {
    primary: { main: '#00dbb6', contrastText: '#fff' },
  },
  components: {
    MuiTabs: {
      styleOverrides: {
        root: {},
        indicator: ({ theme }) => ({
          backgroundColor: theme.palette.primary.main,
        }),
      },
    },
    MuiTab: {
      styleOverrides: {
        root: ({ theme }) => ({
          textTransform: 'capitalize',
          '&.Mui-selected': {
            color: theme.palette.primary.main,
            padding: '24px',
          },
        }),
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: '8px',
        },
        body: {
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          maxWidth: '124px',
        },
      },
    },
  },
});

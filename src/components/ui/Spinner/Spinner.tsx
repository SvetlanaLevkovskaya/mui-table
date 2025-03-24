import { useTheme } from '@mui/material/styles';

import s from './Spinner.module.css';

export const Spinner = () => {
  const theme = useTheme();
  return (
    <div id="preloder">
      <div className={s.loader}>
        <div
          style={{
            borderColor: `${theme.palette.primary.main} transparent ${theme.palette.primary.main} transparent`,
          }}
        />
        <div
          style={{
            borderColor: `${theme.palette.primary.main} transparent ${theme.palette.primary.main} transparent`,
          }}
        />
        <div
          style={{
            borderColor: `${theme.palette.primary.main} transparent ${theme.palette.primary.main} transparent`,
          }}
        />
      </div>
    </div>
  );
};

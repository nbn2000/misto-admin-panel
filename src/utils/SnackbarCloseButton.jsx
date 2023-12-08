/* eslint-disable react/prop-types */
/* eslint-disable import/no-extraneous-dependencies */
import { useSnackbar } from 'notistack';

import { IconButton } from '@mui/material/';

export function SnackbarCloseButton({ snackbarKey }) {
  const { closeSnackbar } = useSnackbar();

  return (
    <IconButton onClick={() => closeSnackbar(snackbarKey)} sx={{ color: 'white' }}>
      X
    </IconButton>
  );
}

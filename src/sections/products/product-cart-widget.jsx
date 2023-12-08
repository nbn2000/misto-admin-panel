import { styled } from '@mui/material/styles';

// eslint-disable-next-line perfectionist/sort-imports
import Button from '@mui/material/Button';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  zIndex: 999,
  right: 0,
  display: 'flex',
  cursor: 'pointer',
  position: 'fixed',
  alignItems: 'center',
  top: theme.spacing(16),
  height: theme.spacing(5),
  padding: theme.spacing(3),
  boxShadow: theme.customShadows.z20,
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.background.paper,
  borderTopLeftRadius: Number(theme.shape.borderRadius) * 2,
  borderBottomLeftRadius: Number(theme.shape.borderRadius) * 2,
  transition: theme.transitions.create('opacity'),
  '&:hover': { opacity: 0.72 },
}));

// ----------------------------------------------------------------------

export default function CartWidget() {
  return (
    <StyledRoot>
      <Button
        href="/products/add-new-card"
        startIcon={<Iconify icon="mingcute:plus-fill" />}
        variant="contained"
      >
        ADD NEW CARD
      </Button>
    </StyledRoot>
  );
}

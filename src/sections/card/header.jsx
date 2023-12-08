/* eslint-disable perfectionist/sort-named-imports */
import { Container, Breadcrumbs, Link, Typography } from '@mui/material';

export default function Header() {
  return (
    <Container maxWidth="xl" disableGutters sx={{ marginTop: '20px', marginBottom: '20px' }}>
      <Typography variant="h2" color="primary">
        Add new card
      </Typography>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          Home
        </Link>
        <Link underline="hover" color="inherit" href="/products">
          Products
        </Link>
        <Typography color="text.primary">Add New Card</Typography>
      </Breadcrumbs>
    </Container>
  );
}

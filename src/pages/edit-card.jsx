import { Helmet } from 'react-helmet-async';

import { EditCard } from 'src/sections/edit-card/view';

// ----------------------------------------------------------------------

export default function ProductsPage() {
  return (
    <>
      <Helmet>
        <title>Edit Card</title>
      </Helmet>

      <EditCard />
    </>
  );
}

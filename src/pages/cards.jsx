import { Helmet } from 'react-helmet-async';

import { Card } from 'src/sections/card/view';

// ----------------------------------------------------------------------

export default function ProductsPage() {
  return (
    <>
      <Helmet>
        <title>Add New Product</title>
      </Helmet>

      <Card />
    </>
  );
}

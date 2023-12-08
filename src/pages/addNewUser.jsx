import { Helmet } from 'react-helmet-async';

import { AddNewUser } from 'src/sections/add-new-user/view';

// ----------------------------------------------------------------------

export default function ProductsPage() {
  return (
    <>
      <Helmet>
        <title>Add New User</title>
      </Helmet>

      <AddNewUser />
    </>
  );
}

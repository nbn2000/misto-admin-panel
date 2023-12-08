import { Helmet } from 'react-helmet-async';

import { EditUser } from 'src/sections/edit-user/view';

// ----------------------------------------------------------------------

export default function ProductsPage() {
  return (
    <>
      <Helmet>
        <title>Edit User</title>
      </Helmet>

      <EditUser />
    </>
  );
}

import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';

export const IndexPage = lazy(() => import('src/pages/app'));
export const UserPage = lazy(() => import('src/pages/user'));
export const AddNewUser = lazy(() => import('src/pages/addNewUser'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
export const Card = lazy(() => import('src/pages/cards'));
export const EditUser = lazy(() => import('src/pages/editUser'));
export const EditCard = lazy(() => import('src/pages/edit-card'));

// ----------------------------------------------------------------------

export default function Router() {
  const auth = true;

  const routes = [
    {
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <IndexPage />, index: true },
        { path: 'user', element: <UserPage /> },
        { path: 'user/add-new-user', element: <AddNewUser /> },
        { path: 'user/:id', element: <EditUser /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'products/add-new-card', element: <Card /> },
        { path: 'products/:id', element: <EditCard /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ];

  const authenticatedRoutes = auth
    ? routes
    : [
        { path: 'login', element: <LoginPage /> },
        { path: '*', element: <Navigate to="/login" replace /> },
      ];

  return useRoutes(authenticatedRoutes);
}

import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { RootLayout } from '@/components/layouts';

const router = createBrowserRouter([
  {
    children: [
      {
        element: <>Home page</>,
        index: true
      },
      {
        element: <>Folders page</>,
        path: '/folders'
      },
      {
        element: <>Users page</>,
        path: '/users'
      }
    ],
    element: <RootLayout />,
    path: '/'
  }
]);

export const Router = () => {
  return <RouterProvider router={router} />;
};

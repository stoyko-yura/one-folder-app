import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { HomePage } from '@/pages';

const router = createBrowserRouter([
  {
    element: <HomePage />,
    path: '/'
  }
]);

export const Router = () => {
  return <RouterProvider router={router} />;
};

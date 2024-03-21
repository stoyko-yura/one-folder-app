import { RouterProvider, createBrowserRouter } from 'react-router-dom';

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
    element: <>Root layout</>,
    path: '/'
  }
]);

export const Router = () => {
  return <RouterProvider router={router} />;
};

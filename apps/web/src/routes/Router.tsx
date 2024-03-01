import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { RootLayout } from '@/components/layouts';
import { HomePage } from '@/pages';

const router = createBrowserRouter([
  {
    children: [
      {
        element: <HomePage />,
        index: true
      },
      {
        element: <div>Folders page</div>,
        path: '/folders'
      },
      {
        element: <div>Hello world</div>,
        path: '/folders/:folderId'
      },
      {
        element: <div>Create new folder page</div>,
        path: '/create-folder'
      },
      {
        element: <div>Software page</div>,
        path: '/software'
      },
      {
        element: <div>Users page</div>,
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

import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { Header } from '@/components/Header';
import { useAuth } from '@/hooks';

export const RootLayout = () => {
  const { checkAuth } = useAuth();

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <>
      <Header />

      <main>
        <Outlet />
      </main>
    </>
  );
};

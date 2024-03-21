import { Outlet } from 'react-router-dom';

import { Container, Header } from '@/components/ui';

export const RootLayout = () => {
  return (
    <>
      <Header />

      <main>
        <Container>
          <Outlet />
        </Container>
      </main>
    </>
  );
};

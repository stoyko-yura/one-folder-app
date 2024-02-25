import { Box, Container } from '@mantine/core';
import { Outlet } from 'react-router-dom';

import { Header } from '@/components/ui';

export const RootLayout = () => {
  return (
    <>
      <Header />

      <Box component='main'>
        <Container py={20} size='xl'>
          <Outlet />
        </Container>
      </Box>
    </>
  );
};

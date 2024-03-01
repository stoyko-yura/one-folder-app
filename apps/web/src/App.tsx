import '@mantine/carousel/styles.css';
import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core';
import React from 'react';
import { QueryClientProvider } from 'react-query';

import { themeConfig } from '@/config';
import { Router } from '@/routes';
import { queryClient } from '@/utills';

const App = () => {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <MantineProvider theme={themeConfig}>
          <Router />
        </MantineProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;

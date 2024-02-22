import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core';
import React from 'react';

import { Router } from '@/routes';

import { themeConfig } from './config';

const App = () => {
  return (
    <React.StrictMode>
      <MantineProvider theme={themeConfig}>
        <Router />
      </MantineProvider>
    </React.StrictMode>
  );
};

export default App;

import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom/client';

import { theme } from '@/config';

import { App } from './App';
import { AuthProvider } from './components/providers';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <App />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);

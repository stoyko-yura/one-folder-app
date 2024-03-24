import { AppBar, Box, Toolbar } from '@mui/material';

import { Logo, MobileNavbar, Navbar } from './_locals';

export const Header = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar color='default' position='static'>
        <Toolbar>
          <MobileNavbar />

          <Box sx={{ mr: { md: '20px', xs: '0px' } }}>
            <Logo />
          </Box>

          <Navbar />

          <Box sx={{ flexGrow: 1 }} />

          <div>User menu</div>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

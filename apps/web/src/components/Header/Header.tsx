import { AppBar, Box, Stack, Toolbar } from '@mui/material';

import { useAuth } from '@/hooks';

import { AuthMenu, Logo, MobileNavbar, Navbar, UserMenu } from './_locals';

export const Header = () => {
  const { user } = useAuth();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar color='default' position='static'>
        <Toolbar>
          <Stack alignItems='center' columnGap={2} direction='row'>
            <MobileNavbar />

            <Box sx={{ display: { sm: 'block', xs: 'none' } }}>
              <Logo />
            </Box>

            <Navbar />
          </Stack>

          <Box sx={{ flexGrow: 1 }} />

          {user ? <UserMenu user={user} /> : <AuthMenu />}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

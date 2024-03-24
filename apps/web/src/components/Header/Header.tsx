import { AppBar, Box, Stack, Toolbar } from '@mui/material';
import type { UserData } from '@one-folder-app/types';

import { AuthMenu, Logo, MobileNavbar, Navbar, UserMenu } from './_locals';

const IS_AUTH = false;

export const Header = () => {
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

          {IS_AUTH ? <UserMenu user={{} as UserData} /> : <AuthMenu />}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

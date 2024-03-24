import { Button, Stack } from '@mui/material';

export const AuthMenu = () => {
  return (
    <Stack columnGap={2} direction='row'>
      <Button variant='contained'>Sign in</Button>
      <Button>Sign Up</Button>
    </Stack>
  );
};

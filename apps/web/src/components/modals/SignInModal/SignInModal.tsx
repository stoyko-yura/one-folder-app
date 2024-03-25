import CloseIcon from '@mui/icons-material/Close';
import { IconButton, Stack, Typography } from '@mui/material';

import { SignInForm } from '@/components/forms';

interface SignInModalProps {
  onClose: () => void;
}

export const SignInModal = ({ onClose }: SignInModalProps) => {
  return (
    <>
      <Stack alignItems='center' direction='row' justifyContent='space-between' sx={{ mb: 2 }}>
        <Typography variant='h5'>Sign in</Typography>

        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Stack>

      <SignInForm />
    </>
  );
};

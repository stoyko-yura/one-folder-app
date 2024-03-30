import CloseIcon from '@mui/icons-material/Close';
import { IconButton, Stack, Typography } from '@mui/material';

import { SignUpForm } from '@/components/forms';

interface SignUpModalProps {
  onClose: () => void;
}

export const SignUpModal = ({ onClose }: SignUpModalProps) => {
  return (
    <>
      <Stack alignItems='center' direction='row' justifyContent='space-between' sx={{ mb: 2 }}>
        <Typography variant='h5'>Sign up</Typography>

        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Stack>

      <SignUpForm />
    </>
  );
};

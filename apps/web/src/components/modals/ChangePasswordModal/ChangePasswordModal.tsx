import CloseIcon from '@mui/icons-material/Close';
import { IconButton, Stack, Typography } from '@mui/material';

import { ChangePasswordForm } from '@/components/forms';

interface ChangePasswordModalProps {
  onClose: () => void;
}

export const ChangePasswordModal = ({ onClose }: ChangePasswordModalProps) => {
  return (
    <>
      <Stack alignItems='center' direction='row' justifyContent='space-between' sx={{ mb: 2 }}>
        <Typography variant='h5'>Change password</Typography>

        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Stack>

      <ChangePasswordForm />
    </>
  );
};

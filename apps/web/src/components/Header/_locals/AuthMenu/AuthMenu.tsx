import { Box, Button, Modal, Stack } from '@mui/material';
import { useState } from 'react';

import { SignInModal } from '@/components/modals';

export const AuthMenu = () => {
  const [isSignInModalOpen, setIsSignInModalOpen] = useState<boolean>(false);

  const onOpenSignInModal = () => {
    setIsSignInModalOpen(true);
  };

  const onCloseSignInModal = () => {
    setIsSignInModalOpen(false);
  };

  return (
    <Box>
      <Stack columnGap={2} direction='row'>
        <Button variant='contained' onClick={onOpenSignInModal}>
          Sign in
        </Button>
        <Button>Sign Up</Button>
      </Stack>

      <Modal open={isSignInModalOpen} onClose={onCloseSignInModal}>
        <Box
          sx={{
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            left: '50%',
            p: 2,
            position: 'absolute',
            top: '33%',
            transform: 'translate(-50%, -50%)',
            width: 400
          }}
        >
          <SignInModal onClose={onCloseSignInModal} />
        </Box>
      </Modal>
    </Box>
  );
};

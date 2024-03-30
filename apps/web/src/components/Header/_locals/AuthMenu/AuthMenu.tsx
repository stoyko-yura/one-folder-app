import { Box, Button, Modal, Stack } from '@mui/material';
import { useState } from 'react';

import { SignInModal, SignUpModal } from '@/components/modals';

export const AuthMenu = () => {
  const [isSignInModalOpen, setIsSignInModalOpen] = useState<boolean>(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState<boolean>(false);

  const onOpenSignInModal = () => {
    setIsSignInModalOpen(true);
  };

  const onCloseSignInModal = () => {
    setIsSignInModalOpen(false);
  };

  const onOpenSignUpModal = () => {
    setIsSignUpModalOpen(true);
  };

  const onCloseSignUpModal = () => {
    setIsSignUpModalOpen(false);
  };

  return (
    <Box>
      <Stack columnGap={2} direction='row'>
        <Button variant='contained' onClick={onOpenSignInModal}>
          Sign in
        </Button>
        <Button variant='outlined' onClick={onOpenSignUpModal}>
          Sign Up
        </Button>
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

      <Modal open={isSignUpModalOpen} onClose={onCloseSignUpModal}>
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
          <SignUpModal onClose={onCloseSignUpModal} />
        </Box>
      </Modal>
    </Box>
  );
};

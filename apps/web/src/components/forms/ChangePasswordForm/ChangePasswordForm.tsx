import { Button, ButtonGroup, Stack } from '@mui/material';
import type { ChangePasswordRequestBody } from '@one-folder-app/types';
import { FormProvider, useForm } from 'react-hook-form';

import { InputPassword } from '@/components/ui';
import { useAuth } from '@/hooks';

export const ChangePasswordForm = () => {
  const { user } = useAuth();

  const methods = useForm<ChangePasswordRequestBody>({
    defaultValues: {
      newPassword: '',
      password: '',
      userId: user?.id
    }
  });

  const { register, handleSubmit } = methods;

  const onSubmitForm = (values: ChangePasswordRequestBody) => {
    console.log(values);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <Stack rowGap={2} sx={{ mb: 4 }}>
          <InputPassword required label='Password' {...register('password')} />
          <InputPassword required label='New password' {...register('newPassword')} />
        </Stack>

        <ButtonGroup fullWidth variant='contained'>
          <Button type='submit'>Change password</Button>
        </ButtonGroup>
      </form>
    </FormProvider>
  );
};

import { Button, ButtonGroup, Stack } from '@mui/material';
import type { SignUpRequestBody } from '@one-folder-app/types';
import { FormProvider, useForm } from 'react-hook-form';

import { InputField, InputPassword } from '@/components/ui';
import { useAuth } from '@/hooks';

export const SignUpForm = () => {
  const { onSignUp } = useAuth();

  const methods = useForm<SignUpRequestBody>({
    defaultValues: {
      bio: '',
      email: '',
      login: '',
      password: '',
      username: ''
    }
  });

  const { register, handleSubmit } = methods;

  const onSubmitForm = (values: SignUpRequestBody) => {
    onSignUp(values);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <Stack rowGap={2} sx={{ mb: 4 }}>
          <InputField required label='Email' {...register('email')} type='email' />
          <InputField required label='Login' {...register('login')} />
          <InputPassword required label='Password' {...register('password')} />
        </Stack>

        <ButtonGroup fullWidth variant='contained'>
          <Button>Sign in</Button>
          <Button type='submit'>Sign up</Button>
        </ButtonGroup>
      </form>
    </FormProvider>
  );
};

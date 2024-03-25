import { Button, ButtonGroup, Link, Stack } from '@mui/material';
import type { SignInRequestBody } from '@one-folder-app/types';
import { FormProvider, useForm } from 'react-hook-form';
import { Link as RouterLink } from 'react-router-dom';

import { InputField, InputPassword } from '@/components/ui';
import { useAuth } from '@/hooks';

export const SignInForm = () => {
  const { onSignIn } = useAuth();

  const methods = useForm<SignInRequestBody>({
    defaultValues: {
      login: '',
      password: ''
    }
  });

  const { register, handleSubmit } = methods;

  const onSubmitForm = (values: SignInRequestBody) => {
    onSignIn(values);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <Stack rowGap={2} sx={{ mb: 4 }}>
          <InputField required label='Login' {...register('login')} />
          <Stack>
            <InputPassword required label='Password' {...register('password')} />
            <Link component={RouterLink} sx={{ alignSelf: 'flex-end' }} to='/forgot-password'>
              Forgot password?
            </Link>
          </Stack>
        </Stack>

        <ButtonGroup fullWidth variant='contained'>
          <Button>Sign up</Button>
          <Button type='submit'>Sign in</Button>
        </ButtonGroup>
      </form>
    </FormProvider>
  );
};

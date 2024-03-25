import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import type { InputBaseProps } from '@mui/material';
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import { forwardRef, useState } from 'react';

interface InputPasswordProps extends InputBaseProps {
  label?: string;
}
// eslint-disable-next-line react/display-name
export const InputPassword = forwardRef(
  ({ label = 'Password', ...props }: InputPasswordProps, ref) => {
    const [isShowPassword, setIsShowPassword] = useState<boolean>(false);

    const onToggleShowPassowrd = () => setIsShowPassword((prev) => !prev);

    return (
      <FormControl variant='outlined'>
        <InputLabel htmlFor='standard-input-password'>{label}</InputLabel>
        <OutlinedInput
          {...props}
          ref={ref}
          id='standard-input-password'
          label={label}
          type={isShowPassword ? 'text' : 'password'}
          endAdornment={
            <InputAdornment position='end'>
              <IconButton onClick={onToggleShowPassowrd}>
                {isShowPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
    );
  }
);

import type { InputBaseProps } from '@mui/material';
import { FormControl, InputLabel, OutlinedInput } from '@mui/material';
import { forwardRef } from 'react';

interface InputFieldProps extends InputBaseProps {
  label?: string;
}

// eslint-disable-next-line react/display-name
export const InputField = forwardRef(({ label = 'Label', ...props }: InputFieldProps, ref) => {
  return (
    <FormControl>
      <InputLabel htmlFor={`standard-input-field-${label}`}>{label}</InputLabel>
      <OutlinedInput {...props} ref={ref} id={`standard-input-field-${label}`} label={label} />
    </FormControl>
  );
});

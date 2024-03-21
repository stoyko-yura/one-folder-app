import type { PropsWithChildren } from 'react';

interface ButtonProps extends PropsWithChildren {}

export const Button = ({ children }: ButtonProps) => {
  return <button>{children}</button>;
};

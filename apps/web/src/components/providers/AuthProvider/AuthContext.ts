import type { SignInRequestBody, SignUpRequestBody, UserData } from '@one-folder-app/types';
import { createContext } from 'react';

export interface AuthContextValues {
  user: UserData | null;
  checkAuth: () => Promise<void>;
  onSignIn: (values: SignInRequestBody) => Promise<void>;
  onSignUp: (values: SignUpRequestBody) => Promise<void>;
  onLogOut: () => void;
}

export const AuthContext = createContext<AuthContextValues | null>(null);

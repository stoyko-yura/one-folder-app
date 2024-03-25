import type { SignInRequestBody, UserData } from '@one-folder-app/types';
import { createContext } from 'react';

export interface AuthContextValues {
  user: UserData | null;
  checkAuth: () => Promise<void>;
  onSignIn: (values: SignInRequestBody) => Promise<void>;
  onLogOut: () => void;
}

export const AuthContext = createContext<AuthContextValues | null>(null);

import type {
  GetMeResponseBody,
  SignInRequestBody,
  SignInResponseBody,
  UserData
} from '@one-folder-app/types';
import { useMemo, useState, type PropsWithChildren } from 'react';

import { AuthContext } from './AuthContext';

export interface AuthProviderProps extends PropsWithChildren {}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserData | null>(null);

  const onSignIn = async (values: SignInRequestBody) => {
    const response = await fetch('http://localhost:3000/api/auth/sign-in', {
      body: JSON.stringify(values),
      headers: { 'Content-Type': 'application/json' },
      method: 'POST'
    });

    const data: SignInResponseBody = await response.json();

    if (data.token) {
      window.localStorage.setItem('token', data.token);
    }

    setUser(data.user);
  };

  const onLogOut = () => {
    window.localStorage.removeItem('token');

    setUser(null);
  };

  const checkAuth = async () => {
    const token = window.localStorage.getItem('token');

    if (token) {
      const response = await fetch('http://localhost:3000/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      });

      const data: GetMeResponseBody = await response.json();

      if (data.token) {
        window.localStorage.setItem('token', data.token);
      }

      setUser(data.user);
    }
  };

  const authContextValues = useMemo(() => ({ checkAuth, onLogOut, onSignIn, user }), [user]);

  return <AuthContext.Provider value={authContextValues}>{children}</AuthContext.Provider>;
};

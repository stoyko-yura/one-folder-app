import { useContext } from 'react';

import type { AuthContextValues } from '@/components/providers';
import { AuthContext } from '@/components/providers';

export const useAuth = () => {
  return useContext(AuthContext) as AuthContextValues;
};

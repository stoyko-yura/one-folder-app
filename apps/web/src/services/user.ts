import type { UserResponse } from '@one-folder-app/types';

import { axiosApi } from '@/utills';

export const getUserById = async (userId: string): Promise<UserResponse> => {
  return axiosApi.get(`/users/${userId}`).then((res) => res.data);
};

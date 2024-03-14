import { dbEnums } from '@/config';
import type { GetRolesRequest, GetRolesResponse } from '@/types';
import { errorHandler, type HttpResponseError } from '@/utils';

// Get roles
export const getRoles = (req: GetRolesRequest, res: GetRolesResponse) => {
  try {
    const { roles } = dbEnums;

    res.status(200).json({
      message: 'Roles loaded',
      roles,
      success: true
    });
  } catch (error) {
    errorHandler(error as HttpResponseError, res);
  }
};

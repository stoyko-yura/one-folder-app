import type { Response } from 'express';

import { dbEnums } from '@/config';
import type { GetFolderAccessesRequest, GetFolderAccessesResponse } from '@/types';
import { errorHandler, type HttpResponseError } from '@/utils';

// Get folder's accesses
export const getFolderAccesses = (
  req: GetFolderAccessesRequest,
  res: GetFolderAccessesResponse
) => {
  try {
    const { accesses } = dbEnums;

    res.status(200).json({
      accesses,
      message: 'Accesses loaded',
      success: true
    });
  } catch (error) {
    errorHandler(error as HttpResponseError, res as Response);
  }
};

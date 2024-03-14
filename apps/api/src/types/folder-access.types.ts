import type { GetFolderAccessesResponseBody } from '@one-folder-app/types';
import type { Request, Response } from 'express';

// Folder access requests and responses
// Get folder's accesses
export type GetFolderAccessesRequest = Request;

export type GetFolderAccessesResponse = Response<GetFolderAccessesResponseBody>;

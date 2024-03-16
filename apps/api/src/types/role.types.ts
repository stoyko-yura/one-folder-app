import type { GetRolesResponseBody } from '@one-folder-app/types';
import type { Request, Response } from 'express';

// Role's requests and responses
// Get roles
export type GetRolesRequest = Request;

export type GetRolesResponse = Response<GetRolesResponseBody>;

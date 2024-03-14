import type {
  DeleteUserRequestParams,
  DeleteUserResponseBody,
  EmptyObject,
  GetUserCommentsRequestParams,
  GetUserCommentsRequestQueries,
  GetUserCommentsResponseBody,
  GetUserFoldersRequestParams,
  GetUserFoldersRequestQueries,
  GetUserFoldersResponseBody,
  GetUserRequestParams,
  GetUserResponseBody,
  GetUsersRequestQueries,
  GetUsersResponseBody,
  PutUserRequestBody,
  PutUserRequestParams,
  PutUserResponseBody
} from '@one-folder-app/types';
import type { Request, Response } from 'express';

// User's requests and responses
// Get user
export type GetUserRequest = Request<
  GetUserRequestParams,
  GetUserResponseBody,
  EmptyObject,
  EmptyObject
>;

export type GetUserResponse = Response<GetUserResponseBody>;

// Get users
export type GetUsersRequest = Request<
  EmptyObject,
  GetUsersResponseBody,
  EmptyObject,
  GetUsersRequestQueries
>;

export type GetUsersResponse = Response<GetUsersResponseBody>;

// Get user's folders
export type GetUserFoldersRequest = Request<
  GetUserFoldersRequestParams,
  GetUserFoldersResponseBody,
  EmptyObject,
  GetUserFoldersRequestQueries
>;

export type GetUserFoldersResponse = Response<GetUserFoldersResponseBody>;

// Get user's comments
export type GetUserCommentsRequest = Request<
  GetUserCommentsRequestParams,
  GetUserCommentsResponseBody,
  EmptyObject,
  GetUserCommentsRequestQueries
>;

export type GetUserCommentsResponse = Response<GetUserCommentsResponseBody>;

// Put user
export type PutUserRequest = Request<
  PutUserRequestParams,
  PutUserResponseBody,
  PutUserRequestBody,
  EmptyObject
>;

export type PutUserResponse = Response<PutUserResponseBody>;

// Delete user
export type DeleteUserRequest = Request<
  DeleteUserRequestParams,
  DeleteUserResponseBody,
  EmptyObject,
  EmptyObject
>;

export type DeleteUserResponse = Response<DeleteUserResponseBody>;

import type {
  DeleteFolderRequestParams,
  DeleteFolderResponseBody,
  EmptyObject,
  GetFolderCommentsRequestParams,
  GetFolderCommentsRequestQueries,
  GetFolderCommentsResponseBody,
  GetFolderRatingsRequestParams,
  GetFolderRatingsRequestQueries,
  GetFolderRatingsResponseBody,
  GetFolderRequestParams,
  GetFolderResponseBody,
  GetFolderSoftwareRequestParams,
  GetFolderSoftwareRequestQueries,
  GetFolderSoftwareResponseBody,
  GetFoldersRequestQueries,
  GetFoldersResponseBody,
  PostFolderRequestBody,
  PostFolderResponseBody,
  PutFolderRequestBody,
  PutFolderRequestParams,
  PutFolderResponseBody
} from '@one-folder-app/types';
import type { Request, Response } from 'express';

// Folder's request and response
// Get folder
export type GetFolderRequest = Request<
  GetFolderRequestParams,
  GetFolderResponseBody,
  EmptyObject,
  EmptyObject
>;

export type GetFolderResponse = Response<GetFolderResponseBody>;

// Get folders
export type GetFoldersRequest = Request<
  EmptyObject,
  GetFoldersResponseBody,
  EmptyObject,
  GetFoldersRequestQueries
>;

export type GetFoldersResponse = Response<GetFoldersResponseBody>;

// Get folder's comments
export type GetFolderCommentsRequest = Request<
  GetFolderCommentsRequestParams,
  GetFolderCommentsResponseBody,
  EmptyObject,
  GetFolderCommentsRequestQueries
>;

export type GetFolderCommentsResponse = Response<GetFolderCommentsResponseBody>;

// Get folder's ratings
export type GetFolderRatingsRequest = Request<
  GetFolderRatingsRequestParams,
  GetFolderRatingsResponseBody,
  EmptyObject,
  GetFolderRatingsRequestQueries
>;

export type GetFolderRatingsResponse = Response<GetFolderRatingsResponseBody>;

// Get folder's software
export type GetFolderSoftwareRequest = Request<
  GetFolderSoftwareRequestParams,
  GetFolderSoftwareResponseBody,
  EmptyObject,
  GetFolderSoftwareRequestQueries
>;

export type GetFolderSoftwareResponse = Response<GetFolderSoftwareResponseBody>;

// Post folder
export type PostFolderRequest = Request<
  EmptyObject,
  PostFolderResponseBody,
  PostFolderRequestBody,
  EmptyObject
>;

export type PostFolderResponse = Response<PostFolderResponseBody>;

// Put folder
export type PutFolderRequest = Request<
  PutFolderRequestParams,
  PutFolderResponseBody,
  PutFolderRequestBody,
  EmptyObject
>;

export type PutFolderResponse = Response<PutFolderResponseBody>;

// Delete folder
export type DeleteFolderRequest = Request<
  DeleteFolderRequestParams,
  DeleteFolderResponseBody,
  EmptyObject,
  EmptyObject
>;

export type DeleteFolderResponse = Response<DeleteFolderResponseBody>;

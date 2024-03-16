import type {
  DeleteSoftwareRequestParams,
  DeleteSoftwareResponseBody,
  EmptyObject,
  GetSoftwareCategoriesRequestParams,
  GetSoftwareCategoriesRequestQueries,
  GetSoftwareCategoriesResponseBody,
  GetSoftwareFoldersRequestParams,
  GetSoftwareFoldersRequestQueries,
  GetSoftwareFoldersResponseBody,
  GetSoftwareRatingsRequestParams,
  GetSoftwareRatingsRequestQueries,
  GetSoftwareRatingsResponseBody,
  GetSoftwareRequestParams,
  GetSoftwareResponseBody,
  GetSoftwaresRequestQueries,
  GetSoftwaresResponseBody,
  PostSoftwareRequestBody,
  PostSoftwareResponseBody,
  PutSoftwareCategoriesRequestBody,
  PutSoftwareCategoriesRequestParams,
  PutSoftwareCategoriesResponseBody,
  PutSoftwareRequestBody,
  PutSoftwareRequestParams,
  PutSoftwareResponseBody
} from '@one-folder-app/types';
import type { Request, Response } from 'express';

// Software's requests and responses
// Get software
export type GetSoftwareRequest = Request<
  GetSoftwareRequestParams,
  GetSoftwareResponseBody,
  EmptyObject,
  EmptyObject
>;

export type GetSoftwareResponse = Response<GetSoftwareResponseBody>;

// Get softwares
export type GetSoftwaresRequest = Request<
  EmptyObject,
  GetSoftwaresResponseBody,
  EmptyObject,
  GetSoftwaresRequestQueries
>;

export type GetSoftwaresResponse = Response<GetSoftwaresResponseBody>;

// Get softwares' ratings
export type GetSoftwareRatingsRequest = Request<
  GetSoftwareRatingsRequestParams,
  GetSoftwareRatingsResponseBody,
  EmptyObject,
  GetSoftwareRatingsRequestQueries
>;

export type GetSoftwareRatingsResponse = Response<GetSoftwareRatingsResponseBody>;

// Get software's categories
export type GetSoftwareCategoriesRequest = Request<
  GetSoftwareCategoriesRequestParams,
  GetSoftwareCategoriesResponseBody,
  EmptyObject,
  GetSoftwareCategoriesRequestQueries
>;

export type GetSoftwareCategoriesResponse = Response<GetSoftwareCategoriesResponseBody>;

// Get software's folders
export type GetSoftwareFoldersRequest = Request<
  GetSoftwareFoldersRequestParams,
  GetSoftwareFoldersResponseBody,
  EmptyObject,
  GetSoftwareFoldersRequestQueries
>;

export type GetSoftwareFoldersResponse = Response<GetSoftwareFoldersResponseBody>;

// Post software
export type PostSoftwareRequest = Request<
  EmptyObject,
  PostSoftwareResponseBody,
  PostSoftwareRequestBody,
  EmptyObject
>;

export type PostSoftwareResponse = Response<PostSoftwareResponseBody>;

// Put software
export type PutSoftwareRequest = Request<
  PutSoftwareRequestParams,
  PutSoftwareResponseBody,
  PutSoftwareRequestBody,
  EmptyObject
>;

export type PutSoftwareResponse = Response<PutSoftwareResponseBody>;

// Put software's categories
export type PutSoftwareCategoriesRequest = Request<
  PutSoftwareCategoriesRequestParams,
  PutSoftwareCategoriesResponseBody,
  PutSoftwareCategoriesRequestBody,
  EmptyObject
>;

export type PutSoftwareCategoriesResponse = Response<PutSoftwareCategoriesResponseBody>;

// Delete software
export type DeleteSoftwareRequest = Request<
  DeleteSoftwareRequestParams,
  DeleteSoftwareResponseBody,
  DeleteSoftwareResponseBody,
  EmptyObject
>;

export type DeleteSoftwareResponse = Response<DeleteSoftwareResponseBody>;

import type {
  DeleteCategoryRequestParams,
  DeleteCategoryResponseBody,
  EmptyObject,
  GetCategoriesRequestQueries,
  GetCategoriesResponseBody,
  GetCategoryRequestParams,
  GetCategoryResponseBody,
  GetCategorySoftwareRequestParams,
  GetCategorySoftwareRequestQueries,
  GetCategorySoftwareResponseBody,
  PostCategoryRequestBody,
  PostCategoryResponseBody,
  PutCategoryRequestBody,
  PutCategoryRequestParams,
  PutCategoryResponseBody
} from '@one-folder-app/types';
import type { Request, Response } from 'express';

// Category's requests and responses
// Get category
export type GetCategoryRequest = Request<
  GetCategoryRequestParams,
  GetCategoryResponseBody,
  EmptyObject,
  EmptyObject
>;

export type GetCategoryResponse = Response<GetCategoryResponseBody>;

// Get categories
export type GetCategoriesRequest = Request<
  EmptyObject,
  GetCategoriesResponseBody,
  EmptyObject,
  GetCategoriesRequestQueries
>;

export type GetCategoriesResponse = Response<GetCategoriesResponseBody>;

// Get category's softwares
export type GetCategorySoftwareRequest = Request<
  GetCategorySoftwareRequestParams,
  GetCategorySoftwareResponseBody,
  EmptyObject,
  GetCategorySoftwareRequestQueries
>;

export type GetCategorySoftwareResponse = Response<GetCategorySoftwareResponseBody>;

// Post category
export type PostCategoryRequest = Request<
  EmptyObject,
  PostCategoryResponseBody,
  PostCategoryRequestBody,
  EmptyObject
>;

export type PostCategoryResponse = Response<PostCategoryResponseBody>;

// Put category
export type PutCategoryRequest = Request<
  PutCategoryRequestParams,
  PutCategoryResponseBody,
  PutCategoryRequestBody,
  EmptyObject
>;

export type PutCategoryResponse = Response<PutCategoryResponseBody>;

// Delete category
export type DeleteCategoryRequest = Request<
  DeleteCategoryRequestParams,
  DeleteCategoryResponseBody,
  EmptyObject,
  EmptyObject
>;

export type DeleteCategoryResponse = Response<DeleteCategoryResponseBody>;

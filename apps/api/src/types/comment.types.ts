import type {
  DeleteCommentRequestParams,
  DeleteCommentResponseBody,
  EmptyObject,
  GetCategoriesRequestQueries,
  GetCommentRatingsRequestParams,
  GetCommentRatingsRequestQueries,
  GetCommentRatingsResponseBody,
  GetCommentRequestParams,
  GetCommentResponseBody,
  GetCommentsResponseBody,
  PostCommentRequestBody,
  PostCommentResponseBody,
  PutCommentRequestBody,
  PutCommentRequestParams,
  PutCommentResponseBody
} from '@one-folder-app/types';
import type { Request, Response } from 'express';

// Comment's requests and responses
// Get comment
export type GetCommentRequest = Request<
  GetCommentRequestParams,
  GetCommentResponseBody,
  EmptyObject,
  EmptyObject
>;

export type GetCommentResponse = Response<GetCommentResponseBody>;

// Get comments
export type GetCommentsRequest = Request<
  EmptyObject,
  GetCommentsResponseBody,
  EmptyObject,
  GetCategoriesRequestQueries
>;

export type GetCommentsResponse = Response<GetCommentsResponseBody>;

// Get comment's ratings
export type GetCommentRatingsRequest = Request<
  GetCommentRatingsRequestParams,
  GetCommentRatingsResponseBody,
  EmptyObject,
  GetCommentRatingsRequestQueries
>;

export type GetCommentRatingsResponse = Response<GetCommentRatingsResponseBody>;

// Post comment
export type PostCommentRequest = Request<
  EmptyObject,
  PostCommentResponseBody,
  PostCommentRequestBody,
  EmptyObject
>;

export type PostCommentResponse = Response<PostCommentResponseBody>;

// Put comment
export type PutCommentRequest = Request<
  PutCommentRequestParams,
  PutCommentResponseBody,
  PutCommentRequestBody,
  EmptyObject
>;

export type PutCommentResponse = Response<PutCommentResponseBody>;

// Delete comment
export type DeleteCommentRequest = Request<
  DeleteCommentRequestParams,
  DeleteCommentResponseBody,
  EmptyObject,
  EmptyObject
>;

export type DeleteCommentResponse = Response<DeleteCommentResponseBody>;

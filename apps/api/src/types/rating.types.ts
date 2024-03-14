import type {
  DeleteRatingRequestParams,
  DeleteRatingResponseBody,
  EmptyObject,
  GetRatingRequestParams,
  GetRatingResponseBody,
  GetRatingsRequestQueries,
  GetRatingsResponseBody,
  PostRatingRequestBody,
  PostRatingResponseBody,
  PutRatingRequestBody,
  PutRatingRequestParams,
  PutRatingResponseBody
} from '@one-folder-app/types';
import type { Request, Response } from 'express';

import type { EntityData } from '@/types';

export interface PutRatingWithEntityData extends EntityData {
  averageRating: number;
}

// Rating's requests and responses
// Get rating
export type GetRatingRequest = Request<
  GetRatingRequestParams,
  GetRatingResponseBody,
  EmptyObject,
  EmptyObject
>;

export type GetRatingResponse = Response<GetRatingResponseBody>;

// Get ratings
export type GetRatingsRequest = Request<
  EmptyObject,
  GetRatingsResponseBody,
  EmptyObject,
  GetRatingsRequestQueries
>;

export type GetRatingsResponse = Response<GetRatingsResponseBody>;

// Post rating
export type PostRatingRequest = Request<
  EmptyObject,
  PostRatingResponseBody,
  PostRatingRequestBody,
  EmptyObject
>;

export type PostRatingResponse = Response<PostRatingResponseBody>;

// Put rating
export type PutRatingRequest = Request<
  PutRatingRequestParams,
  PutRatingResponseBody,
  PutRatingRequestBody,
  EmptyObject
>;

export type PutRatingResponse = Response<PutRatingResponseBody>;

// Delete rating
export type DeleteRatingRequest = Request<
  DeleteRatingRequestParams,
  DeleteRatingResponseBody,
  EmptyObject,
  EmptyObject
>;

export type DeleteRatingResponse = Response<DeleteRatingResponseBody>;

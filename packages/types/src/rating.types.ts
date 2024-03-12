import type { Comment, Folder, Rating, Software } from '@one-folder-app/database';

import type { BaseResponseBody } from './common.types';
import type { Links, RatingPaginationOptions } from './pagination.types';

export interface RatingData extends Rating {
  folder?: Folder;
  software?: Software;
  comment?: Comment;
}

// Get rating
export interface GetRatingRequestParams {
  ratingId: string;
}

export interface GetRatingResponseBody extends BaseResponseBody {
  rating: RatingData;
}

// Get ratings
export interface GetRatingsPaginationParams extends RatingPaginationOptions {}

export interface GetRatingsRequestQueries extends RatingPaginationOptions {
  page: number;
}

export interface GetRatingsResponseBody extends BaseResponseBody {
  ratings: RatingData[];
  links: Links;
  totalRatings: number;
  totalPages: number;
}

// Post rating
export interface PostRatingRequestBody {
  userId: string;
  rating: number;
  commentId?: string;
  folderId?: string;
  softwareId?: string;
}

export interface PostRatingResponseBody extends BaseResponseBody {
  rating: RatingData;
  folder?: Folder;
  software?: Software;
  comment?: Comment;
}

// Put rating
export interface PutRatingRequestParams {
  ratingId: string;
}

export interface PutRatingRequestBody {
  rating: number;
  userId?: string;
}

export interface PutRatingResponseBody extends BaseResponseBody {
  rating: RatingData;
  folder?: Folder;
  software?: Software;
  comment?: Comment;
}

// Delete rating
export interface DeleteRatingRequestParams {
  ratingId: string;
}

export interface DeleteRatingResponseBody extends BaseResponseBody {}

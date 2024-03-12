import type { Comment, Rating } from '@one-folder-app/database';

import type { BaseResponseBody } from './common.types';
import type {
  CommentPaginationOptions,
  CommentRatingsPaginationOptions,
  Links
} from './pagination.types';

export interface CommentData extends Comment {}

// Get comment
export interface GetCommentRequestParams {
  commentId: string;
}

export interface GetCommentResponseBody extends BaseResponseBody {
  comment: CommentData;
}

// Get comments
export interface GetCommentsPaginationParams extends CommentPaginationOptions {}

export interface GetCommentsRequestQueries extends CommentPaginationOptions {
  page: number;
}

export interface GetCommentsResponseBody extends BaseResponseBody {
  comments: CommentData[];
  links: Links;
  totalComments: number;
  totalPages: number;
}

// Get comment's ratings
export interface GetCommentRatingsRequestParams {
  commentId: string;
}

export interface GetCommentRatingsPaginationParams extends CommentRatingsPaginationOptions {}

export interface GetCommentRatingsRequestQueries extends CommentRatingsPaginationOptions {
  page: number;
}

export interface GetCommentRatingsResponseBody extends BaseResponseBody {
  commentRatings: Rating[];
  links: Links;
  totalCommentRatings: number;
  totalPages: number;
}

// Post comment
export interface PostCommentRequestBody {
  authorId: string;
  folderId: string;
  message: string;
}

export interface PostCommentResponseBody extends BaseResponseBody {
  comment: CommentData;
}

// Put comment
export interface PutCommentRequestParams {
  commentId: string;
}

export interface PutCommentRequestBody {
  message: string;
}

export interface PutCommentResponseBody extends BaseResponseBody {
  comment: CommentData;
}

// Delete comment
export interface DeleteCommentRequestParams {
  commentId: string;
}

export interface DeleteCommentResponseBody extends BaseResponseBody {}

import type { Prisma } from '@one-folder-app/database';

export interface PaginationOptions<T> {
  limit?: number;
  pageIndex?: number;
  orderBy?: T;
}

export interface Links {
  next: string | null;
  previus: string | null;
}

// Category
export type CategoryPaginationOptions =
  PaginationOptions<Prisma.CategoryOrderByWithAggregationInput>;

export type CategorySoftwarePaginationOptions =
  PaginationOptions<Prisma.SoftwareOrderByWithAggregationInput>;

// Comment
export type CommentPaginationOptions = PaginationOptions<Prisma.CommentOrderByWithAggregationInput>;

export type CommentRatingsPaginationOptions =
  PaginationOptions<Prisma.RatingOrderByWithAggregationInput>;

// Folder
export type FolderPaginationOptions = PaginationOptions<Prisma.FolderOrderByWithAggregationInput>;

export type FolderCommentsPaginationOptions =
  PaginationOptions<Prisma.CommentOrderByWithAggregationInput>;

export type FolderSoftwarePaginationOptions =
  PaginationOptions<Prisma.SoftwareOrderByWithAggregationInput>;

export type FolderRatingsPaginationOptions =
  PaginationOptions<Prisma.RatingOrderByWithAggregationInput>;

// Rating
export type RatingPaginationOptions = PaginationOptions<Prisma.RatingOrderByWithAggregationInput>;

// Software
export type SoftwarePaginationOptions =
  PaginationOptions<Prisma.SoftwareOrderByWithAggregationInput>;

export type SoftwareRatingsPaginationOptions =
  PaginationOptions<Prisma.RatingOrderByWithAggregationInput>;

export type SoftwareCategoriesPaginationOptions =
  PaginationOptions<Prisma.CategoryOrderByWithAggregationInput>;

export type SoftwareFoldersPaginationOptions =
  PaginationOptions<Prisma.FolderOrderByWithAggregationInput>;

// User
export type UserPaginationOptions = PaginationOptions<Prisma.UserOrderByWithAggregationInput>;

export type UserCommentsPaginationOptions =
  PaginationOptions<Prisma.CommentOrderByWithAggregationInput>;

export type UserFoldersPaginationOptions =
  PaginationOptions<Prisma.FolderOrderByWithAggregationInput>;

import type {
  Comment,
  Folder,
  FolderAccess,
  Prisma,
  Rating,
  Software
} from '@one-folder-app/database';

import type { BaseResponseBody } from './common.types';
import type {
  FolderCommentsPaginationOptions,
  FolderPaginationOptions,
  FolderRatingsPaginationOptions,
  FolderSoftwarePaginationOptions,
  Links
} from './pagination.types';
import type { UserData } from './user.types';

export interface FolderData extends Folder {
  comments: Comment[];
  ratings: Rating[];
  software: Software[];
  _count: Prisma.FolderCountOutputType;
  author: UserData;
}

// Get folder
export interface GetFolderRequestParams {
  folderId: string;
}

export interface GetFolderResponseBody extends BaseResponseBody {
  folder: FolderData;
}

// Get folders
export interface GetFoldersPaginationParams extends FolderPaginationOptions {}

export interface GetFoldersRequestQueries extends FolderPaginationOptions {
  page: number;
}

export interface GetFoldersResponseBody extends BaseResponseBody {
  folders: FolderData[];
  links: Links;
  totalFolders: number;
  totalPages: number;
}

// Get folder's comments
export interface GetFolderCommentsRequestParams {
  folderId: string;
}

export interface GetFolderCommentsPaginationParams extends FolderCommentsPaginationOptions {}

export interface GetFolderCommentsRequestQueries extends FolderCommentsPaginationOptions {
  page: number;
}

export interface GetFolderCommentsResponseBody extends BaseResponseBody {
  folderComments: Comment[];
  links: Links;
  totalFolderComments: number;
  totalPages: number;
}

// Get folder's ratings
export interface GetFolderRatingsRequestParams {
  folderId: string;
}

export interface GetFolderRatingsPaginationParams extends FolderRatingsPaginationOptions {}

export interface GetFolderRatingsRequestQueries extends FolderRatingsPaginationOptions {
  page: number;
}

export interface GetFolderRatingsResponseBody extends BaseResponseBody {
  averageRating: number | null;
  folderRatings: Rating[];
  links: Links;
  totalFolderRatings: number;
  totalPages: number;
}

// Get folder's software
export interface GetFolderSoftwareRequestParams {
  folderId: string;
}

export interface GetFolderSoftwarePaginationParams extends FolderSoftwarePaginationOptions {}

export interface GetFolderSoftwareRequestQueries extends FolderSoftwarePaginationOptions {
  page: number;
}

export interface GetFolderSoftwareResponseBody extends BaseResponseBody {
  folderSoftware: Software[];
  links: Links;
  totalFolderSoftware: number;
  totalPages: number;
}

// Post folder
export interface PostFolderRequestBody {
  image?: string;
  title: string;
  description?: string;
  access?: FolderAccess;
  authorId: string;
}

export interface PostFolderResponseBody extends BaseResponseBody {
  folder: FolderData;
}

// Put folder
export interface PutFolderRequestParams {
  folderId: string;
}

export interface PutFolderRequestBody {
  access?: FolderAccess;
  description?: string;
  image?: string;
  title?: string;
}

export interface PutFolderResponseBody extends BaseResponseBody {
  folder: FolderData;
}

// Delete folder
export interface DeleteFolderRequestParams {
  folderId: string;
}

export interface DeleteFolderResponseBody extends BaseResponseBody {}

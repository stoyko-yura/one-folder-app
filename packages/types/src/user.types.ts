import type { Comment, Folder, Profile, Role, User } from '@one-folder-app/database';

import type { BaseResponseBody } from './common.types';
import type {
  Links,
  UserFoldersPaginationOptions,
  UserPaginationOptions
} from './pagination.types';

export interface UserData extends User {
  profile: Profile;
  _count?: {
    folders: number;
    comments: number;
  };
}

// Get user
export interface GetUserRequestParams {
  userId: string;
}

export interface GetUserResponseBody extends BaseResponseBody {
  user: Omit<UserData, 'hash'>;
  token?: string;
}

// Get users
export interface GetUsersPaginationParams extends UserPaginationOptions {}

export interface GetUsersRequestQueries extends UserPaginationOptions {
  page: number;
}

export interface GetUsersResponseBody extends BaseResponseBody {
  links: Links;
  totalUsers: number;
  totalPages: number;
  users: Omit<UserData, 'hash'>[];
}

// Get user's folders
export interface GetUserFoldersRequestParams {
  userId: string;
}

export interface GetUserFoldersPaginationParams extends UserFoldersPaginationOptions {}

export interface GetUserFoldersRequestQueries extends UserFoldersPaginationOptions {
  page: number;
}

export interface GetUserFoldersResponseBody extends BaseResponseBody {
  links: Links;
  totalUserFolders: number;
  totalPages: number;
  userFolders: Folder[];
}

// Get user's comments
export interface GetUserCommentsRequestParams {
  userId: string;
}

export interface GetUserCommentsPaginationParams extends UserFoldersPaginationOptions {}

export interface GetUserCommentsRequestQueries extends UserFoldersPaginationOptions {
  page: number;
}

export interface GetUserCommentsResponseBody extends BaseResponseBody {
  links: Links;
  totalUserComments: number;
  totalPages: number;
  userComments: Comment[];
}

// Put user
export interface PutUserRequestParams {
  userId: string;
}

export interface PutUserRequestBody {
  email: string;
  login: string;
  bio?: string;
  username?: string;
  role?: Role;
}

export interface PutUserResponseBody extends BaseResponseBody {
  user: Omit<UserData, 'hash'>;
}

// Delete user
export interface DeleteUserRequestParams {
  userId: string;
}

export interface DeleteUserResponseBody extends BaseResponseBody {}

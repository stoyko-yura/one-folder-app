import type { Folder, FolderAccess, Prisma } from '@one-folder-app/database';
import type { PaginationOptions } from 'pagination.types';
import type { UserData } from 'user.types';

export interface FolderData extends Folder {
  _count: Prisma.FolderCountOutputType;
  author: UserData;
}

export interface GetFolderQuery {
  id: string;
}

export interface GetFolderParams {
  limit: number;
  pageIndex: number;
  orderBy: PaginationOptions<Prisma.FolderOrderByWithAggregationInput>;
}

export interface DeleteFolderParams {
  id: string;
}

export interface PostFolderData {
  access?: FolderAccess;
  authorId: string;
  description?: string;
  image?: string;
  title: string;
}

export interface PutFolderData {
  access?: FolderAccess;
  description?: string;
  image?: string;
  title?: string;
}

export interface FolderResponse {
  folder: FolderData;
  message: string;
  success: boolean;
}

export interface FoldersResponse {
  folders: FolderData[];
  links: {
    prev: string;
    next: string;
  };
  message: string;
  success: boolean;
  totalFolders: number;
  totalPages: number;
}

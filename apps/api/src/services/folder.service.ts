import type { Comment, Folder, Rating, Software } from '@one-folder-app/database';
import type {
  GetFolderCommentsPaginationParams,
  GetFolderRatingsPaginationParams,
  GetFolderSoftwarePaginationParams,
  GetFoldersPaginationParams,
  PostFolderRequestBody,
  PutFolderRequestBody
} from '@one-folder-app/types';

import { dbClient } from '@/config';

export const getFolderById = async (id: string) => {
  const folder = await dbClient.folder.findUnique({
    include: {
      _count: {
        select: {
          comments: true,
          ratings: true,
          software: true
        }
      },
      author: true,
      comments: true,
      software: true
    },
    where: {
      id
    }
  });

  return folder;
};

export const getFoldersWithPagination = async (
  options: GetFoldersPaginationParams
): Promise<Folder[] | null> => {
  const { limit = 10, pageIndex = 0, orderBy = { title: 'asc' } } = options;

  const folders = await dbClient.folder.findMany({
    include: {
      _count: {
        select: {
          comments: true,
          ratings: true,
          software: true
        }
      }
    },
    orderBy,
    skip: pageIndex * limit,
    take: limit
  });

  if (!folders.length) return null;

  return folders;
};

export const getFolderCommentsWithPaginations = async (
  folderId: string,
  options: GetFolderCommentsPaginationParams
): Promise<Comment[] | null> => {
  const { limit = 10, pageIndex = 0, orderBy = { createdAt: 'asc' } } = options;

  const folderComments = await dbClient.comment.findMany({
    orderBy,
    skip: pageIndex * limit,
    take: limit,
    where: {
      folderId
    }
  });

  if (!folderComments.length) return null;

  return folderComments;
};

export const getFolderRatingsWithPagination = async (
  folderId: string,
  options: GetFolderRatingsPaginationParams
): Promise<Rating[] | null> => {
  const { limit = 10, pageIndex = 0, orderBy = { commentId: 'asc' } } = options;

  const folderRatings = await dbClient.rating.findMany({
    orderBy,
    skip: pageIndex * limit,
    take: limit,
    where: {
      folderId
    }
  });

  if (!folderRatings.length) return null;

  return folderRatings;
};

export const getFolderSoftwareWithPagination = async (
  folderId: string,
  options: GetFolderSoftwarePaginationParams
): Promise<Software[] | null> => {
  const { limit = 10, pageIndex = 0, orderBy = { name: 'asc' } } = options;

  const folderSoftware = await dbClient.software.findMany({
    orderBy,
    skip: pageIndex * limit,
    take: limit,
    where: {
      folders: {
        some: {
          id: folderId
        }
      }
    }
  });

  if (!folderSoftware.length) return null;

  return folderSoftware;
};

export const postFolder = async (data: PostFolderRequestBody): Promise<Folder> => {
  const { authorId, title, access, description, image } = data;

  const folder = await dbClient.folder.create({
    data: {
      access,
      authorId,
      description,
      image,
      title
    }
  });

  return folder;
};

export const putFolder = async (id: string, data: PutFolderRequestBody): Promise<Folder> => {
  const { access, description, image, title } = data;

  const folder = await dbClient.folder.update({
    data: {
      access,
      description,
      image,
      title
    },
    where: {
      id
    }
  });

  return folder;
};

export const deleteFolder = async (id: string): Promise<void> => {
  await dbClient.folder.delete({
    where: {
      id
    }
  });
};

export const getTotalFolders = async (): Promise<number> => dbClient.folder.count();

export const getTotalFolderComments = async (id: string): Promise<number> =>
  dbClient.comment.count({ where: { id } });

export const getTotalFolderRatings = async (id: string): Promise<number> =>
  dbClient.rating.count({ where: { id } });

export const getTotalFolderSoftware = async (id: string): Promise<number> =>
  dbClient.software.count({ where: { folders: { some: { id } } } });

export const getAverageFolderRating = async (id: string): Promise<number | null> => {
  const aggregatedRating = await dbClient.rating.aggregate({
    _avg: {
      rating: true
    },
    where: {
      folderId: id
    }
  });

  return aggregatedRating._avg.rating;
};

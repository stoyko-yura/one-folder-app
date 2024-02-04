import type { Comment, Folder, Prisma, Rating, Software } from '@one-folder-app/database';

import { dbClient } from '@/config';
import type { PaginationOptions } from '@/types';

export const findFolderById = async (id: string) => {
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

export const findFoldersWithPagination = async (
  options: PaginationOptions<Prisma.FolderOrderByWithAggregationInput> = {
    limit: 10,
    orderBy: {
      title: 'asc'
    },
    pageIndex: 0
  }
): Promise<Folder[] | null> => {
  const { limit, pageIndex, orderBy } = options;

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

export const findFolderCommentsWithPaginations = async (
  folderId: string,
  options: PaginationOptions<Prisma.CommentOrderByWithAggregationInput> = {
    limit: 10,
    orderBy: {
      createdAt: 'asc'
    },
    pageIndex: 0
  }
): Promise<Comment[] | null> => {
  const { limit, pageIndex, orderBy } = options;

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

export const findFolderRatingsWithPagination = async (
  folderId: string,
  options: PaginationOptions<Prisma.RatingOrderByWithAggregationInput> = {
    limit: 10,
    orderBy: {
      createdAt: 'asc'
    },
    pageIndex: 0
  }
): Promise<Rating[] | null> => {
  const { limit, pageIndex, orderBy } = options;

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

export const findFolderSoftwareWithPagination = async (
  folderId: string,
  options: PaginationOptions<Prisma.SoftwareOrderByWithAggregationInput> = {
    limit: 10,
    orderBy: {
      createdAt: 'asc'
    },
    pageIndex: 0
  }
): Promise<Software[] | null> => {
  const { limit, pageIndex, orderBy } = options;

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

export const createFolder = async (data: Prisma.FolderCreateInput): Promise<Folder> => {
  const folder = await dbClient.folder.create({ data });

  return folder;
};

export const updateFolder = async (id: string, data: Prisma.FolderUpdateInput): Promise<Folder> => {
  const folder = await dbClient.folder.update({
    data,
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

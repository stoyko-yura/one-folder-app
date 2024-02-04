import type { Category, Folder, Prisma, Rating, Software } from '@one-folder-app/database';

import { dbClient } from '@/config';
import type { PaginationOptions } from '@/types';

export const findSoftwareById = async (id: string): Promise<Software | null> => {
  const software = await dbClient.software.findUnique({
    include: {
      _count: {
        select: {
          categories: true,
          folders: true,
          ratings: true
        }
      },
      categories: true
    },
    where: {
      id
    }
  });

  return software;
};

export const findSoftwareByName = async (name: string): Promise<Software | null> => {
  const software = await dbClient.software.findFirst({
    where: {
      name
    }
  });

  return software;
};

export const findSoftwareWithPagination = async (
  options: PaginationOptions<Prisma.SoftwareOrderByWithAggregationInput> = {
    limit: 10,
    orderBy: {
      name: 'asc'
    },
    pageIndex: 0
  }
): Promise<Software[] | null> => {
  const { limit, orderBy, pageIndex } = options;

  const software = await dbClient.software.findMany({
    include: {
      _count: {
        select: {
          categories: true,
          folders: true,
          ratings: true
        }
      },
      categories: true
    },
    orderBy,
    skip: pageIndex * limit,
    take: limit
  });

  if (!software.length) return null;

  return software;
};

export const findSoftwareFoldersWithPagination = async (
  softwareId: string,
  options: PaginationOptions<Prisma.FolderOrderByWithAggregationInput> = {
    limit: 10,
    orderBy: {
      createdAt: 'asc'
    },
    pageIndex: 0
  }
): Promise<Folder[] | null> => {
  const { limit, orderBy, pageIndex } = options;

  const softwareFolders = await dbClient.folder.findMany({
    orderBy,
    skip: pageIndex * limit,
    take: limit,
    where: {
      software: {
        some: {
          id: softwareId
        }
      }
    }
  });

  if (!softwareFolders.length) return null;

  return softwareFolders;
};

export const findSoftwareRatingsWithPagination = async (
  softwareId: string,
  options: PaginationOptions<Prisma.RatingOrderByWithAggregationInput> = {
    limit: 10,
    orderBy: {
      createdAt: 'asc'
    },
    pageIndex: 0
  }
): Promise<Rating[] | null> => {
  const { limit, orderBy, pageIndex } = options;

  const softwareRatings = await dbClient.rating.findMany({
    orderBy,
    skip: pageIndex * limit,
    take: limit,
    where: {
      softwareId
    }
  });

  if (!softwareRatings.length) return null;

  return softwareRatings;
};

export const findSoftwareCategoriesWithPagination = async (
  softwareId: string,
  options: PaginationOptions<Prisma.CategoryOrderByWithAggregationInput> = {
    limit: 10,
    orderBy: {
      name: 'asc'
    },
    pageIndex: 0
  }
): Promise<Category[] | null> => {
  const { limit, orderBy, pageIndex } = options;

  const softwareCategories = await dbClient.category.findMany({
    orderBy,
    skip: pageIndex * limit,
    take: limit,
    where: {
      software: {
        some: {
          id: softwareId
        }
      }
    }
  });

  if (!softwareCategories.length) return null;

  return softwareCategories;
};

export const createSoftware = async (data: Prisma.SoftwareCreateInput): Promise<Software> => {
  const software = await dbClient.software.create({
    data,
    include: {
      categories: true
    }
  });

  return software;
};

export const updateSoftware = async (
  id: string,
  data: Prisma.SoftwareUpdateInput
): Promise<Software> => {
  const software = await dbClient.software.update({
    data,
    where: {
      id
    }
  });

  return software;
};

export const deleteSoftware = async (id: string): Promise<void> => {
  await dbClient.software.delete({
    where: {
      id
    }
  });
};

export const getTotalSoftware = async (): Promise<number> => dbClient.software.count();

export const getTotalSoftwareFolders = async (id: string): Promise<number> =>
  dbClient.folder.count({ where: { software: { some: { id } } } });

export const getTotalSoftwareRatings = async (id: string): Promise<number> =>
  dbClient.rating.count({ where: { softwareId: id } });

export const getTotalSoftwareCategories = async (id: string): Promise<number> =>
  dbClient.category.count({ where: { software: { some: { id } } } });

import type { Category, Folder, Rating, Software } from '@one-folder-app/database';
import type {
  GetSoftwareCategoriesPaginationParams,
  GetSoftwareFoldersPaginationParams,
  GetSoftwareRatingsPaginationParams,
  GetSoftwaresPaginationParams,
  PostSoftwareRequestBody,
  PutSoftwareCategoriesRequestBody,
  PutSoftwareRequestBody,
  SoftwareData
} from '@one-folder-app/types';

import { dbClient } from '@/config';

export const getSoftwareById = async (id: string): Promise<Software | null> => {
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

export const getSoftwareByName = async (name: string): Promise<Software | null> => {
  const software = await dbClient.software.findFirst({
    where: {
      name
    }
  });

  return software;
};

export const getSoftwareWithPagination = async (
  options: GetSoftwaresPaginationParams
): Promise<Software[] | null> => {
  const { limit = 10, pageIndex = 0, orderBy = { name: 'asc' } } = options;

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

export const getSoftwareFoldersWithPagination = async (
  softwareId: string,
  options: GetSoftwareFoldersPaginationParams
): Promise<Folder[] | null> => {
  const { limit = 10, pageIndex = 0, orderBy = { createdAt: 'asc' } } = options;

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

export const getSoftwareRatingsWithPagination = async (
  softwareId: string,
  options: GetSoftwareRatingsPaginationParams
): Promise<Rating[] | null> => {
  const { limit = 10, pageIndex = 0, orderBy = { createdAt: 'asc' } } = options;

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

export const getSoftwareCategoriesWithPagination = async (
  softwareId: string,
  options: GetSoftwareCategoriesPaginationParams
): Promise<Category[] | null> => {
  const { limit = 10, pageIndex = 0, orderBy = { name: 'asc' } } = options;

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

export const postSoftware = async (data: PostSoftwareRequestBody): Promise<SoftwareData> => {
  const { name, url, categoryIds = [], description, icon } = data;

  const software = await dbClient.software.create({
    data: {
      categories: {
        connect: categoryIds.map((categoryId: string) => ({ id: categoryId }))
      },
      description,
      icon,
      name,
      url
    },
    include: {
      categories: true
    }
  });

  return software;
};

export const putSoftware = async (
  id: string,
  data: PutSoftwareRequestBody
): Promise<SoftwareData> => {
  const { name, url, description, icon } = data;

  const software = await dbClient.software.update({
    data: {
      description,
      icon,
      name,
      url
    },
    where: {
      id
    }
  });

  return software;
};

export const putSoftwareCategories = async (
  softwareId: string,
  data: PutSoftwareCategoriesRequestBody
): Promise<SoftwareData> => {
  const { categoryIds } = data;

  const updatedSoftware = await dbClient.software.update({
    data: {
      categories: {
        connect: categoryIds.map((categoryId) => ({
          id: categoryId
        }))
      }
    },
    where: {
      id: softwareId
    }
  });

  return updatedSoftware;
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

export const getAverageSoftwareRating = async (id: string): Promise<number | null> => {
  const aggregatedRating = await dbClient.rating.aggregate({
    _avg: {
      rating: true
    },
    where: {
      softwareId: id
    }
  });

  return aggregatedRating._avg.rating;
};

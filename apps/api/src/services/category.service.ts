import type { Category, Software } from '@one-folder-app/database';
import type {
  GetCategoriesPaginationParams,
  GetCategorySoftwarePaginationParams,
  PostCategoryRequestBody,
  PutCategoryRequestBody
} from '@one-folder-app/types';

import { dbClient } from '@/config';

export const getCategoryById = async (id: string): Promise<Category | null> => {
  const category = await dbClient.category.findUnique({
    where: {
      id
    }
  });

  return category;
};

export const getCategoryByName = async (name: string): Promise<Category | null> => {
  const category = await dbClient.category.findUnique({
    where: {
      name
    }
  });

  return category;
};

export const getCategoriesWithPagination = async (
  options: GetCategoriesPaginationParams
): Promise<Category[] | null> => {
  const { limit = 10, orderBy = { name: 'asc' }, pageIndex = 0 } = options;

  const categories = await dbClient.category.findMany({
    orderBy,
    skip: pageIndex * limit,
    take: limit
  });

  if (!categories.length) return null;

  return categories;
};

export const getCategorySoftwareWithPagination = async (
  categoryId: string,
  options: GetCategorySoftwarePaginationParams
): Promise<Software[] | null> => {
  const { limit = 10, orderBy = { name: 'asc' }, pageIndex = 0 } = options;

  const categorySoftware = await dbClient.software.findMany({
    orderBy,
    skip: pageIndex * limit,
    take: limit,
    where: {
      categories: {
        some: {
          id: categoryId
        }
      }
    }
  });

  if (!categorySoftware.length) return null;

  return categorySoftware;
};

export const postCategory = async (data: PostCategoryRequestBody): Promise<Category> => {
  const { name } = data;

  const category = await dbClient.category.create({
    data: {
      name
    }
  });

  return category;
};

export const putCategory = async (id: string, data: PutCategoryRequestBody): Promise<Category> => {
  const { name } = data;

  const category = await dbClient.category.update({
    data: {
      name
    },
    where: {
      id
    }
  });

  return category;
};

export const deleteCategoryById = async (id: string): Promise<void> => {
  await dbClient.category.delete({
    where: {
      id
    }
  });
};

export const getTotalCategories = async (): Promise<number> => dbClient.category.count();

export const getTotalCategorySoftwares = async (categoryId: string): Promise<number> =>
  dbClient.software.count({
    where: {
      categories: {
        some: {
          id: categoryId
        }
      }
    }
  });

import type { Category, Prisma, Software } from '@one-folder-app/database';

import { dbClient } from '@/config';
import type { PaginationOptions } from '@/types';

export const findCateogryById = async (id: string): Promise<Category | null> => {
  const category = await dbClient.category.findUnique({
    where: {
      id
    }
  });

  return category;
};

export const findCategoryByName = async (name: string): Promise<Category | null> => {
  const category = await dbClient.category.findUnique({
    where: {
      name
    }
  });

  return category;
};

export const findCategoriesWithPagination = async (
  options: PaginationOptions<Prisma.CategoryOrderByWithAggregationInput> = {
    limit: 10,
    orderBy: {
      name: 'asc'
    },
    pageIndex: 0
  }
): Promise<Category[] | null> => {
  const { limit, orderBy, pageIndex } = options;

  const categories = await dbClient.category.findMany({
    orderBy,
    skip: pageIndex * limit,
    take: limit
  });

  if (!categories.length) return null;

  return categories;
};

export const findCategorySoftwareWithPagination = async (
  categoryId: string,
  options: PaginationOptions<Prisma.SoftwareOrderByWithAggregationInput> = {
    limit: 10,
    orderBy: {
      name: 'asc'
    },
    pageIndex: 0
  }
): Promise<Software[] | null> => {
  const { limit, pageIndex, orderBy } = options;

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

export const createCategory = async (data: Prisma.CategoryCreateInput): Promise<Category> => {
  const category = await dbClient.category.create({
    data
  });

  return category;
};

export const updateCategory = async (
  id: string,
  data: Prisma.CategoryUpdateInput
): Promise<Category> => {
  const category = await dbClient.category.update({
    data,
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

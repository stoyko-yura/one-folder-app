import type { Request, Response } from 'express';
import { validationResult } from 'express-validator';

import { dbClient } from '@/config';
import { errorHandler } from '@/middleware';

// Get categories
export const getCategories = async (req: Request, res: Response) => {
  try {
    const { page, limit, pageIndex } = req.query;

    const categories = await dbClient.category.findMany({
      orderBy: {
        name: 'asc'
      },
      skip: Number(pageIndex) * (Number(limit) || 10),
      take: Number(limit) || 10
    });

    if (!categories.length) {
      return errorHandler(new Error('Categories not found'), res, 404);
    }

    const totalCategories = await dbClient.category.count();
    const totalPages = Math.ceil(totalCategories / Number(limit));

    const links = {
      next:
        Number(page) < totalPages
          ? `${req.protocol}://${req.headers.host}/api/categories?page=${
              Number(page) + 1
            }&limit=${Number(limit)}`
          : null,
      previus:
        Number(page) > 1
          ? `${req.protocol}://${req.headers.host}/api/categories?page=${
              Number(page) - 1
            }&limit=${Number(limit)}`
          : null
    };

    res.status(200).json({
      categories,
      links,
      message: 'Categories loaded',
      success: true,
      totalCategories,
      totalPages
    });
  } catch (error) {
    errorHandler(error as Error, res);
  }
};

// Get category
export const getCategory = async (req: Request, res: Response) => {
  try {
    const { categoryId } = req.params;

    const category = await dbClient.category.findUnique({
      where: {
        id: categoryId
      }
    });

    if (!category) {
      return errorHandler(new Error('Category not found'), res, 404);
    }

    res.status(200).json({
      category,
      message: 'Category loaded',
      success: true
    });
  } catch (error) {
    errorHandler(error as Error, res);
  }
};

// Get category softwares
export const getCategorySoftwares = async (req: Request, res: Response) => {
  try {
    const { page, limit, pageIndex } = req.query;
    const { categoryId } = req.params;

    const category = await dbClient.category.findUnique({
      where: {
        id: categoryId
      }
    });

    if (!category) {
      return errorHandler(new Error(`Category ${categoryId} not found`), res, 404);
    }

    const categorySoftares = await dbClient.software.findMany({
      orderBy: {
        name: 'asc'
      },
      skip: Number(pageIndex) * (Number(limit) || 10),
      take: Number(limit) || 10,
      where: {
        categories: {
          some: {
            id: categoryId
          }
        }
      }
    });

    if (!categorySoftares.length) {
      return errorHandler(new Error("Category's softwares not found"), res, 404);
    }

    const totalCategorySoftwares = (
      await dbClient.software.findMany({
        where: {
          categories: {
            some: {
              id: categoryId
            }
          }
        }
      })
    ).length;
    const totalPages = Math.ceil(totalCategorySoftwares / Number(limit));

    const links = {
      next:
        Number(page) < totalPages
          ? `${req.protocol}://${req.headers.host}/api/categories/${categoryId}/software?page=${
              Number(page) + 1
            }&limit=${Number(limit)}`
          : null,
      previus:
        Number(page) > 1
          ? `${req.protocol}://${req.headers.host}/api/categories/${categoryId}/software?page=${
              Number(page) - 1
            }&limit=${Number(limit)}`
          : null
    };

    res.status(200).json({
      categorySoftares,
      links,
      message: 'Software category softwares loaded',
      success: true,
      totalCategorySoftwares,
      totalPages
    });
  } catch (error) {
    errorHandler(error as Error, res);
  }
};

// Post category
export const postCategory = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(500).json({
        errors: errors.array(),
        success: false
      });
    }

    const { name } = req.body;

    const category = await dbClient.category.findFirst({
      where: {
        name
      }
    });

    if (category) {
      return errorHandler(new Error('Category with this name already exist'), res);
    }

    const createdCategory = await dbClient.category.create({
      data: { name }
    });

    res.status(200).json({
      category: createdCategory,
      message: 'Category successfully created',
      success: true
    });
  } catch (error) {
    errorHandler(error as Error, res);
  }
};

// Put category
export const putCategory = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const { categoryId } = req.params;

    let category = await dbClient.category.findUnique({
      where: {
        id: categoryId
      }
    });

    if (!category) {
      return errorHandler(new Error(`Category ${categoryId} not found`), res, 404);
    }

    category = await dbClient.category.findFirst({
      where: {
        name
      }
    });

    if (category) {
      return errorHandler(new Error('Category already exist'), res);
    }

    const editedCategory = await dbClient.category.update({
      data: {
        name
      },
      where: {
        id: categoryId
      }
    });

    res.status(200).json({
      category: editedCategory,
      message: 'Category edited',
      success: true
    });
  } catch (error) {
    errorHandler(error as Error, res);
  }
};

// Delete category
export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { categoryId } = req.params;

    const category = await dbClient.category.findUnique({
      where: {
        id: categoryId
      }
    });

    if (!category) {
      return errorHandler(new Error(`Category ${categoryId} not found`), res, 404);
    }

    await dbClient.category.delete({
      where: {
        id: categoryId
      }
    });

    res.status(200).json({
      message: 'Category deleted',
      success: true
    });
  } catch (error) {
    errorHandler(error as Error, res);
  }
};

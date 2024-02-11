import type { Request, Response } from 'express';

import { getPaginationLinks } from '@/middleware';
import { categoryServices } from '@/services';
import { HttpResponseError, errorHandler } from '@/utils';

// Get categories
export const getCategories = async (req: Request, res: Response) => {
  try {
    const { page, limit, pageIndex } = req.query;

    const categories = await categoryServices.findCategoriesWithPagination({
      limit: Number(limit),
      orderBy: {
        name: 'asc'
      },
      pageIndex: Number(pageIndex)
    });

    if (!categories) {
      throw new HttpResponseError({
        message: 'Categories not found',
        status: 'NOT_FOUND'
      });
    }

    const totalCategories = await categoryServices.getTotalCategories();
    const totalPages = Math.ceil(totalCategories / Number(limit));

    const links = getPaginationLinks(req, { limit: Number(limit), page: Number(page), totalPages });

    res.status(200).json({
      categories,
      links,
      message: 'Categories loaded',
      success: true,
      totalCategories,
      totalPages
    });
  } catch (error) {
    errorHandler(error as HttpResponseError, res);
  }
};

// Get category
export const getCategory = async (req: Request, res: Response) => {
  try {
    const { categoryId } = req.params;

    const category = await categoryServices.findCateogryById(categoryId);

    if (!category) {
      throw new HttpResponseError({
        description: `Category ${categoryId} not found`,
        message: 'Category not found',
        status: 'NOT_FOUND'
      });
    }

    res.status(200).json({
      category,
      message: 'Category loaded',
      success: true
    });
  } catch (error) {
    errorHandler(error as HttpResponseError, res);
  }
};

// Get category softwares
export const getCategorySoftwares = async (req: Request, res: Response) => {
  try {
    const { page, limit, pageIndex } = req.query;
    const { categoryId } = req.params;

    const category = await categoryServices.findCateogryById(categoryId);

    if (!category) {
      throw new HttpResponseError({
        description: `Category ${categoryId} not found`,
        message: 'Category not found',
        status: 'NOT_FOUND'
      });
    }

    const categorySoftwares = await categoryServices.findCategorySoftwareWithPagination(
      categoryId,
      {
        limit: Number(limit),
        orderBy: {
          name: 'asc'
        },
        pageIndex: Number(pageIndex)
      }
    );

    if (!categorySoftwares) {
      throw new HttpResponseError({
        message: "Category's softwares not found",
        status: 'NOT_FOUND'
      });
    }

    const totalCategorySoftwares = await categoryServices.getTotalCategorySoftwares(categoryId);
    const totalPages = Math.ceil(totalCategorySoftwares / Number(limit));

    const links = getPaginationLinks(req, { limit: Number(limit), page: Number(page), totalPages });

    res.status(200).json({
      categorySoftwares,
      links,
      message: "Category's softwares loaded",
      success: true,
      totalCategorySoftwares,
      totalPages
    });
  } catch (error) {
    errorHandler(error as HttpResponseError, res);
  }
};

// Post category
export const postCategory = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    const category = await categoryServices.findCategoryByName(name);

    if (category) {
      throw new HttpResponseError({
        description: `Category ${name} already exists`,
        message: 'Category already exists',
        status: 'BAD_REQUEST'
      });
    }

    const createdCategory = await categoryServices.createCategory({
      name
    });

    res.status(200).json({
      category: createdCategory,
      message: 'Category successfully created',
      success: true
    });
  } catch (error) {
    errorHandler(error as HttpResponseError, res);
  }
};

// Put category
export const putCategory = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const { categoryId } = req.params;

    let category = await categoryServices.findCateogryById(categoryId);

    if (!category) {
      throw new HttpResponseError({
        description: `Category ${categoryId} not found`,
        message: 'Category not found',
        status: 'NOT_FOUND'
      });
    }

    category = await categoryServices.findCategoryByName(name);

    if (category) {
      throw new HttpResponseError({
        description: `Category ${name} already exists`,
        message: 'Category already exists',
        status: 'BAD_REQUEST'
      });
    }

    const editedCategory = await categoryServices.updateCategory(categoryId, {
      name
    });

    res.status(200).json({
      category: editedCategory,
      message: 'Category edited',
      success: true
    });
  } catch (error) {
    errorHandler(error as HttpResponseError, res);
  }
};

// Delete category
export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { categoryId } = req.params;

    const category = await categoryServices.findCateogryById(categoryId);

    if (!category) {
      throw new HttpResponseError({
        description: `Category ${categoryId} not found`,
        message: 'Category not found',
        status: 'NOT_FOUND'
      });
    }

    await categoryServices.deleteCategoryById(categoryId);

    res.status(200).json({
      message: 'Category deleted',
      success: true
    });
  } catch (error) {
    errorHandler(error as HttpResponseError, res);
  }
};

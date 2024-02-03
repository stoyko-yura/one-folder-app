import type { Request, Response } from 'express';
import { validationResult } from 'express-validator';

import { errorHandler, getPaginationLinks } from '@/middleware';
import { categoryServices } from '@/services';

// Get categories
export const getCategories = async (req: Request, res: Response) => {
  try {
    const { page, limit, pageIndex } = req.query;

    const categories = await categoryServices.findCategoriesWithPagination({
      limit: Number(limit),
      pageIndex: Number(pageIndex)
    });

    if (!categories) {
      return errorHandler(new Error('Categories not found'), res, 404);
    }

    const totalCategories = await categoryServices.getTotalCategories();
    const totalPages = Math.ceil(totalCategories / Number(limit));

    const links = getPaginationLinks(req, {
      limit: Number(limit),
      page: Number(page),
      totalPages
    });

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

    const category = await categoryServices.findCateogryById(categoryId);

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

    const category = await categoryServices.findCateogryById(categoryId);

    if (!category) {
      return errorHandler(new Error(`Category ${categoryId} not found`), res, 404);
    }

    const categorySoftwares = await categoryServices.findCategorySoftwareWithPagination(
      categoryId,
      {
        limit: Number(limit),
        pageIndex: Number(pageIndex)
      }
    );

    if (!categorySoftwares) {
      return errorHandler(new Error("Category's softwares not found"), res, 404);
    }

    const totalCategorySoftwares = await categoryServices.getTotalCategorySoftwares(categoryId);
    const totalPages = Math.ceil(totalCategorySoftwares / Number(limit));

    const links = getPaginationLinks(req, {
      limit: Number(limit),
      page: Number(page),
      totalPages
    });

    res.status(200).json({
      categorySoftwares,
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

    const category = await categoryServices.findCategoryByName(name);

    if (category) {
      return errorHandler(new Error('Category with this name already exist'), res);
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
    errorHandler(error as Error, res);
  }
};

// Put category
export const putCategory = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const { categoryId } = req.params;

    let category = await categoryServices.findCateogryById(categoryId);

    if (!category) {
      return errorHandler(new Error(`Category ${categoryId} not found`), res, 404);
    }

    category = await categoryServices.findCategoryByName(name);

    if (category) {
      return errorHandler(new Error('Category already exist'), res);
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
    errorHandler(error as Error, res);
  }
};

// Delete category
export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { categoryId } = req.params;

    const category = await categoryServices.findCateogryById(categoryId);

    if (!category) {
      return errorHandler(new Error(`Category ${categoryId} not found`), res, 404);
    }

    await categoryServices.deleteCategoryById(categoryId);

    res.status(200).json({
      message: 'Category deleted',
      success: true
    });
  } catch (error) {
    errorHandler(error as Error, res);
  }
};

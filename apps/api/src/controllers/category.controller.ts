import type { Request } from 'express';

import { getPaginationLinks } from '@/middleware';
import { categoryServices } from '@/services';
import type {
  DeleteCategoryRequest,
  DeleteCategoryResponse,
  GetCategoriesRequest,
  GetCategoriesResponse,
  GetCategoryRequest,
  GetCategoryResponse,
  GetCategorySoftwareRequest,
  GetCategorySoftwareResponse,
  PostCategoryRequest,
  PostCategoryResponse,
  PutCategoryRequest,
  PutCategoryResponse
} from '@/types';
import { HttpResponseError, errorHandler } from '@/utils';

// Get categories
export const getCategories = async (req: GetCategoriesRequest, res: GetCategoriesResponse) => {
  try {
    const { limit, page, pageIndex, orderBy } = req.query;

    const categories = await categoryServices.getCategoriesWithPagination({
      limit,
      orderBy,
      pageIndex
    });

    if (!categories) {
      throw new HttpResponseError({
        message: 'Categories not found',
        status: 'NOT_FOUND'
      });
    }

    const totalCategories = await categoryServices.getTotalCategories();
    const totalPages = Math.ceil(totalCategories / limit);

    const links = getPaginationLinks(req as unknown as Request, { limit, page, totalPages });

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
export const getCategory = async (req: GetCategoryRequest, res: GetCategoryResponse) => {
  try {
    const { categoryId } = req.params;

    const category = await categoryServices.getCategoryById(categoryId);

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
export const getCategorySoftwares = async (
  req: GetCategorySoftwareRequest,
  res: GetCategorySoftwareResponse
) => {
  try {
    const { limit, page, pageIndex, orderBy } = req.query;
    const { categoryId } = req.params;

    const category = await categoryServices.getCategoryById(categoryId);

    if (!category) {
      throw new HttpResponseError({
        description: `Category ${categoryId} not found`,
        message: 'Category not found',
        status: 'NOT_FOUND'
      });
    }

    const categorySoftware = await categoryServices.getCategorySoftwareWithPagination(categoryId, {
      limit,
      orderBy,
      pageIndex
    });

    if (!categorySoftware) {
      throw new HttpResponseError({
        message: "Category's softwares not found",
        status: 'NOT_FOUND'
      });
    }

    const totalCategorySoftware = await categoryServices.getTotalCategorySoftwares(categoryId);
    const totalPages = Math.ceil(totalCategorySoftware / limit);

    const links = getPaginationLinks(req as unknown as Request, { limit, page, totalPages });

    res.status(200).json({
      categorySoftware,
      links,
      message: "Category's softwares loaded",
      success: true,
      totalCategorySoftware,
      totalPages
    });
  } catch (error) {
    errorHandler(error as HttpResponseError, res);
  }
};

// Post category
export const postCategory = async (req: PostCategoryRequest, res: PostCategoryResponse) => {
  try {
    const { name } = req.body;

    const category = await categoryServices.getCategoryByName(name);

    if (category) {
      throw new HttpResponseError({
        description: `Category ${name} already exists`,
        message: 'Category already exists',
        status: 'BAD_REQUEST'
      });
    }

    const createdCategory = await categoryServices.postCategory({
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
export const putCategory = async (req: PutCategoryRequest, res: PutCategoryResponse) => {
  try {
    const { name } = req.body;
    const { categoryId } = req.params;

    let category = await categoryServices.getCategoryById(categoryId);

    if (!category) {
      throw new HttpResponseError({
        description: `Category ${categoryId} not found`,
        message: 'Category not found',
        status: 'NOT_FOUND'
      });
    }

    category = await categoryServices.getCategoryByName(name);

    if (category) {
      throw new HttpResponseError({
        description: `Category ${name} already exists`,
        message: 'Category already exists',
        status: 'BAD_REQUEST'
      });
    }

    const editedCategory = await categoryServices.putCategory(categoryId, {
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
export const deleteCategory = async (req: DeleteCategoryRequest, res: DeleteCategoryResponse) => {
  try {
    const { categoryId } = req.params;

    const category = await categoryServices.getCategoryById(categoryId);

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

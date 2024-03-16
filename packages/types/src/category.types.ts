import type { Category, Software } from '@one-folder-app/database';

import type { BaseResponseBody } from './common.types';
import type {
  CategoryPaginationOptions,
  CategorySoftwarePaginationOptions,
  Links
} from './pagination.types';

export interface CategoryData extends Category {}

// Get category
export interface GetCategoryRequestParams {
  categoryId?: string;
}

export interface GetCategoryResponseBody extends BaseResponseBody {
  category: CategoryData;
}

// Get categories
export interface GetCategoriesPaginationParams extends CategoryPaginationOptions {}

export interface GetCategoriesRequestQueries extends CategoryPaginationOptions {
  page?: number;
}

export interface GetCategoriesResponseBody extends BaseResponseBody {
  categories: CategoryData[];
  links: Links;
  totalCategories: number;
  totalPages: number;
}

// Get cateory's softwares
export interface GetCategorySoftwareRequestParams {
  categoryId?: string;
}

export interface GetCategorySoftwarePaginationParams extends CategorySoftwarePaginationOptions {}

export interface GetCategorySoftwareRequestQueries extends CategorySoftwarePaginationOptions {
  page?: number;
}

export interface GetCategorySoftwareResponseBody extends BaseResponseBody {
  categorySoftware: Software[];
  links: Links;
  totalCategorySoftware: number;
  totalPages: number;
}

// Post category
export interface PostCategoryRequestBody {
  name: string;
}

export interface PostCategoryResponseBody extends BaseResponseBody {
  category: CategoryData;
}

// Put category
export interface PutCategoryRequestParams {
  categoryId?: string;
}

export interface PutCategoryRequestBody {
  name: string;
}

export interface PutCategoryResponseBody extends BaseResponseBody {
  category: CategoryData;
}

// Delete category
export interface DeleteCategoryRequestParams {
  categoryId?: string;
}

export interface DeleteCategoryResponseBody extends BaseResponseBody {}

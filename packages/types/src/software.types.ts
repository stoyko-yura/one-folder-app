import type { Category, Folder, Rating, Software } from '@one-folder-app/database';

import type { BaseResponseBody } from './common.types';
import type {
  Links,
  SoftwareCategoriesPaginationOptions,
  SoftwareFoldersPaginationOptions,
  SoftwarePaginationOptions,
  SoftwareRatingsPaginationOptions
} from './pagination.types';

export interface SoftwareData extends Software {
  _count?: {
    categories?: number;
    folders?: number;
    ratings?: number;
  };
  categories?: Category[];
}

// Get software
export interface GetSoftwareRequestParams {
  softwareId?: string;
}

export interface GetSoftwareResponseBody extends BaseResponseBody {
  software: SoftwareData;
}

// Get softwares
export interface GetSoftwaresPaginationParams extends SoftwarePaginationOptions {}

export interface GetSoftwaresRequestQueries extends SoftwarePaginationOptions {
  page?: number;
}

export interface GetSoftwaresResponseBody extends BaseResponseBody {
  software: SoftwareData[];
  links: Links;
  totalSoftware: number;
  totalPages: number;
}

// Get software's ratings
export interface GetSoftwareRatingsRequestParams {
  softwareId?: string;
}

export interface GetSoftwareRatingsPaginationParams extends SoftwareRatingsPaginationOptions {}

export interface GetSoftwareRatingsRequestQueries extends SoftwareRatingsPaginationOptions {
  page?: number;
}

export interface GetSoftwareRatingsResponseBody extends BaseResponseBody {
  averageRating: number | null;
  softwareRatings: Rating[];
  links: Links;
  totalSoftwareRatings: number;
  totalPages: number;
}

// Get software's categories
export interface GetSoftwareCategoriesRequestParams {
  softwareId?: string;
}

export interface GetSoftwareCategoriesPaginationParams
  extends SoftwareCategoriesPaginationOptions {}

export interface GetSoftwareCategoriesRequestQueries extends SoftwareCategoriesPaginationOptions {
  page?: number;
}

export interface GetSoftwareCategoriesResponseBody extends BaseResponseBody {
  softwareCategories: Category[];
  links: Links;
  totalSoftwareCategories: number;
  totalPages: number;
}

// Get software's folders
export interface GetSoftwareFoldersRequestParams {
  softwareId?: string;
}

export interface GetSoftwareFoldersPaginationParams extends SoftwareFoldersPaginationOptions {}

export interface GetSoftwareFoldersRequestQueries extends SoftwareFoldersPaginationOptions {
  page?: number;
}

export interface GetSoftwareFoldersResponseBody extends BaseResponseBody {
  softwareFolders: Folder[];
  links: Links;
  totalSoftwareFolders: number;
  totalPages: number;
}

// Post software
export interface PostSoftwareRequestBody {
  name: string;
  url: string;
  categoryIds?: string[];
  description?: string;
  icon?: string;
}

export interface PostSoftwareResponseBody extends BaseResponseBody {
  software: SoftwareData;
}

// Put Software
export interface PutSoftwareRequestParams {
  softwareId?: string;
}

export interface PutSoftwareRequestBody {
  name: string;
  url: string;
  description?: string;
  icon?: string;
}

export interface PutSoftwareResponseBody extends BaseResponseBody {
  software: SoftwareData;
}

// Put software's categories
export interface PutSoftwareCategoriesRequestParams {
  softwareId?: string;
}

export interface PutSoftwareCategoriesRequestBody {
  categoryIds: string[];
}

export interface PutSoftwareCategoriesResponseBody extends BaseResponseBody {
  software: SoftwareData;
}

// Delete software
export interface DeleteSoftwareRequestParams {
  softwareId?: string;
}

export interface DeleteSoftwareResponseBody extends BaseResponseBody {}

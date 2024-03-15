import type { SoftwareData } from '@one-folder-app/types';
import type { Request, Response } from 'express';

import { getPaginationLinks } from '@/middleware';
import { softwareServices } from '@/services';
import type {
  DeleteSoftwareRequest,
  DeleteSoftwareResponse,
  GetSoftwareCategoriesRequest,
  GetSoftwareCategoriesResponse,
  GetSoftwareFoldersRequest,
  GetSoftwareFoldersResponse,
  GetSoftwareRatingsRequest,
  GetSoftwareRatingsResponse,
  GetSoftwareRequest,
  GetSoftwareResponse,
  GetSoftwaresRequest,
  GetSoftwaresResponse,
  PutSoftwareCategoriesRequest,
  PutSoftwareCategoriesResponse,
  PutSoftwareRequest,
  PutSoftwareResponse
} from '@/types';
import { HttpResponseError, errorHandler } from '@/utils';

// Get softwares
export const getSoftwares = async (req: GetSoftwaresRequest, res: GetSoftwaresResponse) => {
  try {
    const { limit = 10, page = 1, pageIndex = 0, orderBy = { name: 'asc' } } = req.query;

    const software = await softwareServices.getSoftwareWithPagination({
      limit,
      orderBy,
      pageIndex
    });

    if (!software) {
      throw new HttpResponseError({
        message: 'Softwares not found',
        status: 'NOT_FOUND'
      });
    }

    const totalSoftware = await softwareServices.getTotalSoftware();
    const totalPages = Math.ceil(totalSoftware / limit);

    const links = getPaginationLinks(req as Request, { limit, page, totalPages });

    res.status(200).json({
      links,
      message: 'Software loaded',
      software: software as SoftwareData[],
      success: true,
      totalPages,
      totalSoftware
    });
  } catch (error) {
    errorHandler(error as HttpResponseError, res);
  }
};

// Get software
export const getSoftware = async (req: GetSoftwareRequest, res: GetSoftwareResponse) => {
  try {
    const { softwareId } = req.params;

    if (!softwareId) {
      throw new HttpResponseError({
        description: 'softwareId is required. Please check your params',
        message: 'softwareId is required',
        status: 'FORBIDDEN'
      });
    }

    const software = await softwareServices.getSoftwareById(softwareId);

    if (!software) {
      throw new HttpResponseError({
        description: `Software ${softwareId} not found`,
        message: 'Software not found',
        status: 'NOT_FOUND'
      });
    }

    res.status(200).json({
      message: 'Software loaded',
      software,
      success: true
    });
  } catch (error) {
    errorHandler(error as HttpResponseError, res);
  }
};

// Get software's folders
export const getSoftwareFolders = async (
  req: GetSoftwareFoldersRequest,
  res: GetSoftwareFoldersResponse
) => {
  try {
    const { limit = 10, page = 1, pageIndex = 0, orderBy = { createdAt: 'asc' } } = req.query;
    const { softwareId } = req.params;

    if (!softwareId) {
      throw new HttpResponseError({
        description: 'softwareId is required. Please check your params',
        message: 'softwareId is required',
        status: 'FORBIDDEN'
      });
    }

    const software = await softwareServices.getSoftwareById(softwareId);

    if (!software) {
      throw new HttpResponseError({
        description: `Software ${softwareId} not found`,
        message: 'Software not found',
        status: 'NOT_FOUND'
      });
    }

    const softwareFolders = await softwareServices.getSoftwareFoldersWithPagination(softwareId, {
      limit,
      orderBy,
      pageIndex
    });

    if (!softwareFolders) {
      throw new HttpResponseError({
        message: "Software's folders not found",
        status: 'NOT_FOUND'
      });
    }

    const totalSoftwareFolders = await softwareServices.getTotalSoftwareFolders(softwareId);
    const totalPages = Math.ceil(totalSoftwareFolders / limit);

    const links = getPaginationLinks(req as Request, { limit, page, totalPages });

    res.status(200).json({
      links,
      message: "Software's folders loaded",
      softwareFolders,
      success: true,
      totalPages,
      totalSoftwareFolders
    });
  } catch (error) {
    errorHandler(error as HttpResponseError, res);
  }
};

// Get software's ratings
export const getSoftwareRatings = async (
  req: GetSoftwareRatingsRequest,
  res: GetSoftwareRatingsResponse
) => {
  try {
    const { limit = 10, page = 1, pageIndex = 0, orderBy = { createdAt: 'asc' } } = req.query;
    const { softwareId } = req.params;

    if (!softwareId) {
      throw new HttpResponseError({
        description: 'softwareId is required. Please check your params',
        message: 'softwareId is required',
        status: 'FORBIDDEN'
      });
    }

    const software = await softwareServices.getSoftwareById(softwareId);

    if (!software) {
      throw new HttpResponseError({
        description: `Software ${softwareId} not found`,
        message: 'Software not found',
        status: 'NOT_FOUND'
      });
    }

    const softwareRatings = await softwareServices.getSoftwareRatingsWithPagination(softwareId, {
      limit,
      orderBy,
      pageIndex
    });

    if (!softwareRatings) {
      throw new HttpResponseError({
        message: "Software's ratings not found",
        status: 'NOT_FOUND'
      });
    }

    const totalSoftwareRatings = await softwareServices.getTotalSoftwareRatings(softwareId);
    const totalPages = Math.ceil(totalSoftwareRatings / limit);

    const links = getPaginationLinks(req as Request, { limit, page, totalPages });

    const averageRating = await softwareServices.getAverageSoftwareRating(softwareId);

    res.status(200).json({
      averageRating,
      links,
      message: "Software's ratings loaded",
      softwareRatings,
      success: true,
      totalPages,
      totalSoftwareRatings
    });
  } catch (error) {
    errorHandler(error as HttpResponseError, res);
  }
};

// Get software's categories
export const getSoftwareCategories = async (
  req: GetSoftwareCategoriesRequest,
  res: GetSoftwareCategoriesResponse
) => {
  try {
    const { limit = 10, page = 1, pageIndex = 0, orderBy = { name: 'asc' } } = req.query;
    const { softwareId } = req.params;

    if (!softwareId) {
      throw new HttpResponseError({
        description: 'softwareId is required. Please check your params',
        message: 'softwareId is required',
        status: 'FORBIDDEN'
      });
    }

    const software = await softwareServices.getSoftwareById(softwareId);

    if (!software) {
      throw new HttpResponseError({
        description: `Software ${softwareId} not found`,
        message: 'Software not found',
        status: 'NOT_FOUND'
      });
    }

    const softwareCategories = await softwareServices.getSoftwareCategoriesWithPagination(
      softwareId,
      {
        limit,
        orderBy,
        pageIndex
      }
    );

    if (!softwareCategories) {
      throw new HttpResponseError({
        message: "Software's categories not found",
        status: 'NOT_FOUND'
      });
    }

    const totalSoftwareCategories = await softwareServices.getTotalSoftwareCategories(softwareId);
    const totalPages = Math.ceil(totalSoftwareCategories / limit);

    const links = getPaginationLinks(req as Request, { limit, page, totalPages });

    res.status(200).json({
      links,
      message: "Software's categories loaded",
      softwareCategories,
      success: true,
      totalPages,
      totalSoftwareCategories
    });
  } catch (error) {
    errorHandler(error as HttpResponseError, res);
  }
};

// Post software
export const postSoftware = async (req: Request, res: Response) => {
  try {
    const { description, icon, name, categoryIds, url } = req.body;

    const software = await softwareServices.getSoftwareByName(name);

    if (software) {
      throw new HttpResponseError({
        description: `Software ${name} already exists`,
        message: 'Software already exists',
        status: 'BAD_REQUEST'
      });
    }

    const createdSoftware = await softwareServices.postSoftware({
      categoryIds,
      description,
      icon,
      name,
      url
    });

    res.status(200).json({
      message: 'Software successfully created',
      software: createdSoftware,
      success: true
    });
  } catch (error) {
    errorHandler(error as HttpResponseError, res);
  }
};

// Put software
export const putSoftware = async (req: PutSoftwareRequest, res: PutSoftwareResponse) => {
  try {
    const { softwareId } = req.params;
    const { description, icon, name, url } = req.body;

    if (!softwareId) {
      throw new HttpResponseError({
        description: 'softwareId is required. Please check your params',
        message: 'softwareId is required',
        status: 'FORBIDDEN'
      });
    }

    const software = await softwareServices.getSoftwareById(softwareId);

    if (!software) {
      throw new HttpResponseError({
        description: `Software ${softwareId} not found`,
        message: 'Software not found',
        status: 'NOT_FOUND'
      });
    }

    const editedSoftware = await softwareServices.putSoftware(softwareId, {
      description,
      icon,
      name,
      url
    });

    res.status(200).json({
      message: 'Software edited',
      software: editedSoftware,
      success: true
    });
  } catch (error) {
    errorHandler(error as HttpResponseError, res);
  }
};

// Put software's categories
export const putSoftwareCategories = async (
  req: PutSoftwareCategoriesRequest,
  res: PutSoftwareCategoriesResponse
) => {
  try {
    const { softwareId } = req.params;
    const { categoryIds } = req.body;

    if (!softwareId) {
      throw new HttpResponseError({
        description: 'softwareId is required. Please check your params',
        message: 'softwareId is required',
        status: 'FORBIDDEN'
      });
    }

    const software = await softwareServices.getSoftwareById(softwareId);

    if (!software) {
      throw new HttpResponseError({
        description: `Software ${softwareId} not found`,
        message: 'Software not found',
        status: 'NOT_FOUND'
      });
    }

    const editedSoftware = await softwareServices.putSoftwareCategories(softwareId, {
      categoryIds
    });

    res.status(200).json({
      message: 'Software edited',
      software: editedSoftware,
      success: true
    });
  } catch (error) {
    errorHandler(error as HttpResponseError, res);
  }
};

// Delete software
export const deleteSoftware = async (req: DeleteSoftwareRequest, res: DeleteSoftwareResponse) => {
  try {
    const { softwareId } = req.params;

    if (!softwareId) {
      throw new HttpResponseError({
        description: 'softwareId is required. Please check your params',
        message: 'softwareId is required',
        status: 'FORBIDDEN'
      });
    }

    const software = await softwareServices.getSoftwareById(softwareId);

    if (!software) {
      throw new HttpResponseError({
        description: `Software ${softwareId} not found`,
        message: 'Software not found',
        status: 'NOT_FOUND'
      });
    }

    await softwareServices.deleteSoftware(softwareId);

    res.status(200).json({
      message: 'Software deleted',
      success: true
    });
  } catch (error) {
    errorHandler(error as HttpResponseError, res);
  }
};

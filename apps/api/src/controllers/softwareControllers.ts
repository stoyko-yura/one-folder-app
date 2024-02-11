import type { Request, Response } from 'express';

import { HttpResponseError, errorHandler, getPaginationLinks } from '@/middleware';
import { softwareServices } from '@/services';

// Get softwares
export const getSoftwares = async (req: Request, res: Response) => {
  try {
    const { page, limit, pageIndex } = req.query;

    const software = await softwareServices.findSoftwareWithPagination({
      limit: Number(limit),
      orderBy: {
        name: 'asc'
      },
      pageIndex: Number(pageIndex)
    });

    if (!software) {
      throw new HttpResponseError({
        message: 'Softwares not found',
        status: 'NOT_FOUND'
      });
    }

    const totalSoftware = await softwareServices.getTotalSoftware();
    const totalPages = Math.ceil(totalSoftware / Number(limit));

    const links = getPaginationLinks(req, { limit: Number(limit), page: Number(page), totalPages });

    res.status(200).json({
      links,
      message: 'Software loaded',
      software,
      success: true,
      totalPages,
      totalSoftware
    });
  } catch (error) {
    errorHandler(error as HttpResponseError, res);
  }
};

// Get software
export const getSoftware = async (req: Request, res: Response) => {
  try {
    const { softwareId } = req.params;

    const software = await softwareServices.findSoftwareById(softwareId);

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
export const getSoftwareFolders = async (req: Request, res: Response) => {
  try {
    const { page, limit, pageIndex } = req.query;
    const { softwareId } = req.params;

    const software = await softwareServices.findSoftwareById(softwareId);

    if (!software) {
      throw new HttpResponseError({
        description: `Software ${softwareId} not found`,
        message: 'Software not found',
        status: 'NOT_FOUND'
      });
    }

    const softwareFolders = await softwareServices.findSoftwareFoldersWithPagination(softwareId, {
      limit: Number(limit),
      orderBy: {
        title: 'asc'
      },
      pageIndex: Number(pageIndex)
    });

    if (!softwareFolders) {
      throw new HttpResponseError({
        message: "Software's folders not found",
        status: 'NOT_FOUND'
      });
    }

    const totalSoftwareFolders = await softwareServices.getTotalSoftwareFolders(softwareId);
    const totalPages = Math.ceil(totalSoftwareFolders / Number(limit));

    const links = getPaginationLinks(req, { limit: Number(limit), page: Number(page), totalPages });

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
export const getSoftwareRatings = async (req: Request, res: Response) => {
  try {
    const { page, limit, pageIndex } = req.query;
    const { softwareId } = req.params;

    const software = await softwareServices.findSoftwareById(softwareId);

    if (!software) {
      throw new HttpResponseError({
        description: `Software ${softwareId} not found`,
        message: 'Software not found',
        status: 'NOT_FOUND'
      });
    }

    const softwareRatings = await softwareServices.findSoftwareRatingsWithPagination(softwareId, {
      limit: Number(limit),
      orderBy: {
        createdAt: 'asc'
      },
      pageIndex: Number(pageIndex)
    });

    if (!softwareRatings) {
      throw new HttpResponseError({
        message: "Software's ratings not found",
        status: 'NOT_FOUND'
      });
    }

    const totalSoftwareRatings = await softwareServices.getTotalSoftwareRatings(softwareId);
    const totalPages = Math.ceil(totalSoftwareRatings / Number(limit));

    const links = getPaginationLinks(req, { limit: Number(limit), page: Number(page), totalPages });

    res.status(200).json({
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
export const getSoftwareCategories = async (req: Request, res: Response) => {
  try {
    const { page, limit, pageIndex } = req.query;
    const { softwareId } = req.params;

    const software = await softwareServices.findSoftwareById(softwareId);

    if (!software) {
      throw new HttpResponseError({
        description: `Software ${softwareId} not found`,
        message: 'Software not found',
        status: 'NOT_FOUND'
      });
    }

    const softwareCategories = await softwareServices.findSoftwareCategoriesWithPagination(
      softwareId,
      {
        limit: Number(limit),
        orderBy: {
          name: 'asc'
        },
        pageIndex: Number(pageIndex)
      }
    );

    if (!softwareCategories) {
      throw new HttpResponseError({
        message: "Software's categories not found",
        status: 'NOT_FOUND'
      });
    }

    const totalSoftwareCategories = await softwareServices.getTotalSoftwareCategories(softwareId);
    const totalPages = Math.ceil(totalSoftwareCategories / Number(limit));

    const links = getPaginationLinks(req, { limit: Number(limit), page: Number(page), totalPages });

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

    const software = await softwareServices.findSoftwareByName(name);

    if (software) {
      throw new HttpResponseError({
        description: `Software ${name} already exists`,
        message: 'Software already exists',
        status: 'BAD_REQUEST'
      });
    }

    const createdSoftware = await softwareServices.createSoftware({
      categories: {
        connect: categoryIds.map((categoryId: string) => ({ id: categoryId }))
      },
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
export const putSoftware = async (req: Request, res: Response) => {
  try {
    const { softwareId } = req.params;
    const { description, icon, name, url } = req.body;

    const software = await softwareServices.findSoftwareById(softwareId);

    if (!software) {
      throw new HttpResponseError({
        description: `Software ${softwareId} not found`,
        message: 'Software not found',
        status: 'NOT_FOUND'
      });
    }

    const editedSoftware = await softwareServices.updateSoftware(softwareId, {
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
export const putSoftwareCategories = async (req: Request, res: Response) => {
  try {
    const { softwareId } = req.params;
    const { categoryIds } = req.body;

    const software = await softwareServices.findSoftwareById(softwareId);

    if (!software) {
      throw new HttpResponseError({
        description: `Software ${softwareId} not found`,
        message: 'Software not found',
        status: 'NOT_FOUND'
      });
    }

    const addedCategoriesToSoftware = await softwareServices.updateSoftwareCategories(
      softwareId,
      categoryIds
    );

    res.status(200).json({
      message: 'Software edited',
      software: addedCategoriesToSoftware,
      success: true
    });
  } catch (error) {
    errorHandler(error as HttpResponseError, res);
  }
};

// Delete software
export const deleteSoftware = async (req: Request, res: Response) => {
  try {
    const { softwareId } = req.params;

    const software = await softwareServices.findSoftwareById(softwareId);

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

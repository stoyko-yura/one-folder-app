import type { Request, Response } from 'express';
import { validationResult } from 'express-validator';

import { dbClient } from '@/config';
import { errorHandler } from '@/middleware';

// Get software categories
export const getSoftwareCategories = async (req: Request, res: Response) => {
  try {
    const { page, limit, pageIndex } = req.query;

    const softwareCategories = await dbClient.softwareCategory.findMany({
      orderBy: {
        title: 'asc'
      },
      skip: Number(pageIndex) * (Number(limit) || 10),
      take: Number(limit) || 10
    });

    if (!softwareCategories.length) {
      return errorHandler(new Error('Software categories not found'), res, 404);
    }

    const totalSoftwareCategories = await dbClient.softwareCategory.count();
    const totalPages = Math.ceil(totalSoftwareCategories / Number(limit));

    const links = {
      next:
        Number(page) < totalPages
          ? `${req.protocol}://${req.headers.host}/api/softwareCategories?page=${
              Number(page) + 1
            }&limit=${Number(limit)}`
          : null,
      previus:
        Number(page) > 1
          ? `${req.protocol}://${req.headers.host}/api/softwareCategories?page=${
              Number(page) - 1
            }&limit=${Number(limit)}`
          : null
    };

    res.status(200).json({
      message: 'Software categories loaded',
      success: true,
      totalSoftwareCategories,
      totalPages,
      links,
      softwareCategories
    });
  } catch (error) {
    errorHandler(error as Error, res);
  }
};

// Get software category
export const getSoftwareCategory = async (req: Request, res: Response) => {
  try {
    const { softwareCategoryId } = req.params;

    const softwareCategory = await dbClient.softwareCategory.findUnique({
      where: {
        id: softwareCategoryId
      }
    });

    if (!softwareCategory) {
      return errorHandler(new Error('Software category not found'), res, 404);
    }

    res.status(200).json({
      message: 'Software category loaded',
      success: true,
      softwareCategory
    });
  } catch (error) {
    errorHandler(error as Error, res);
  }
};

// Post software category
export const postSoftwareCategory = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(500).json({
        errors: errors.array(),
        success: false
      });
    }

    const { title } = req.body;

    const softwareCategory = await dbClient.softwareCategory.findFirst({
      where: {
        title
      }
    });

    if (softwareCategory) {
      return errorHandler(new Error('Software category with this title already exist'), res);
    }

    const createdSoftwareCategory = await dbClient.softwareCategory.create({
      data: { title }
    });

    res.status(200).json({
      message: 'Software category successfully created',
      success: true,
      softwareCategory: createdSoftwareCategory
    });
  } catch (error) {
    errorHandler(error as Error, res);
  }
};

// Put software category
export const putSoftwareCategory = async (req: Request, res: Response) => {
  try {
    const { title } = req.body;
    const { softwareCategoryId } = req.params;

    let softwareCategory = await dbClient.softwareCategory.findUnique({
      where: {
        id: softwareCategoryId
      }
    });

    if (!softwareCategory) {
      return errorHandler(new Error(`Software category ${softwareCategoryId} not found`), res, 404);
    }

    softwareCategory = await dbClient.softwareCategory.findFirst({
      where: {
        title
      }
    });

    if (softwareCategory) {
      return errorHandler(new Error('Software category already exist'), res);
    }

    const editedSoftwareCategory = await dbClient.softwareCategory.update({
      data: {
        title
      },
      where: {
        id: softwareCategoryId
      }
    });

    res.status(200).json({
      message: 'Software category edited',
      success: true,
      softwareCategory: editedSoftwareCategory
    });
  } catch (error) {
    errorHandler(error as Error, res);
  }
};

// Delete software category
export const deleteSoftwareCategory = async (req: Request, res: Response) => {
  try {
    const { softwareCategoryId } = req.params;

    const softwareCategory = await dbClient.softwareCategory.findUnique({
      where: {
        id: softwareCategoryId
      }
    });

    if (!softwareCategory) {
      return errorHandler(new Error(`Software category ${softwareCategoryId} not found`), res, 404);
    }

    await dbClient.softwareCategory.delete({
      where: {
        id: softwareCategoryId
      }
    });

    res.status(200).json({
      message: 'Software category deleted',
      success: true
    });
  } catch (error) {
    errorHandler(error as Error, res);
  }
};

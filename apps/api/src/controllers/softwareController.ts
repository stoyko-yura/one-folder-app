import type { Request, Response } from 'express';
import { validationResult } from 'express-validator';

import { dbClient } from '@/config';
import { errorHandler } from '@/middleware';

// Get softwares
export const getSoftwares = async (req: Request, res: Response) => {
  try {
    const { page, limit, pageIndex } = req.query;

    const software = await dbClient.software.findMany({
      include: {
        _count: {
          select: {
            folders: true,
            ratings: true,
            softwareCategories: true
          }
        },
        softwareCategories: true
      },
      orderBy: {
        createdAt: 'asc'
      },
      skip: Number(pageIndex) * (Number(limit) || 10),
      take: Number(limit) || 10
    });

    if (!software.length) {
      return errorHandler(new Error('Softwares not found'), res, 404);
    }

    const totalSoftware = await dbClient.software.count();
    const totalPages = Math.ceil(totalSoftware / Number(limit));

    const links = {
      next:
        Number(page) < totalPages
          ? `${req.protocol}://${req.headers.host}/api/software?page=${
              Number(page) + 1
            }&limit=${Number(limit)}`
          : null,
      previus:
        Number(page) > 1
          ? `${req.protocol}://${req.headers.host}/api/software?page=${
              Number(page) - 1
            }&limit=${Number(limit)}`
          : null
    };

    res.status(200).json({
      links,
      message: 'Software loaded',
      software,
      success: true,
      totalPages,
      totalSoftware
    });
  } catch (error) {
    errorHandler(error as Error, res);
  }
};

// Get software
export const getSoftware = async (req: Request, res: Response) => {
  try {
    const { softwareId } = req.params;

    const software = await dbClient.software.findUnique({
      include: {
        _count: {
          select: {
            folders: true,
            ratings: true,
            softwareCategories: true
          }
        },
        softwareCategories: true
      },
      where: {
        id: softwareId
      }
    });

    if (!software) {
      return errorHandler(new Error(`Software ${softwareId} not found`), res, 404);
    }

    res.status(200).json({
      message: 'Software loaded',
      software,
      success: true
    });
  } catch (error) {
    errorHandler(error as Error, res);
  }
};

// Post software
export const postSoftware = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(500).json({
        errors: errors.array(),
        success: false
      });
    }

    const { description, icon, name, categories, url } = req.body;

    const software = await dbClient.software.findFirst({
      where: {
        name
      }
    });

    if (software) {
      return errorHandler(new Error(`Software ${name} is already exist`), res);
    }

    const createdSoftware = await dbClient.software.create({
      data: {
        description,
        icon,
        name,
        softwareCategories: {
          connectOrCreate: categories.map((category: string) => ({
            create: { name: category },
            where: { name: category }
          }))
        },
        url
      }
    });

    res.status(200).json({
      message: 'Folder successfully created',
      software: createdSoftware,
      success: true
    });
  } catch (error) {
    errorHandler(error as Error, res);
  }
};

// Put software
export const putSoftware = async (req: Request, res: Response) => {
  try {
    const { softwareId } = req.params;
    const { description, icon, name, categories, url } = req.body;

    const software = await dbClient.software.findUnique({
      where: {
        id: softwareId
      }
    });

    if (!software) {
      return errorHandler(new Error(`Software ${softwareId} not found`), res, 404);
    }

    const editedSoftware = await dbClient.software.update({
      data: {
        description,
        icon,
        name,
        softwareCategories: {
          connectOrCreate: categories.map((category: string) => ({
            create: { name: category },
            where: { name: category }
          }))
        },
        url
      },
      where: {
        id: softwareId
      }
    });

    res.status(200).json({
      message: 'Software edited',
      software: editedSoftware,
      success: true
    });
  } catch (error) {
    errorHandler(error as Error, res);
  }
};

// Delete software
export const deleteSoftware = async (req: Request, res: Response) => {
  try {
    const { softwareId } = req.params;

    const software = await dbClient.software.findUnique({
      where: {
        id: softwareId
      }
    });

    if (!software) {
      return errorHandler(new Error(`Software ${softwareId} not found`), res, 404);
    }

    await dbClient.software.delete({
      where: {
        id: softwareId
      }
    });

    res.status(200).json({
      message: 'Software deleted',
      success: true
    });
  } catch (error) {
    errorHandler(error as Error, res);
  }
};

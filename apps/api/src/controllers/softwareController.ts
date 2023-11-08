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
            categories: true,
            folders: true,
            ratings: true
          }
        },
        categories: true
      },
      orderBy: {
        name: 'asc'
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
            categories: true,
            folders: true,
            ratings: true
          }
        },
        categories: true
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

// Get software folders
export const getSoftwareFolders = async (req: Request, res: Response) => {
  try {
    const { page, limit, pageIndex } = req.query;
    const { softwareId } = req.params;

    const software = await dbClient.software.findUnique({
      where: {
        id: softwareId
      }
    });

    if (!software) {
      return errorHandler(new Error(`Software ${softwareId} not found`), res, 404);
    }

    const softwareFolders = await dbClient.folder.findMany({
      orderBy: {
        createdAt: 'asc'
      },
      skip: Number(pageIndex) * (Number(limit) || 10),
      take: Number(limit) || 10,
      where: {
        software: {
          some: {
            id: softwareId
          }
        }
      }
    });

    if (!softwareFolders.length) {
      return errorHandler(new Error("Software's folders not found"), res, 404);
    }

    const totalSoftwareFolders = (
      await dbClient.folder.findMany({
        where: {
          software: {
            some: {
              id: softwareId
            }
          }
        }
      })
    ).length;
    const totalPages = Math.ceil(totalSoftwareFolders / Number(limit));

    const links = {
      next:
        Number(page) < totalPages
          ? `${req.protocol}://${req.headers.host}/api/software/${softwareId}/folders?page=${
              Number(page) + 1
            }&limit=${Number(limit)}`
          : null,
      previus:
        Number(page) > 1
          ? `${req.protocol}://${req.headers.host}/api/software/${softwareId}/folders?page=${
              Number(page) - 1
            }&limit=${Number(limit)}`
          : null
    };

    res.status(200).json({
      links,
      message: "Software's folders loaded",
      softwareFolders,
      success: true,
      totalPages,
      totalSoftwareFolders
    });
  } catch (error) {
    errorHandler(error as Error, res);
  }
};

// Get software ratings
export const getSoftwareRatings = async (req: Request, res: Response) => {
  try {
    const { page, limit, pageIndex } = req.query;
    const { softwareId } = req.params;

    const software = await dbClient.software.findUnique({
      where: {
        id: softwareId
      }
    });

    if (!software) {
      return errorHandler(new Error(`Software ${softwareId} not found`), res, 404);
    }

    const softwareRatings = await dbClient.rating.findMany({
      orderBy: {
        createdAt: 'asc'
      },
      skip: Number(pageIndex) * (Number(limit) || 10),
      take: Number(limit) || 10,
      where: {
        softwareId
      }
    });

    if (!softwareRatings.length) {
      return errorHandler(new Error("Software's ratings not found"), res, 404);
    }

    const totalSoftwareRatings = (
      await dbClient.rating.findMany({
        where: {
          softwareId
        }
      })
    ).length;
    const totalPages = Math.ceil(totalSoftwareRatings / Number(limit));

    const links = {
      next:
        Number(page) < totalPages
          ? `${req.protocol}://${req.headers.host}/api/software/${softwareId}/ratings?page=${
              Number(page) + 1
            }&limit=${Number(limit)}`
          : null,
      previus:
        Number(page) > 1
          ? `${req.protocol}://${req.headers.host}/api/software/${softwareId}/ratings?page=${
              Number(page) - 1
            }&limit=${Number(limit)}`
          : null
    };

    res.status(200).json({
      links,
      message: "Software's ratings loaded",
      softwareRatings,
      success: true,
      totalPages,
      totalSoftwareRatings
    });
  } catch (error) {
    errorHandler(error as Error, res);
  }
};

// Get software categories
export const getSoftwareCategories = async (req: Request, res: Response) => {
  try {
    const { page, limit, pageIndex } = req.query;
    const { softwareId } = req.params;

    const software = await dbClient.software.findUnique({
      where: {
        id: softwareId
      }
    });

    if (!software) {
      return errorHandler(new Error(`Software ${softwareId} not found`), res, 404);
    }

    const softwareCategories = await dbClient.category.findMany({
      orderBy: {
        name: 'asc'
      },
      skip: Number(pageIndex) * (Number(limit) || 10),
      take: Number(limit) || 10,
      where: {
        software: {
          some: {
            id: softwareId
          }
        }
      }
    });

    if (!softwareCategories.length) {
      return errorHandler(new Error("Software's categories not found"), res, 404);
    }

    const totalSoftwareCategories = (
      await dbClient.category.findMany({
        where: {
          software: {
            some: { id: softwareId }
          }
        }
      })
    ).length;
    const totalPages = Math.ceil(totalSoftwareCategories / Number(limit));

    const links = {
      next:
        Number(page) < totalPages
          ? `${req.protocol}://${req.headers.host}/api/software/${softwareId}/categories?page=${
              Number(page) + 1
            }&limit=${Number(limit)}`
          : null,
      previus:
        Number(page) > 1
          ? `${req.protocol}://${req.headers.host}/api/software/${softwareId}/categories?page=${
              Number(page) - 1
            }&limit=${Number(limit)}`
          : null
    };

    res.status(200).json({
      links,
      message: "Software's categories loaded",
      softwareCategories,
      success: true,
      totalPages,
      totalSoftwareCategories
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
        categories: {
          connectOrCreate: categories.map((category: string) => ({
            create: { name: category },
            where: { name: category }
          }))
        },
        description,
        icon,
        name,
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
        categories: {
          connectOrCreate: categories.map((category: string) => ({
            create: { name: category },
            where: { name: category }
          }))
        },
        description,
        icon,
        name,
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

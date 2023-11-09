import type { Request, Response } from 'express';
import { validationResult } from 'express-validator';

import { dbClient } from '@/config';
import { errorHandler } from '@/middleware';

// Get folders
export const getFolders = async (req: Request, res: Response) => {
  try {
    const { page, limit, pageIndex } = req.query;

    const folders = await dbClient.folder.findMany({
      include: {
        _count: {
          select: {
            comments: true,
            ratings: true,
            software: true
          }
        }
      },
      orderBy: {
        createdAt: 'asc'
      },
      skip: Number(pageIndex) * (Number(limit) || 10),
      take: Number(limit) || 10
    });

    if (!folders.length) {
      return errorHandler(new Error('Folders not found'), res, 404);
    }

    const totalFolders = await dbClient.folder.count();
    const totalPages = Math.ceil(totalFolders / Number(limit));

    const links = {
      next:
        Number(page) < totalPages
          ? `${req.protocol}://${req.headers.host}/api/folders?page=${
              Number(page) + 1
            }&limit=${Number(limit)}`
          : null,
      previus:
        Number(page) > 1
          ? `${req.protocol}://${req.headers.host}/api/folders?page=${
              Number(page) - 1
            }&limit=${Number(limit)}`
          : null
    };

    res.status(200).json({
      folders,
      links,
      message: 'Folders loaded',
      success: true,
      totalFolders,
      totalPages
    });
  } catch (error) {
    errorHandler(error as Error, res);
  }
};

// Get folder
export const getFolder = async (req: Request, res: Response) => {
  try {
    const { folderId } = req.params;

    const folder = await dbClient.folder.findUnique({
      include: {
        _count: {
          select: {
            comments: true,
            ratings: true,
            software: true
          }
        },
        author: true,
        comments: true,
        software: true
      },
      where: {
        id: folderId
      }
    });

    if (!folder) {
      return errorHandler(new Error(`Folder ${folderId} not found`), res, 404);
    }

    res.status(200).json({
      folder,
      message: 'Folder loaded',
      success: true
    });
  } catch (error) {
    errorHandler(error as Error, res);
  }
};

// Get folder comments
export const getFolderComments = async (req: Request, res: Response) => {
  try {
    const { page, limit, pageIndex } = req.query;
    const { folderId } = req.params;

    const folder = await dbClient.folder.findUnique({
      where: {
        id: folderId
      }
    });

    if (!folder) {
      return errorHandler(new Error(`Folder ${folderId} not found`), res, 404);
    }

    const folderComments = await dbClient.comment.findMany({
      orderBy: {
        createdAt: 'asc'
      },
      skip: Number(pageIndex) * (Number(limit) || 10),
      take: Number(limit) || 10,
      where: {
        folderId
      }
    });

    if (!folderComments.length) {
      return errorHandler(new Error("Folder's comments not found"), res, 404);
    }

    const totalFolderComments = await dbClient.comment.count({
      where: {
        folderId
      }
    });
    const totalPages = Math.ceil(totalFolderComments / Number(limit));

    const links = {
      next:
        Number(page) < totalPages
          ? `${req.protocol}://${req.headers.host}/api/folders/${folderId}/comments?page=${
              Number(page) + 1
            }&limit=${Number(limit)}`
          : null,
      previus:
        Number(page) > 1
          ? `${req.protocol}://${req.headers.host}/api/folders/${folderId}/comments?page=${
              Number(page) - 1
            }&limit=${Number(limit)}`
          : null
    };

    res.status(200).json({
      folderComments,
      links,
      message: 'Folder comments loaded',
      success: true,
      totalFolderComments,
      totalPages
    });
  } catch (error) {
    errorHandler(error as Error, res);
  }
};

// Get folder ratings
export const getFolderRatings = async (req: Request, res: Response) => {
  try {
    const { page, limit, pageIndex } = req.query;
    const { folderId } = req.params;

    const folder = await dbClient.folder.findUnique({
      where: {
        id: folderId
      }
    });

    if (!folder) {
      return errorHandler(new Error(`Folder ${folderId} not found`), res, 404);
    }

    const folderRatings = await dbClient.rating.findMany({
      orderBy: {
        createdAt: 'asc'
      },
      skip: Number(pageIndex) * (Number(limit) || 10),
      take: Number(limit) || 10,
      where: {
        folderId
      }
    });

    if (!folderRatings.length) {
      return errorHandler(new Error("Folder's ratings not found"), res, 404);
    }

    const totalFolderRatings = await dbClient.rating.count({
      where: {
        folderId
      }
    });
    const totalPages = Math.ceil(totalFolderRatings / Number(limit));

    const links = {
      next:
        Number(page) < totalPages
          ? `${req.protocol}://${req.headers.host}/api/folders/${folderId}/ratings?page=${
              Number(page) + 1
            }&limit=${Number(limit)}`
          : null,
      previus:
        Number(page) > 1
          ? `${req.protocol}://${req.headers.host}/api/folders/${folderId}/ratings?page=${
              Number(page) - 1
            }&limit=${Number(limit)}`
          : null
    };

    res.status(200).json({
      folderRatings,
      links,
      message: "Folder's ratings loaded",
      success: true,
      totalFolderRatings,
      totalPages
    });
  } catch (error) {
    errorHandler(error as Error, res);
  }
};

// Get folder software
export const getFolderSoftware = async (req: Request, res: Response) => {
  try {
    const { page, limit, pageIndex } = req.query;
    const { folderId } = req.params;

    const folder = await dbClient.folder.findUnique({
      where: {
        id: folderId
      }
    });

    if (!folder) {
      return errorHandler(new Error(`Folder ${folderId} not found`), res, 404);
    }

    const folderSoftware = await dbClient.software.findMany({
      orderBy: {
        createdAt: 'asc'
      },
      skip: Number(pageIndex) * (Number(limit) || 10),
      take: Number(limit) || 10,
      where: {
        folders: {
          some: {
            id: folderId
          }
        }
      }
    });

    if (!folderSoftware.length) {
      return errorHandler(new Error("Folder's ratings not found"), res, 404);
    }

    const totalFolderSoftware = await dbClient.software.count({
      where: {
        folders: {
          some: {
            id: folderId
          }
        }
      }
    });
    const totalPages = Math.ceil(totalFolderSoftware / Number(limit));

    const links = {
      next:
        Number(page) < totalPages
          ? `${req.protocol}://${req.headers.host}/api/folders/${folderId}/software?page=${
              Number(page) + 1
            }&limit=${Number(limit)}`
          : null,
      previus:
        Number(page) > 1
          ? `${req.protocol}://${req.headers.host}/api/folders/${folderId}/software?page=${
              Number(page) - 1
            }&limit=${Number(limit)}`
          : null
    };

    res.status(200).json({
      folderSoftware,
      links,
      message: "Folder's software loaded",
      success: true,
      totalFolderSoftware,
      totalPages
    });
  } catch (error) {
    errorHandler(error as Error, res);
  }
};

// Post folder
export const postFolder = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(500).json({
        errors: errors.array(),
        success: false
      });
    }

    const { image, title, description, access, softwareIds, authorId } = req.body;

    const user = await dbClient.user.findUnique({
      where: {
        id: authorId
      }
    });

    if (!user) {
      return errorHandler(new Error(`User ${authorId} not found`), res, 404);
    }

    const createdFolder = await dbClient.folder.create({
      data: {
        access,
        authorId,
        description,
        image,
        software: {
          connect: softwareIds.map((softwareId: string) => ({ id: softwareId }))
        },
        title
      }
    });

    console.log(createdFolder);

    res.status(200).json({
      folder: createdFolder,
      message: 'Folder successfully created',
      success: true
    });
  } catch (error) {
    errorHandler(error as Error, res);
  }
};

// Put folder
export const putFolder = async (req: Request, res: Response) => {
  try {
    const { folderId } = req.params;
    const { image, title, description, access, software, authorId } = req.body;

    const folder = await dbClient.folder.findUnique({
      where: {
        id: folderId
      }
    });

    if (!folder) {
      return errorHandler(new Error(`Folder ${folderId} not found`), res, 404);
    }

    const editedFolder = await dbClient.folder.update({
      data: {
        access,
        authorId,
        description,
        image,
        software,
        title
      },
      where: {
        id: folderId
      }
    });

    res.status(200).json({
      folder: editedFolder,
      message: 'Folder edited',
      success: false
    });
  } catch (error) {
    errorHandler(error as Error, res);
  }
};

// Delete folder
export const deleteFolder = async (req: Request, res: Response) => {
  try {
    const { folderId } = req.params;

    const folder = await dbClient.folder.findUnique({
      where: {
        id: folderId
      }
    });

    if (!folder) {
      return errorHandler(new Error(`Folder ${folderId} not found`), res, 404);
    }

    await dbClient.folder.delete({
      where: {
        id: folderId
      }
    });

    res.status(200).json({
      message: 'Folder deleted',
      success: true
    });
  } catch (error) {
    errorHandler(error as Error, res);
  }
};

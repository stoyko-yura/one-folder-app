import type { Request, Response } from 'express';

import { getPaginationLinks } from '@/middleware';
import { folderServices, userServices } from '@/services';
import { HttpResponseError, errorHandler, excludeFields } from '@/utils';

// Get folders
export const getFolders = async (req: Request, res: Response) => {
  try {
    const { page, limit, pageIndex } = req.query;

    const folders = await folderServices.findFoldersWithPagination({
      limit: Number(limit),
      orderBy: {
        createdAt: 'asc'
      },
      pageIndex: Number(pageIndex)
    });

    if (!folders) {
      throw new HttpResponseError({
        message: 'Folders not found',
        status: 'NOT_FOUND'
      });
    }

    const totalFolders = await folderServices.getTotalFolders();
    const totalPages = Math.ceil(totalFolders / Number(limit));

    const links = getPaginationLinks(req, { limit: Number(limit), page: Number(page), totalPages });

    res.status(200).json({
      folders,
      links,
      message: 'Folders loaded',
      success: true,
      totalFolders,
      totalPages
    });
  } catch (error) {
    errorHandler(error as HttpResponseError, res);
  }
};

// Get folder
export const getFolder = async (req: Request, res: Response) => {
  try {
    const { folderId } = req.params;

    const folder = await folderServices.findFolderById(folderId);

    if (!folder) {
      throw new HttpResponseError({
        description: `Folder ${folderId} not found`,
        message: 'Folder not found',
        status: 'NOT_FOUND'
      });
    }

    res.status(200).json({
      folder: excludeFields(folder, ['author.hash']),
      message: 'Folder loaded',
      success: true
    });
  } catch (error) {
    errorHandler(error as HttpResponseError, res);
  }
};

// Get folder's comments
export const getFolderComments = async (req: Request, res: Response) => {
  try {
    const { page, limit, pageIndex } = req.query;
    const { folderId } = req.params;

    const folder = await folderServices.findFolderById(folderId);

    if (!folder) {
      throw new HttpResponseError({
        description: `Folder ${folderId} not found`,
        message: 'Folder not found',
        status: 'NOT_FOUND'
      });
    }

    const folderComments = await folderServices.findFolderCommentsWithPaginations(folderId, {
      limit: Number(limit),
      orderBy: {
        createdAt: 'asc'
      },
      pageIndex: Number(pageIndex)
    });

    if (!folderComments) {
      throw new HttpResponseError({
        message: "Folder's comments not found",
        status: 'NOT_FOUND'
      });
    }

    const totalFolderComments = await folderServices.getTotalFolderComments(folderId);
    const totalPages = Math.ceil(totalFolderComments / Number(limit));

    const links = getPaginationLinks(req, { limit: Number(limit), page: Number(page), totalPages });

    res.status(200).json({
      folderComments,
      links,
      message: 'Folder comments loaded',
      success: true,
      totalFolderComments,
      totalPages
    });
  } catch (error) {
    errorHandler(error as HttpResponseError, res);
  }
};

// Get folder's ratings
export const getFolderRatings = async (req: Request, res: Response) => {
  try {
    const { page, limit, pageIndex } = req.query;
    const { folderId } = req.params;

    const folder = await folderServices.findFolderById(folderId);

    if (!folder) {
      throw new HttpResponseError({
        description: `Folder ${folderId} not found`,
        message: 'Folder not found',
        status: 'NOT_FOUND'
      });
    }

    const folderRatings = await folderServices.findFolderRatingsWithPagination(folderId, {
      limit: Number(limit),
      orderBy: {
        createdAt: 'asc'
      },
      pageIndex: Number(pageIndex)
    });

    if (!folderRatings) {
      throw new HttpResponseError({
        message: "Folder's ratings not found",
        status: 'NOT_FOUND'
      });
    }

    const totalFolderRatings = await folderServices.getTotalFolderRatings(folderId);
    const totalPages = Math.ceil(totalFolderRatings / Number(limit));

    const links = getPaginationLinks(req, { limit: Number(limit), page: Number(page), totalPages });

    const averageRating = await folderServices.getAverageFolderRating(folderId);

    res.status(200).json({
      averageRating,
      folderRatings,
      links,
      message: "Folder's ratings loaded",
      success: true,
      totalFolderRatings,
      totalPages
    });
  } catch (error) {
    errorHandler(error as HttpResponseError, res);
  }
};

// Get folder's software
export const getFolderSoftware = async (req: Request, res: Response) => {
  try {
    const { page, limit, pageIndex } = req.query;
    const { folderId } = req.params;

    const folder = await folderServices.findFolderById(folderId);

    if (!folder) {
      throw new HttpResponseError({
        description: `Folder ${folderId} not found`,
        message: 'Folder not found',
        status: 'NOT_FOUND'
      });
    }

    const folderSoftware = await folderServices.findFolderSoftwareWithPagination(folderId, {
      limit: Number(limit),
      orderBy: {
        createdAt: 'asc'
      },
      pageIndex: Number(pageIndex)
    });

    if (!folderSoftware) {
      throw new HttpResponseError({
        message: "Folder's software not found",
        status: 'NOT_FOUND'
      });
    }

    const totalFolderSoftware = await folderServices.getTotalFolderSoftware(folderId);
    const totalPages = Math.ceil(totalFolderSoftware / Number(limit));

    const links = getPaginationLinks(req, { limit: Number(limit), page: Number(page), totalPages });

    res.status(200).json({
      folderSoftware,
      links,
      message: "Folder's software loaded",
      success: true,
      totalFolderSoftware,
      totalPages
    });
  } catch (error) {
    errorHandler(error as HttpResponseError, res);
  }
};

// Post folder
export const postFolder = async (req: Request, res: Response) => {
  try {
    const { image, title, description, access, authorId } = req.body;

    const user = await userServices.findUserById(authorId);

    if (!user) {
      throw new HttpResponseError({
        description: `User ${authorId} not found`,
        message: 'User not found',
        status: 'NOT_FOUND'
      });
    }

    const createdFolder = await folderServices.createFolder({
      access,
      authorId,
      description,
      image,
      title
    });

    res.status(200).json({
      folder: createdFolder,
      message: 'Folder successfully created',
      success: true
    });
  } catch (error) {
    errorHandler(error as HttpResponseError, res);
  }
};

// Put folder
export const putFolder = async (req: Request, res: Response) => {
  try {
    const { folderId } = req.params;
    const { image, title, description, access } = req.body;

    const folder = await folderServices.findFolderById(folderId);

    if (!folder) {
      throw new HttpResponseError({
        description: `Folder ${folderId} not found`,
        message: 'Folder not found',
        status: 'NOT_FOUND'
      });
    }

    const editedFolder = await folderServices.updateFolder(folderId, {
      access,
      description,
      image,
      title
    });

    res.status(200).json({
      folder: editedFolder,
      message: 'Folder edited',
      success: false
    });
  } catch (error) {
    errorHandler(error as HttpResponseError, res);
  }
};

// Delete folder
export const deleteFolder = async (req: Request, res: Response) => {
  try {
    const { folderId } = req.params;

    const folder = folderServices.findFolderById(folderId);

    if (!folder) {
      throw new HttpResponseError({
        description: `Folder ${folderId} not found`,
        message: 'Folder not found',
        status: 'NOT_FOUND'
      });
    }

    await folderServices.deleteFolder(folderId);

    res.status(200).json({
      message: 'Folder deleted',
      success: true
    });
  } catch (error) {
    errorHandler(error as HttpResponseError, res);
  }
};

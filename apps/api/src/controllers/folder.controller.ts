import type { FolderData } from '@one-folder-app/types';
import type { Request, Response } from 'express';

import { getPaginationLinks } from '@/middleware';
import { folderServices, userServices } from '@/services';
import type {
  DeleteFolderRequest,
  DeleteFolderResponse,
  GetFolderCommentsRequest,
  GetFolderCommentsResponse,
  GetFolderRatingsRequest,
  GetFolderRatingsResponse,
  GetFolderRequest,
  GetFolderResponse,
  GetFolderSoftwareRequest,
  GetFolderSoftwareResponse,
  GetFoldersRequest,
  GetFoldersResponse,
  PostFolderRequest,
  PostFolderResponse,
  PutFolderRequest,
  PutFolderResponse
} from '@/types';
import { HttpResponseError, errorHandler, excludeFields } from '@/utils';

// Get folders
export const getFolders = async (req: GetFoldersRequest, res: GetFoldersResponse) => {
  try {
    const { limit = 10, page = 1, pageIndex = 0, orderBy = { createdAt: 'asc' } } = req.query;

    const folders = await folderServices.getFoldersWithPagination({
      limit,
      orderBy,
      pageIndex
    });

    if (!folders) {
      throw new HttpResponseError({
        message: 'Folders not found',
        status: 'NOT_FOUND'
      });
    }

    const totalFolders = await folderServices.getTotalFolders();
    const totalPages = Math.ceil(totalFolders / limit);

    const links = getPaginationLinks(req as Request, { limit, page, totalPages });

    res.status(200).json({
      folders: folders as FolderData[],
      links,
      message: 'Folders loaded',
      success: true,
      totalFolders,
      totalPages
    });
  } catch (error) {
    errorHandler(error as HttpResponseError, res as Response);
  }
};

// Get folder
export const getFolder = async (req: GetFolderRequest, res: GetFolderResponse) => {
  try {
    const { folderId } = req.params;

    if (!folderId) {
      throw new HttpResponseError({
        description: 'folderId is required. Please check your params',
        message: 'folderId is required',
        status: 'FORBIDDEN'
      });
    }

    const folder = await folderServices.getFolderById(folderId);

    if (!folder) {
      throw new HttpResponseError({
        description: `Folder ${folderId} not found`,
        message: 'Folder not found',
        status: 'NOT_FOUND'
      });
    }

    res.status(200).json({
      folder: excludeFields(folder, ['author.hash']) as FolderData,
      message: 'Folder loaded',
      success: true
    });
  } catch (error) {
    errorHandler(error as HttpResponseError, res as Response);
  }
};

// Get folder's comments
export const getFolderComments = async (
  req: GetFolderCommentsRequest,
  res: GetFolderCommentsResponse
) => {
  try {
    const { limit = 10, page = 1, pageIndex = 0, orderBy = { createdAt: 'asc' } } = req.query;
    const { folderId } = req.params;

    if (!folderId) {
      throw new HttpResponseError({
        description: 'folderId is required. Please check your params',
        message: 'folderId is required',
        status: 'FORBIDDEN'
      });
    }

    const folder = await folderServices.getFolderById(folderId);

    if (!folder) {
      throw new HttpResponseError({
        description: `Folder ${folderId} not found`,
        message: 'Folder not found',
        status: 'NOT_FOUND'
      });
    }

    const folderComments = await folderServices.getFolderCommentsWithPaginations(folderId, {
      limit,
      orderBy,
      pageIndex
    });

    if (!folderComments) {
      throw new HttpResponseError({
        message: "Folder's comments not found",
        status: 'NOT_FOUND'
      });
    }

    const totalFolderComments = await folderServices.getTotalFolderComments(folderId);
    const totalPages = Math.ceil(totalFolderComments / limit);

    const links = getPaginationLinks(req as Request, { limit, page, totalPages });

    res.status(200).json({
      folderComments,
      links,
      message: 'Folder comments loaded',
      success: true,
      totalFolderComments,
      totalPages
    });
  } catch (error) {
    errorHandler(error as HttpResponseError, res as Response);
  }
};

// Get folder's ratings
export const getFolderRatings = async (
  req: GetFolderRatingsRequest,
  res: GetFolderRatingsResponse
) => {
  try {
    const { limit = 10, page = 1, pageIndex = 0, orderBy = { createdAt: 'asc' } } = req.query;
    const { folderId } = req.params;

    if (!folderId) {
      throw new HttpResponseError({
        description: 'folderId is required. Please check your params',
        message: 'folderId is required',
        status: 'FORBIDDEN'
      });
    }

    const folder = await folderServices.getFolderById(folderId);

    if (!folder) {
      throw new HttpResponseError({
        description: `Folder ${folderId} not found`,
        message: 'Folder not found',
        status: 'NOT_FOUND'
      });
    }

    const folderRatings = await folderServices.getFolderRatingsWithPagination(folderId, {
      limit,
      orderBy,
      pageIndex
    });

    if (!folderRatings) {
      throw new HttpResponseError({
        message: "Folder's ratings not found",
        status: 'NOT_FOUND'
      });
    }

    const totalFolderRatings = await folderServices.getTotalFolderRatings(folderId);
    const totalPages = Math.ceil(totalFolderRatings / limit);

    const links = getPaginationLinks(req as Request, { limit, page, totalPages });

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
    errorHandler(error as HttpResponseError, res as Response);
  }
};

// Get folder's software
export const getFolderSoftware = async (
  req: GetFolderSoftwareRequest,
  res: GetFolderSoftwareResponse
) => {
  try {
    const { limit = 10, page = 1, pageIndex = 0, orderBy = { name: 'asc' } } = req.query;
    const { folderId } = req.params;

    if (!folderId) {
      throw new HttpResponseError({
        description: 'folderId is required. Please check your params',
        message: 'folderId is required',
        status: 'FORBIDDEN'
      });
    }

    const folder = await folderServices.getFolderById(folderId);

    if (!folder) {
      throw new HttpResponseError({
        description: `Folder ${folderId} not found`,
        message: 'Folder not found',
        status: 'NOT_FOUND'
      });
    }

    const folderSoftware = await folderServices.getFolderSoftwareWithPagination(folderId, {
      limit,
      orderBy,
      pageIndex
    });

    if (!folderSoftware) {
      throw new HttpResponseError({
        message: "Folder's software not found",
        status: 'NOT_FOUND'
      });
    }

    const totalFolderSoftware = await folderServices.getTotalFolderSoftware(folderId);
    const totalPages = Math.ceil(totalFolderSoftware / limit);

    const links = getPaginationLinks(req as Request, { limit, page, totalPages });

    res.status(200).json({
      folderSoftware,
      links,
      message: "Folder's software loaded",
      success: true,
      totalFolderSoftware,
      totalPages
    });
  } catch (error) {
    errorHandler(error as HttpResponseError, res as Response);
  }
};

// Post folder
export const postFolder = async (req: PostFolderRequest, res: PostFolderResponse) => {
  try {
    const { authorId, title, access, description, image } = req.body;

    const user = await userServices.getUserById(authorId);

    if (!user) {
      throw new HttpResponseError({
        description: `User ${authorId} not found`,
        message: 'User not found',
        status: 'NOT_FOUND'
      });
    }

    const createdFolder = await folderServices.postFolder({
      access,
      authorId,
      description,
      image,
      title
    });

    res.status(200).json({
      folder: createdFolder as FolderData,
      message: 'Folder successfully created',
      success: true
    });
  } catch (error) {
    errorHandler(error as HttpResponseError, res as Response);
  }
};

// Put folder
export const putFolder = async (req: PutFolderRequest, res: PutFolderResponse) => {
  try {
    const { folderId } = req.params;
    const { access, description, image, title } = req.body;

    if (!folderId) {
      throw new HttpResponseError({
        description: 'folderId is required. Please check your params',
        message: 'folderId is required',
        status: 'FORBIDDEN'
      });
    }

    const folder = await folderServices.getFolderById(folderId);

    if (!folder) {
      throw new HttpResponseError({
        description: `Folder ${folderId} not found`,
        message: 'Folder not found',
        status: 'NOT_FOUND'
      });
    }

    const editedFolder = await folderServices.putFolder(folderId, {
      access,
      description,
      image,
      title
    });

    res.status(200).json({
      folder: editedFolder as FolderData,
      message: 'Folder edited',
      success: false
    });
  } catch (error) {
    errorHandler(error as HttpResponseError, res as Response);
  }
};

// Delete folder
export const deleteFolder = async (req: DeleteFolderRequest, res: DeleteFolderResponse) => {
  try {
    const { folderId } = req.params;

    if (!folderId) {
      throw new HttpResponseError({
        description: 'folderId is required. Please check your params',
        message: 'folderId is required',
        status: 'FORBIDDEN'
      });
    }

    const folder = folderServices.getFolderById(folderId);

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
    errorHandler(error as HttpResponseError, res as Response);
  }
};

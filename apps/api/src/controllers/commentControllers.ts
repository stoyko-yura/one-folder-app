import type { Request, Response } from 'express';
import { validationResult } from 'express-validator';

import { errorHandler, getPaginationLinks } from '@/middleware';
import { commentServices, folderServices, userServices } from '@/services';

// Get comments
export const getComments = async (req: Request, res: Response) => {
  try {
    const { page, limit, pageIndex } = req.query;

    const comments = await commentServices.findCommentsWithPagination({
      limit: Number(limit),
      pageIndex: Number(pageIndex)
    });

    if (!comments) {
      return errorHandler(new Error('Comments not found'), res, 404);
    }

    const totalComments = await commentServices.getTotalComments();
    const totalPages = Math.ceil(totalComments / Number(limit));

    const links = getPaginationLinks(req, { limit: Number(limit), page: Number(page), totalPages });

    res.status(200).json({
      comments,
      links,
      message: 'Comments loaded',
      success: true,
      totalComments,
      totalPages
    });
  } catch (error) {
    errorHandler(error as Error, res);
  }
};

// Get comment
export const getComment = async (req: Request, res: Response) => {
  try {
    const { commentId } = req.params;

    const comment = await commentServices.findCommentById(commentId);

    if (!comment) {
      return errorHandler(new Error(`Comment ${commentId} not found`), res, 404);
    }

    res.status(200).json({
      comment,
      message: 'Comment loaded',
      success: true
    });
  } catch (error) {
    errorHandler(error as Error, res);
  }
};

// Get comment's ratings
export const getCommentRatings = async (req: Request, res: Response) => {
  try {
    const { page, limit, pageIndex } = req.query;
    const { commentId } = req.params;

    const comment = await commentServices.findCommentById(commentId);

    if (!comment) {
      return errorHandler(new Error(`Comment ${commentId} not found`), res, 404);
    }

    const commentRatings = await commentServices.getCommentRatingsWithPagination(commentId, {
      limit: Number(limit),
      orderBy: {
        createdAt: 'asc'
      },
      pageIndex: Number(pageIndex)
    });

    if (!commentRatings) {
      return errorHandler(new Error('Comment ratings not found'), res, 404);
    }

    const totalCommentRatings = await commentServices.getTotalCommentRatings(commentId);
    const totalPages = Math.ceil(totalCommentRatings / Number(limit));

    const links = getPaginationLinks(req, { limit: Number(limit), page: Number(page), totalPages });

    res.status(200).json({
      commentRatings,
      links,
      message: 'Comment ratings loaded',
      success: true,
      totalCommentRatings,
      totalPages
    });
  } catch (error) {
    errorHandler(error as Error, res);
  }
};

// Post comment
export const postComment = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(500).json({
        errors: errors.array(),
        success: false
      });
    }

    const { authorId, folderId, message } = req.body;

    const user = await userServices.findUserById(authorId);

    if (!user) {
      return errorHandler(new Error(`User ${authorId} not found`), res, 404);
    }

    const folder = await folderServices.findFolderById(folderId);

    if (!folder) {
      return errorHandler(new Error(`Folder ${folderId} not found`), res, 404);
    }

    const existComment = await commentServices.findCommentByAuthorIdAndFolderId(authorId, folderId);

    if (existComment) {
      return errorHandler(new Error(`User ${authorId} already commented folder ${folderId}`), res);
    }

    const createdComment = await commentServices.createComment({
      authorId,
      folderId,
      message
    });

    res.status(200).json({
      comment: createdComment,
      message: 'Comment successfully created',
      success: true
    });
  } catch (error) {
    errorHandler(error as Error, res);
  }
};

// Put comment
export const putComment = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(500).json({
        errors: errors.array(),
        success: false
      });
    }

    const { commentId } = req.params;
    const { message } = req.body;

    const comment = await commentServices.findCommentById(commentId);

    if (!comment) {
      return errorHandler(new Error(`Comment ${commentId} not found`), res, 404);
    }

    const editedComment = await commentServices.updateComment(commentId, {
      message
    });

    res.status(200).json({
      comment: editedComment,
      message: 'Comment edited',
      success: true
    });
  } catch (error) {
    errorHandler(error as Error, res);
  }
};

// Delete comment
export const deleteComment = async (req: Request, res: Response) => {
  try {
    const { commentId } = req.params;

    const comment = await commentServices.findCommentById(commentId);

    if (!comment) {
      return errorHandler(new Error(`Comment ${commentId} not found`), res, 404);
    }

    await commentServices.deleteComment(commentId);

    res.status(200).json({
      message: 'Comment deleted',
      success: true
    });
  } catch (error) {
    errorHandler(error as Error, res);
  }
};
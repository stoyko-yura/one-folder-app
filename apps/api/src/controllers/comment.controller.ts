import type { Request } from 'express';

import { getPaginationLinks } from '@/middleware';
import { commentServices, folderServices, userServices } from '@/services';
import type {
  DeleteCommentRequest,
  DeleteCommentResponse,
  GetCommentRatingsRequest,
  GetCommentRatingsResponse,
  GetCommentRequest,
  GetCommentResponse,
  GetCommentsRequest,
  GetCommentsResponse,
  PostCommentRequest,
  PostCommentResponse,
  PutCommentRequest,
  PutCommentResponse
} from '@/types';
import { HttpResponseError, errorHandler } from '@/utils';

// Get comments
export const getComments = async (req: GetCommentsRequest, res: GetCommentsResponse) => {
  try {
    const { limit, page, pageIndex, orderBy } = req.query;

    const comments = await commentServices.getCommentsWithPagination({
      limit,
      orderBy,
      pageIndex
    });

    if (!comments) {
      throw new HttpResponseError({
        message: 'Comments not found',
        status: 'NOT_FOUND'
      });
    }

    const totalComments = await commentServices.getTotalComments();
    const totalPages = Math.ceil(totalComments / limit);

    const links = getPaginationLinks(req as unknown as Request, {
      limit,
      page,
      totalPages
    });

    res.status(200).json({
      comments,
      links,
      message: 'Comments loaded',
      success: true,
      totalComments,
      totalPages
    });
  } catch (error) {
    errorHandler(error as HttpResponseError, res);
  }
};

// Get comment
export const getComment = async (req: GetCommentRequest, res: GetCommentResponse) => {
  try {
    const { commentId } = req.params;

    const comment = await commentServices.getCommentById(commentId);

    if (!comment) {
      throw new HttpResponseError({
        description: `Comment ${commentId} not found`,
        message: 'Comment not found',
        status: 'NOT_FOUND'
      });
    }

    res.status(200).json({
      comment,
      message: 'Comment loaded',
      success: true
    });
  } catch (error) {
    errorHandler(error as HttpResponseError, res);
  }
};

// Get comment's ratings
export const getCommentRatings = async (
  req: GetCommentRatingsRequest,
  res: GetCommentRatingsResponse
) => {
  try {
    const { limit, page, pageIndex, orderBy } = req.query;
    const { commentId } = req.params;

    const comment = await commentServices.getCommentById(commentId);

    if (!comment) {
      throw new HttpResponseError({
        description: `Comment ${commentId} not found`,
        message: 'Comment not found',
        status: 'NOT_FOUND'
      });
    }

    const commentRatings = await commentServices.getCommentRatingsWithPagination(commentId, {
      limit,
      orderBy,
      pageIndex
    });

    if (!commentRatings) {
      throw new HttpResponseError({
        message: "Comment's ratings not found",
        status: 'NOT_FOUND'
      });
    }

    const totalCommentRatings = await commentServices.getTotalCommentRatings(commentId);
    const totalPages = Math.ceil(totalCommentRatings / limit);

    const links = getPaginationLinks(req as unknown as Request, {
      limit,
      page,
      totalPages
    });

    res.status(200).json({
      commentRatings,
      links,
      message: "Comment's ratings loaded",
      success: true,
      totalCommentRatings,
      totalPages
    });
  } catch (error) {
    errorHandler(error as HttpResponseError, res);
  }
};

// Post comment
export const postComment = async (req: PostCommentRequest, res: PostCommentResponse) => {
  try {
    const { authorId, folderId, message } = req.body;

    const user = await userServices.getUserById(authorId);

    if (!user) {
      throw new HttpResponseError({
        description: `User ${authorId} not found`,
        message: 'User not found',
        status: 'NOT_FOUND'
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

    const existComment = await commentServices.getCommentByAuthorIdAndFolderId(authorId, folderId);

    if (existComment) {
      throw new HttpResponseError({
        description: `User ${authorId} already commented on folder ${folderId}`,
        message: 'User already commented on folder',
        status: 'BAD_REQUEST'
      });
    }

    const createdComment = await commentServices.postComment({
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
    errorHandler(error as HttpResponseError, res);
  }
};

// Put comment
export const putComment = async (req: PutCommentRequest, res: PutCommentResponse) => {
  try {
    const { commentId } = req.params;
    const { message } = req.body;

    const comment = await commentServices.getCommentById(commentId);

    if (!comment) {
      throw new HttpResponseError({
        description: `Comment ${commentId} not found`,
        message: 'Comment not found',
        status: 'NOT_FOUND'
      });
    }

    const editedComment = await commentServices.putComment(commentId, {
      message
    });

    res.status(200).json({
      comment: editedComment,
      message: 'Comment edited',
      success: true
    });
  } catch (error) {
    errorHandler(error as HttpResponseError, res);
  }
};

// Delete comment
export const deleteComment = async (req: DeleteCommentRequest, res: DeleteCommentResponse) => {
  try {
    const { commentId } = req.params;

    const comment = await commentServices.getCommentById(commentId);

    if (!comment) {
      throw new HttpResponseError({
        description: `Comment ${commentId} not found`,
        message: 'Comment not found',
        status: 'NOT_FOUND'
      });
    }

    await commentServices.deleteComment(commentId);

    res.status(200).json({
      message: 'Comment deleted',
      success: true
    });
  } catch (error) {
    errorHandler(error as HttpResponseError, res);
  }
};

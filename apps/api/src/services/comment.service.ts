import type { Comment, Rating } from '@one-folder-app/database';
import type {
  GetCommentRatingsPaginationParams,
  GetCommentsPaginationParams,
  PostCommentRequestBody,
  PutCommentRequestBody
} from '@one-folder-app/types';

import { dbClient } from '@/config';

export const getCommentById = async (id: string): Promise<Comment | null> => {
  const comment = await dbClient.comment.findUnique({
    include: {
      _count: {
        select: {
          ratings: true
        }
      },
      ratings: true
    },
    where: {
      id
    }
  });

  return comment;
};

export const getCommentByAuthorIdAndFolderId = async (
  authorId: string,
  folderId: string
): Promise<Comment | null> => {
  const comment = await dbClient.comment.findUnique({
    where: {
      authorId,
      folderId
    }
  });

  return comment;
};

export const getCommentsWithPagination = async (
  options: GetCommentsPaginationParams
): Promise<Comment[] | null> => {
  const { limit = 10, orderBy = { createdAt: 'asc' }, pageIndex = 0 } = options;

  const comments = await dbClient.comment.findMany({
    include: {
      _count: {
        select: {
          ratings: true
        }
      }
    },
    orderBy,
    skip: pageIndex * limit,
    take: limit
  });

  if (!comments.length) return null;

  return comments;
};

export const getCommentRatingsWithPagination = async (
  id: string,
  options: GetCommentRatingsPaginationParams
): Promise<Rating[] | null> => {
  const { limit = 10, orderBy = { createdAt: 'asc' }, pageIndex = 0 } = options;

  const ratings = await dbClient.rating.findMany({
    orderBy,
    skip: pageIndex * limit,
    take: limit,
    where: {
      commentId: id
    }
  });

  if (!ratings.length) return null;

  return ratings;
};

export const postComment = async (data: PostCommentRequestBody): Promise<Comment> => {
  const { authorId, folderId, message } = data;

  const comment = await dbClient.comment.create({
    data: {
      authorId,
      folderId,
      message
    }
  });

  return comment;
};

export const putComment = async (id: string, data: PutCommentRequestBody): Promise<Comment> => {
  const { message } = data;

  const comment = await dbClient.comment.update({
    data: {
      message
    },
    where: {
      id
    }
  });

  return comment;
};

export const deleteComment = async (id: string): Promise<void> => {
  await dbClient.comment.delete({
    where: {
      id
    }
  });
};

export const getTotalComments = async (): Promise<number> => dbClient.comment.count();

export const getTotalCommentRatings = async (id: string): Promise<number> =>
  dbClient.rating.count({ where: { commentId: id } });

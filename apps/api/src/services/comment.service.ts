import type { Comment, Prisma, Rating } from '@one-folder-app/database';

import { dbClient } from '@/config';
import type { PaginationOptions, PostCommentData } from '@/types';

export const findCommentById = async (id: string): Promise<Comment | null> => {
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

export const findCommentByAuthorIdAndFolderId = async (
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

export const findCommentsWithPagination = async (
  options: PaginationOptions<Prisma.CommentOrderByWithAggregationInput> = {
    limit: 10,
    orderBy: {
      createdAt: 'asc'
    },
    pageIndex: 0
  }
): Promise<Comment[] | null> => {
  const { limit, pageIndex, orderBy } = options;

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
  options: PaginationOptions<Prisma.RatingOrderByWithAggregationInput> = {
    limit: 10,
    orderBy: {
      createdAt: 'asc'
    },
    pageIndex: 0
  }
): Promise<Rating[] | null> => {
  const { limit, pageIndex, orderBy } = options;

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

export const createComment = async (data: PostCommentData): Promise<Comment> => {
  const { authorId, folderId, message } = data;

  console.log([authorId, folderId, message]);

  const comment = await dbClient.comment.create({
    data: {
      authorId,
      folderId,
      message
    }
  });

  return comment;
};

export const updateComment = async (
  id: string,
  data: Prisma.CommentUpdateInput
): Promise<Comment> => {
  const comment = await dbClient.comment.update({
    data,
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

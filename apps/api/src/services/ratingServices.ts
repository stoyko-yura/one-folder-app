import type { Prisma, Rating } from '@one-folder-app/database';

import { dbClient } from '@/config';
import type { Entity, PaginationOptions, PostRatingData, PutRatingInEntityData } from '@/types';

export const findRatingById = async (id: string): Promise<Rating | null> => {
  const rating = await dbClient.rating.findUnique({
    where: {
      id
    }
  });

  return rating;
};

export const findRatingByEntityId = async (
  userId: string,
  entityId: string
): Promise<Rating | null> => {
  const rating = await dbClient.rating.findFirst({
    where: {
      OR: [{ commentId: entityId }, { folderId: entityId }, { softwareId: entityId }],
      authorId: userId
    }
  });

  return rating;
};

export const findRatingsWithPagination = async (
  options: PaginationOptions<Prisma.RatingOrderByWithAggregationInput> = {
    limit: 10,
    orderBy: {
      createdAt: 'asc'
    },
    pageIndex: 0
  }
): Promise<Rating[] | null> => {
  const { limit, orderBy, pageIndex } = options;

  const ratings = await dbClient.rating.findMany({
    orderBy,
    skip: pageIndex * limit,
    take: limit
  });

  if (!ratings.length) return null;

  return ratings;
};

export const createRating = async (data: PostRatingData): Promise<Rating | null> => {
  const { authorId, commentId, folderId, softwareId, rating } = data;

  const createdRating = await dbClient.rating.create({
    data: {
      authorId,
      commentId,
      folderId,
      rating,
      softwareId
    }
  });

  return createdRating;
};

export const updateRating = async (
  id: string,
  data: Prisma.RatingUpdateInput
): Promise<Rating | null> => {
  const rating = await dbClient.rating.update({
    data,
    where: {
      id
    }
  });

  return rating;
};

export const updateRatingInEntity = async (data: PutRatingInEntityData): Promise<Entity | null> => {
  const { averageRating, entityId, entityName } = data;

  const entity = await dbClient[entityName].update({
    data: {
      averageRating
    },
    where: {
      id: entityId
    }
  });

  return entity;
};

export const deleteRating = async (id: string): Promise<void> => {
  await dbClient.rating.delete({
    where: {
      id
    }
  });
};

export const getTotalRatings = async () => dbClient.rating.count();

export const getAverageRating = async (entityId: string): Promise<number | null> => {
  const aggregatedRating = await dbClient.rating.aggregate({
    _avg: {
      rating: true
    },
    where: {
      OR: [{ commentId: entityId }, { folderId: entityId }, { softwareId: entityId }]
    }
  });

  return aggregatedRating._avg.rating;
};

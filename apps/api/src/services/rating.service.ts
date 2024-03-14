import type { Rating } from '@one-folder-app/database';
import type {
  GetRatingsPaginationParams,
  PostRatingRequestBody,
  PutRatingRequestBody
} from '@one-folder-app/types';

import { dbClient } from '@/config';
import type { Entity, PutRatingWithEntityData } from '@/types';

export const getRatingById = async (id: string): Promise<Rating | null> => {
  const rating = await dbClient.rating.findUnique({
    where: {
      id
    }
  });

  return rating;
};

export const getRatingByEntityId = async (
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

export const getRatingsWithPagination = async (
  options: GetRatingsPaginationParams
): Promise<Rating[] | null> => {
  const { limit = 10, pageIndex = 0, orderBy = { createdAt: 'asc' } } = options;

  const ratings = await dbClient.rating.findMany({
    orderBy,
    skip: pageIndex * limit,
    take: limit
  });

  if (!ratings.length) return null;

  return ratings;
};

export const postRating = async (data: PostRatingRequestBody): Promise<Rating | null> => {
  const { userId, commentId, folderId, softwareId, rating } = data;

  const createdRating = await dbClient.rating.create({
    data: {
      authorId: userId,
      commentId,
      folderId,
      rating,
      softwareId
    }
  });

  return createdRating;
};

export const putRating = async (id: string, data: PutRatingRequestBody): Promise<Rating | null> => {
  const { rating } = data;

  const updatedRating = await dbClient.rating.update({
    data: {
      rating
    },
    where: {
      id
    }
  });

  return updatedRating;
};

export const putRatingInEntity = async (data: PutRatingWithEntityData): Promise<Entity | null> => {
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

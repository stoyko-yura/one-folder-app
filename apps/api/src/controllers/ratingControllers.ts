import type { Request, Response } from 'express';
import { validationResult } from 'express-validator';

import { dbClient } from '@/config';
import { errorHandler } from '@/middleware';
import { capitalize, findEntityById } from '@/utils';

// Get ratings
export const getRatings = async (req: Request, res: Response) => {
  try {
    const { page, limit, pageIndex } = req.query;

    const ratings = await dbClient.rating.findMany({
      skip: Number(pageIndex) * (Number(limit) || 10),
      take: Number(limit) || 10
    });

    if (!ratings.length) {
      return errorHandler(new Error('Ratings not found'), res, 404);
    }

    const totalRatings = await dbClient.rating.count();
    const totalPages = Math.ceil(totalRatings / Number(limit));

    const links = {
      next:
        Number(page) < totalPages
          ? `${req.protocol}://${req.headers.host}/api/ratings?page=${
              Number(page) + 1
            }&limit=${Number(limit)}`
          : null,
      previus:
        Number(page) > 1
          ? `${req.protocol}://${req.headers.host}/api/ratings?page=${
              Number(page) - 1
            }&limit=${Number(limit)}`
          : null
    };

    res.status(200).json({
      links,
      message: 'Ratings loaded',
      ratings,
      success: true,
      totalPages,
      totalRatings
    });
  } catch (error) {
    errorHandler(error as Error, res);
  }
};

// Get rating
export const getRating = async (req: Request, res: Response) => {
  try {
    const { ratingId } = req.params;

    const rating = await dbClient.rating.findUnique({
      where: {
        id: ratingId
      }
    });

    if (!rating) {
      return errorHandler(new Error(`Rating ${ratingId} not found`), res, 404);
    }

    res.status(200).json({
      message: 'Rating loaded',
      rating,
      success: true
    });
  } catch (error) {
    errorHandler(error as Error, res);
  }
};

// Post rating
export const postRating = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(500).json({
        errors: errors.array(),
        success: false
      });
    }

    const { commentId, softwareId, folderId, userId, rating } = req.body;

    if (!commentId && !folderId && !softwareId) {
      return errorHandler(new Error('Entity id is required'), res, 500);
    }

    const user = await dbClient.user.findUnique({
      where: {
        id: userId
      }
    });

    if (!user) {
      return errorHandler(new Error(`User ${userId} not found`), res, 404);
    }

    const entityId = commentId || folderId || softwareId;

    const entityNames = {
      [commentId]: 'comment',
      [folderId]: 'folder',
      [softwareId]: 'software'
    };

    const entityName = entityNames[entityId];

    await findEntityById(entityName, entityId, res);

    const existRating = await dbClient.rating.findFirst({
      where: {
        authorId: userId,
        commentId,
        folderId,
        softwareId
      }
    });

    if (existRating) {
      return errorHandler(new Error(`User already rated ${entityName}`), res);
    }

    const createdRating = await dbClient.rating.create({
      data: {
        authorId: userId,
        commentId,
        folderId,
        rating: Number(rating),
        softwareId
      }
    });

    const aggregatedRating = await dbClient.rating.aggregate({
      _avg: {
        rating: true
      },
      where: {
        OR: [
          { commentId: commentId || '' },
          { folderId: folderId || '' },
          { softwareId: softwareId || '' }
        ]
      }
    });

    const editedEntity = await dbClient[entityName].update({
      data: {
        averageRating: Number(aggregatedRating._avg.rating)
      },
      where: {
        id: entityId
      }
    });

    res.status(200).json({
      [entityName]: editedEntity,
      message: `${capitalize(entityName)} rated`,
      rating: createdRating,
      success: true
    });
  } catch (error) {
    errorHandler(error as Error, res);
  }
};

// Put rating
export const putRating = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(500).json({
        errors: errors.array(),
        success: false
      });
    }

    const { ratingId } = req.params;
    const { userId, rating } = req.body;

    const user = await dbClient.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      return errorHandler(new Error(`User ${userId} not found`), res, 404);
    }

    const existRating = await dbClient.rating.findUnique({
      where: {
        id: ratingId
      }
    });

    if (!existRating) {
      return errorHandler(new Error(`Rating ${ratingId} not found`), res, 404);
    }

    const editedRating = await dbClient.rating.update({
      data: {
        rating: Number(rating)
      },
      where: {
        id: ratingId
      }
    });

    const entityId = existRating.commentId || existRating.folderId || existRating.softwareId;

    if (!entityId) {
      return errorHandler(new Error('Something went wrong'), res);
    }

    const entityNames = {
      [existRating.commentId || '']: 'comment',
      [existRating.folderId || '']: 'folder',
      [existRating.softwareId || '']: 'software'
    };

    const entityName = entityNames[entityId];

    await findEntityById(entityName, entityId, res);

    const aggregatedRating = await dbClient.rating.aggregate({
      _avg: {
        rating: true
      },
      where: {
        OR: [
          { commentId: entityId || '' },
          { folderId: entityId || '' },
          { softwareId: entityId || '' }
        ]
      }
    });

    const averageRating = Number(aggregatedRating._avg.rating);

    const editedEntity = await dbClient[entityName].update({
      data: {
        averageRating
      },
      where: {
        id: entityId
      }
    });

    res.status(200).json({
      [entityName]: editedEntity,
      message: `${capitalize(entityName)}'s rating edited`,
      rating: editedRating,
      success: true
    });
  } catch (error) {
    errorHandler(error as Error, res);
  }
};

// Delete rating
export const deleteRating = async (req: Request, res: Response) => {
  try {
    const { ratingId } = req.params;

    const rating = await dbClient.rating.findUnique({
      where: {
        id: ratingId
      }
    });

    if (!rating) {
      return errorHandler(new Error(`Rating ${ratingId} not found`), res, 404);
    }

    await dbClient.rating.delete({
      where: {
        id: ratingId
      }
    });

    res.status(200).json({
      message: 'Rating deleted',
      success: true
    });
  } catch (error) {
    errorHandler(error as Error, res);
  }
};

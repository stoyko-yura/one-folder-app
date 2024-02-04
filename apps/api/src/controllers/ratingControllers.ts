import type { Request, Response } from 'express';
import { validationResult } from 'express-validator';

import { errorHandler, getPaginationLinks } from '@/middleware';
import { commonServices, ratingServices, userServices } from '@/services';
import { capitalize } from '@/utils';

// Get ratings
export const getRatings = async (req: Request, res: Response) => {
  try {
    const { page, limit, pageIndex } = req.query;

    const ratings = await ratingServices.findRatingsWithPagination({
      limit: Number(limit),
      orderBy: {
        createdAt: 'asc'
      },
      pageIndex: Number(pageIndex)
    });

    if (!ratings) {
      return errorHandler(new Error('Ratings not found'), res, 404);
    }

    const totalRatings = await ratingServices.getTotalRatings();
    const totalPages = Math.ceil(totalRatings / Number(limit));

    const links = getPaginationLinks(req, { limit: Number(limit), page: Number(page), totalPages });

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

    const rating = await ratingServices.findRatingById(ratingId);

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

    const user = await userServices.findUserById(userId);

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

    const entity = await commonServices.findEntityById(entityId, entityName);

    if (!entity) {
      return errorHandler(new Error(`${entityName} ${entityId} not found`), res, 404);
    }

    const existRating = await ratingServices.findRatingByEntityId(userId, entityId);

    if (existRating) {
      return errorHandler(new Error(`User already rated ${entityName}`), res);
    }

    const createdRating = await ratingServices.createRating({
      authorId: userId,
      commentId,
      folderId,
      rating: Number(rating),
      softwareId
    });

    const averageRating = await ratingServices.getAverageRating(entityId);

    if (!averageRating) {
      return errorHandler(new Error('Something went wrong'), res);
    }

    const editedEntity = await ratingServices.updateRatingInEntity({
      averageRating,
      entityId,
      entityName
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

    const user = await userServices.findUserById(userId);

    if (!user) {
      return errorHandler(new Error(`User ${userId} not found`), res, 404);
    }

    const existRating = await ratingServices.findRatingById(ratingId);

    if (!existRating) {
      return errorHandler(new Error(`Rating ${ratingId} not found`), res, 404);
    }

    const editedRating = await ratingServices.updateRating(ratingId, { rating });

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

    const entity = await commonServices.findEntityById(entityId, entityName);

    if (!entity) {
      return errorHandler(new Error(`${entityName} ${entityId} not found`), res, 404);
    }

    const averageRating = await ratingServices.getAverageRating(entityId);

    if (!averageRating) {
      return errorHandler(new Error('Something went wrong'), res);
    }

    const editedEntity = await ratingServices.updateRatingInEntity({
      averageRating,
      entityId,
      entityName
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

    const rating = await ratingServices.findRatingById(ratingId);

    if (!rating) {
      return errorHandler(new Error(`Rating ${ratingId} not found`), res, 404);
    }

    await ratingServices.deleteRating(ratingId);

    res.status(200).json({
      message: 'Rating deleted',
      success: true
    });
  } catch (error) {
    errorHandler(error as Error, res);
  }
};

import type { Request, Response } from 'express';

import { HttpResponseError, errorHandler, getPaginationLinks } from '@/middleware';
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
      throw new HttpResponseError({
        message: 'Ratings not found',
        status: 'NOT_FOUND'
      });
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
    errorHandler(error as HttpResponseError, res);
  }
};

// Get rating
export const getRating = async (req: Request, res: Response) => {
  try {
    const { ratingId } = req.params;

    const rating = await ratingServices.findRatingById(ratingId);

    if (!rating) {
      throw new HttpResponseError({
        description: `Rating ${ratingId} not found`,
        message: 'Rating not found',
        status: 'NOT_FOUND'
      });
    }

    res.status(200).json({
      message: 'Rating loaded',
      rating,
      success: true
    });
  } catch (error) {
    errorHandler(error as HttpResponseError, res);
  }
};

// Post rating
export const postRating = async (req: Request, res: Response) => {
  try {
    const { commentId, softwareId, folderId, userId, rating } = req.body;

    if (!commentId && !folderId && !softwareId) {
      throw new HttpResponseError({
        message: 'Please provide a comment, folder or software id',
        status: 'BAD_REQUEST'
      });
    }

    const user = await userServices.findUserById(userId);

    if (!user) {
      throw new HttpResponseError({
        description: `User ${userId} not found`,
        message: 'User not found',
        status: 'NOT_FOUND'
      });
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
      throw new HttpResponseError({
        description: `${entityName} ${entityId} not found`,
        message: `${entityName} not found`,
        status: 'NOT_FOUND'
      });
    }

    const existRating = await ratingServices.findRatingByEntityId(userId, entityId);

    if (existRating) {
      throw new HttpResponseError({
        description: `${entityName} ${entityId} already rated`,
        message: `${entityName} already rated`,
        status: 'BAD_REQUEST'
      });
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
      throw new HttpResponseError({
        message: 'Something went wrong',
        status: 'INTERNAL_SERVER_ERROR'
      });
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
    errorHandler(error as HttpResponseError, res);
  }
};

// Put rating
export const putRating = async (req: Request, res: Response) => {
  try {
    const { ratingId } = req.params;
    const { userId, rating } = req.body;

    const user = await userServices.findUserById(userId);

    if (!user) {
      throw new HttpResponseError({
        description: `User ${userId} not found`,
        message: 'User not found',
        status: 'NOT_FOUND'
      });
    }

    const existRating = await ratingServices.findRatingById(ratingId);

    if (!existRating) {
      throw new HttpResponseError({
        description: `Rating ${ratingId} not found`,
        message: 'Rating not found',
        status: 'NOT_FOUND'
      });
    }

    const editedRating = await ratingServices.updateRating(ratingId, { rating });

    const entityId = existRating.commentId || existRating.folderId || existRating.softwareId;

    if (!entityId) {
      throw new HttpResponseError({
        message: 'Something went wrong',
        status: 'INTERNAL_SERVER_ERROR'
      });
    }

    const entityNames = {
      [existRating.commentId || '']: 'comment',
      [existRating.folderId || '']: 'folder',
      [existRating.softwareId || '']: 'software'
    };

    const entityName = entityNames[entityId];

    const entity = await commonServices.findEntityById(entityId, entityName);

    if (!entity) {
      throw new HttpResponseError({
        description: `${entityName} ${entityId} not found`,
        message: `${entityName} not found`,
        status: 'NOT_FOUND'
      });
    }

    const averageRating = await ratingServices.getAverageRating(entityId);

    if (!averageRating) {
      throw new HttpResponseError({
        message: 'Something went wrong',
        status: 'INTERNAL_SERVER_ERROR'
      });
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
    errorHandler(error as HttpResponseError, res);
  }
};

// Delete rating
export const deleteRating = async (req: Request, res: Response) => {
  try {
    const { ratingId } = req.params;

    const rating = await ratingServices.findRatingById(ratingId);

    if (!rating) {
      throw new HttpResponseError({
        description: `Rating ${ratingId} not found`,
        message: 'Rating not found',
        status: 'NOT_FOUND'
      });
    }

    await ratingServices.deleteRating(ratingId);

    res.status(200).json({
      message: 'Rating deleted',
      success: true
    });
  } catch (error) {
    errorHandler(error as HttpResponseError, res);
  }
};

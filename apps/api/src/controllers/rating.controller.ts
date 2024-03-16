import type { RatingData } from '@one-folder-app/types';
import type { Request, Response } from 'express';

import { getPaginationLinks } from '@/middleware';
import { commonServices, ratingServices, userServices } from '@/services';
import type {
  DeleteRatingRequest,
  DeleteRatingResponse,
  GetRatingRequest,
  GetRatingResponse,
  GetRatingsRequest,
  GetRatingsResponse,
  PostRatingRequest,
  PostRatingResponse,
  PutRatingRequest,
  PutRatingResponse
} from '@/types';
import { HttpResponseError, capitalize, errorHandler } from '@/utils';

// Get ratings
export const getRatings = async (req: GetRatingsRequest, res: GetRatingsResponse) => {
  try {
    const { limit = 10, page = 1, pageIndex = 0, orderBy = { createdAt: 'asc' } } = req.query;

    const ratings = await ratingServices.getRatingsWithPagination({
      limit,
      orderBy,
      pageIndex
    });

    if (!ratings) {
      throw new HttpResponseError({
        message: 'Ratings not found',
        status: 'NOT_FOUND'
      });
    }

    const totalRatings = await ratingServices.getTotalRatings();
    const totalPages = Math.ceil(totalRatings / limit);

    const links = getPaginationLinks(req as Request, { limit, page, totalPages });

    res.status(200).json({
      links,
      message: 'Ratings loaded',
      ratings,
      success: true,
      totalPages,
      totalRatings
    });
  } catch (error) {
    errorHandler(error as HttpResponseError, res as Response);
  }
};

// Get rating
export const getRating = async (req: GetRatingRequest, res: GetRatingResponse) => {
  try {
    const { ratingId } = req.params;

    if (!ratingId) {
      throw new HttpResponseError({
        description: 'ratingId is required. Please check your params',
        message: 'ratingId is required',
        status: 'FORBIDDEN'
      });
    }

    const rating = await ratingServices.getRatingById(ratingId);

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
    errorHandler(error as HttpResponseError, res as Response);
  }
};

// Post rating
export const postRating = async (req: PostRatingRequest, res: PostRatingResponse) => {
  try {
    const { rating, userId, commentId, folderId, softwareId } = req.body;

    const user = await userServices.getUserById(userId);

    if (!user) {
      throw new HttpResponseError({
        description: `User ${userId} not found`,
        message: 'User not found',
        status: 'NOT_FOUND'
      });
    }

    const entityId = commentId || folderId || softwareId;

    if (!entityId) {
      throw new HttpResponseError({
        message: 'Please provide a comment, folder or software id',
        status: 'BAD_REQUEST'
      });
    }

    const entityNames = {
      [commentId!]: 'comment',
      [folderId!]: 'folder',
      [softwareId!]: 'software'
    };

    const entityName = entityNames[entityId!];

    const entity = await commonServices.getEntityById(entityId, entityName);

    if (!entity) {
      throw new HttpResponseError({
        description: `${entityName} ${entityId} not found`,
        message: `${entityName} not found`,
        status: 'NOT_FOUND'
      });
    }

    const existRating = await ratingServices.getRatingByEntityId(userId, entityId);

    if (existRating) {
      throw new HttpResponseError({
        description: `${entityName} ${entityId} already rated`,
        message: `${entityName} already rated`,
        status: 'BAD_REQUEST'
      });
    }

    const createdRating = await ratingServices.postRating({
      commentId,
      folderId,
      rating,
      softwareId,
      userId
    });

    const averageRating = await ratingServices.getAverageRating(entityId);

    if (!averageRating) {
      throw new HttpResponseError({
        message: 'Something went wrong',
        status: 'INTERNAL_SERVER_ERROR'
      });
    }

    const editedEntity = await ratingServices.putRatingInEntity({
      averageRating,
      entityId,
      entityName
    });

    res.status(200).json({
      [entityName]: editedEntity,
      message: `${capitalize(entityName)} rated`,
      rating: createdRating as RatingData,
      success: true
    });
  } catch (error) {
    errorHandler(error as HttpResponseError, res as Response);
  }
};

// Put rating
export const putRating = async (req: PutRatingRequest, res: PutRatingResponse) => {
  try {
    const { ratingId } = req.params;
    const { rating, userId } = req.body;

    if (!ratingId) {
      throw new HttpResponseError({
        description: 'ratingId is required. Please check your params',
        message: 'ratingId is required',
        status: 'FORBIDDEN'
      });
    }

    if (!userId) {
      throw new HttpResponseError({
        description: "userId can't be nullable",
        message: 'userId is required',
        status: 'NO_CONTENT'
      });
    }

    const user = await userServices.getUserById(userId);

    if (!user) {
      throw new HttpResponseError({
        description: `User ${userId} not found`,
        message: 'User not found',
        status: 'NOT_FOUND'
      });
    }

    const existRating = await ratingServices.getRatingById(ratingId);

    if (!existRating) {
      throw new HttpResponseError({
        description: `Rating ${ratingId} not found`,
        message: 'Rating not found',
        status: 'NOT_FOUND'
      });
    }

    const editedRating = await ratingServices.putRating(ratingId, { rating });

    const entityId = existRating.commentId || existRating.folderId || existRating.softwareId;

    if (!entityId) {
      throw new HttpResponseError({
        message: 'Something went wrong',
        status: 'INTERNAL_SERVER_ERROR'
      });
    }

    const entityNames = {
      [existRating.commentId!]: 'comment',
      [existRating.folderId!]: 'folder',
      [existRating.softwareId!]: 'software'
    };

    const entityName = entityNames[entityId];

    const entity = await commonServices.getEntityById(entityId, entityName);

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

    const editedEntity = await ratingServices.putRatingInEntity({
      averageRating,
      entityId,
      entityName
    });

    res.status(200).json({
      [entityName]: editedEntity,
      message: `${capitalize(entityName)}'s rating edited`,
      rating: editedRating as RatingData,
      success: true
    });
  } catch (error) {
    errorHandler(error as HttpResponseError, res as Response);
  }
};

// Delete rating
export const deleteRating = async (req: DeleteRatingRequest, res: DeleteRatingResponse) => {
  try {
    const { ratingId } = req.params;

    if (!ratingId) {
      throw new HttpResponseError({
        description: 'ratingId is required. Please check your params',
        message: 'ratingId is required',
        status: 'FORBIDDEN'
      });
    }

    const rating = await ratingServices.getRatingById(ratingId);

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
    errorHandler(error as HttpResponseError, res as Response);
  }
};

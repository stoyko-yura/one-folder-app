import type { Response } from 'express';

import { dbClient } from '@/config';
import { errorHandler } from '@/middleware';

export const findEntityById = async (entityName: string, entityId: string, res: Response) => {
  const entity = await dbClient[entityName].findUnique({
    where: {
      id: entityId
    }
  });

  if (!entity) {
    return errorHandler(new Error(`${entityName} ${entityId} not found`), res, 404);
  }

  return entity;
};

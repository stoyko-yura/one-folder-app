import { dbClient } from '@/config';
import type { Entity } from '@/types';

export const getEntityById = async (
  entityId: string,
  entityName: string
): Promise<Entity | null> => {
  const entity = await dbClient[entityName].findUnique({
    where: {
      id: entityId
    }
  });

  return entity;
};

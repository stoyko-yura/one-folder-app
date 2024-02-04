import { dbClient } from '@/config';
import type { Entity } from '@/types';

export const findEntityById = async (
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

import type { Comment, Folder, Software } from '@one-folder-app/database';

export type Entity = Folder | Comment | Software;

export interface EntityData {
  entityId: string;
  entityName: string;
}

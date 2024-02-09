import type { FolderAccess } from '@one-folder-app/database';

export interface PostFolderData {
  access?: FolderAccess;
  authorId: string;
  description?: string;
  image?: string;
  title: string;
}

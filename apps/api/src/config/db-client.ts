import { FolderAccess, Role, prisma } from '@one-folder-app/database';

export const dbClient = prisma;

export const dbEnums = {
  accesses: Object.keys(FolderAccess),
  roles: Object.keys(Role)
};

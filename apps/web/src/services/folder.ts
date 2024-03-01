import type { DeleteFolderParams, FoldersResponse, GetFolderParams } from '@one-folder-app/types';

import { axiosApi } from '@/utills';

export const getFolders = async ({
  limit = 10,
  orderBy = { title: 'asc' },
  pageIndex = 0
}: GetFolderParams): Promise<FoldersResponse> => {
  return axiosApi
    .get('/folders', {
      params: {
        limit,
        orderBy,
        pageIndex
      }
    })
    .then((response) => response.data);
};

export const deleteFolder = async ({ id }: DeleteFolderParams): Promise<void> => {
  return axiosApi.delete(`/folders/${id}`).then((res) => res.data);
};

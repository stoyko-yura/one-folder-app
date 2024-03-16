import type {
  DeleteFolderRequestParams,
  GetFoldersRequestQueries,
  GetFoldersResponseBody
} from '@one-folder-app/types';

import { axiosApi } from '@/utills';

export const getFolders = async ({
  limit = 10,
  orderBy = { title: 'asc' },
  page = 1,
  pageIndex = 0
}: GetFoldersRequestQueries): Promise<GetFoldersResponseBody> => {
  const { data } = await axiosApi
    .get('/folders', {
      params: {
        limit,
        orderBy,
        page,
        pageIndex
      }
    })
    .catch((res) => Promise.reject(res.response.data));

  return data;
};

export const deleteFolder = async ({ folderId }: DeleteFolderRequestParams): Promise<void> => {
  return axiosApi.delete(`/folders/${folderId}`).then((res) => res.data);
};

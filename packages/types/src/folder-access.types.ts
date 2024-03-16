import type { BaseResponseBody } from './common.types';

// Get folder's accesses
export interface GetFolderAccessesResponseBody extends BaseResponseBody {
  accesses: string[];
}

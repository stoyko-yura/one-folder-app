import type { BaseResponseBody } from './common.types';

export interface GetRolesResponseBody extends BaseResponseBody {
  roles: string[];
}

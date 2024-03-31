import type { BaseResponseBody } from './common.types';
import type { UserData } from './user.types';

// Sign in
export interface SignInRequestBody {
  login: string;
  password: string;
}

export interface SignInResponseBody extends BaseResponseBody {
  token?: string;
  user: UserData;
}

// Sign up
export interface SignUpRequestBody {
  login: string;
  email: string;
  password: string;
  username: string;
  bio: string;
}

export interface SignUpResponseBody extends BaseResponseBody {
  token?: string;
  user: UserData;
}

// Get me
export interface GetMeRequestBody {
  userId: string;
}

export interface GetMeResponseBody extends BaseResponseBody {
  token?: string;
  user: UserData;
}

// Change password
export interface ChangePasswordRequestBody {
  userId: string;
  password: string;
  newPassword: string;
}

export interface ChangePasswordResponseBody extends BaseResponseBody {
  token?: string;
  user: UserData;
}

// Password recovery
export interface PasswordRecoveryRequestBody {
  email: string;
}

export interface PasswordRecoveryResponseBody extends BaseResponseBody {}

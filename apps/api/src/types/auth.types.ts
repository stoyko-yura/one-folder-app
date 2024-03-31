import type {
  ChangePasswordRequestBody,
  ChangePasswordResponseBody,
  EmptyObject,
  GetMeRequestBody,
  GetMeResponseBody,
  PasswordRecoveryRequestBody,
  PasswordRecoveryResponseBody,
  SignInRequestBody,
  SignInResponseBody,
  SignUpRequestBody,
  SignUpResponseBody
} from '@one-folder-app/types';
import type { Request, Response } from 'express';

// Auth's requests and responses
// Sign in
export type SignInRequest = Request<
  EmptyObject,
  SignInResponseBody,
  SignInRequestBody,
  EmptyObject
>;

export type SignInResponse = Response<SignInResponseBody>;

// Sign up
export type SignUpRequest = Request<
  EmptyObject,
  SignUpResponseBody,
  SignUpRequestBody,
  EmptyObject
>;

export type SignUpResponse = Response<SignUpResponseBody>;

// Get me
export type GetMeRequest = Request<EmptyObject, GetMeResponseBody, GetMeRequestBody, EmptyObject>;

export type GetMeResponse = Response<GetMeResponseBody>;

// Change password
export type ChangePasswordRequest = Request<
  EmptyObject,
  ChangePasswordResponseBody,
  ChangePasswordRequestBody,
  EmptyObject
>;

export type ChangePasswordResponse = Response<ChangePasswordResponseBody>;

// Password recovery
export type PasswordRecoveryRequest = Request<
  EmptyObject,
  PasswordRecoveryResponseBody,
  PasswordRecoveryRequestBody,
  EmptyObject
>;

export type PasswordRecoveryResponse = Response<PasswordRecoveryResponseBody>;

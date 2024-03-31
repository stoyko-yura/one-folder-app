import dotenv from 'dotenv';

dotenv.config();

export const config = {
  PORT: process.env.PORT || 3000,
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  SECRET_JWT: process.env.SECRET_JWT!
};

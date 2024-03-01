import type { Profile, User } from '@one-folder-app/database';

export interface UserData extends User {
  profile: Profile;
}

export interface UserResponse {
  user: UserData;
  message: string;
  success: boolean;
}

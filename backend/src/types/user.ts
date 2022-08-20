import { Role } from './role';

export interface IUser {
  email: string;
  password: string;
  role: Role;
  validatePassword: (pass: string) => Promise<boolean>;
}

export interface UserPostRequest {
 email: string;
 password: string;
 role: Role;
}




export interface UserData {
  email: string;
  role: string;
}

export interface LoginResponse {
  user?: UserData;
  message: string;
}

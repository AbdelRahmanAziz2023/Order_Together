export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}


export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatarUrl: string;
  role: string[];
}

export interface UpdateProfileRequest {
  firstName: string;
  lastName: string;
  avatarUrl: string;
}

export interface ChangePasswordResponse {
  message: string;
}

export interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
}


export interface LogoutRequest {
  userId: string;
  token: string;
}

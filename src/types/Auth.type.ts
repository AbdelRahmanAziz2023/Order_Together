export interface LoginBody {
  email: string;
  password: string;
}

export interface RegisterBody {
  firstName: string;
  secondName: string;
  email: string;
  password: string;
}

export interface UserResponse {
  id: string;
  fullName: string;
  email: string;
  token: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatarUrl: string;
}

export interface UpdateProfileBody {
  firstName: string;
  lastName: string;
  avatarUrl: string;
}

export interface ChangePasswordResponse {
  message: string;
}

export interface ChangePasswordBody {
  oldPassword: string;
  newPassword: string;
}

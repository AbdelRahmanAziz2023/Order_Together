import {
  AuthResponse,
  ChangePasswordRequest,
  ChangePasswordResponse,
  LoginRequest,
  LogoutRequest,
  RegisterRequest,
  UpdateProfileRequest,
  User,
} from "../../../types/auth.type";
import { baseApi } from "../baseApi";

const AuthEndpoints = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<any, LoginRequest>({
      query: (loginBody) => ({
        url: "auth/login",
        method: "POST",
        body: loginBody,
      }),
    }),
    register: builder.mutation<AuthResponse, RegisterRequest>({
      query: (registerBody) => ({
        url: "auth/register",
        method: "POST",
        body: registerBody,
      }),
    }),
    getProfile: builder.query<User, void>({
      query: () => "auth/profile",
    }),
    updateProfile: builder.mutation<User, UpdateProfileRequest>({
      query: (updateProfileBody) => ({
        url: "auth/profile",
        method: "PUT",
        body: updateProfileBody,
      }),
    }),
    changePassword: builder.mutation<
      ChangePasswordResponse,
      ChangePasswordRequest
    >({
      query: (changePasswordBody) => ({
        url: "auth/password",
        method: "PUT",
        body: changePasswordBody,
      }),
    }),
    logout: builder.mutation<void, LogoutRequest>({
      query: (logoutBody) => ({
        url: "auth/logout",
        method: "POST",
        body: logoutBody,
      }),
    }),
    refreshToken: builder.mutation<AuthResponse, LogoutRequest>({
      query: (refreshTokenBody) => ({
        url: "auth/refreshToken",
        method: "POST",
        body: refreshTokenBody,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
  useLogoutMutation,
  useRefreshTokenMutation,
} = AuthEndpoints;

import {
  AuthResponse,
  ChangePasswordRequest,
  ChangePasswordResponse,
  LoginRequest,
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
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "auth/logout",
        method: "POST",
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
} = AuthEndpoints;

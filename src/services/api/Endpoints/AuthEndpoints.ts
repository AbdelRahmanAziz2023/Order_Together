import baseApi from "../baseApi";
import {
  ChangePasswordBody,
  ChangePasswordResponse,
  LoginBody,
  RegisterBody,
  UpdateProfileBody,
  User,
  UserResponse,
} from "./../../../types/Auth.type";

const AuthEndpoints = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<UserResponse, LoginBody>({
      query: (loginBody) => ({
        url: "auth/login",
        method: "POST",
        body: loginBody,
      }),
    }),
    register: builder.mutation<UserResponse, RegisterBody>({
      query: (registerBody) => ({
        url: "auth/register",
        method: "POST",
        body: registerBody,
      }),
    }),
    getProfile: builder.query<User, void>({
      query: () => "auth/profile",
    }),
    updateProfile: builder.mutation<User, UpdateProfileBody>({
      query: (updateProfileBody) => ({
        url: "auth/profile",
        method: "PUT",
        body: updateProfileBody,
      }),
    }),
    changePassword: builder.mutation<
      ChangePasswordResponse,
      ChangePasswordBody
    >({
      query: (changePasswordBody) => ({
        url: "auth/password",
        method: "PUT",
        body: changePasswordBody,
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
} = AuthEndpoints;

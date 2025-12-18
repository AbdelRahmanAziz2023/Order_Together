import { UpdateProfileRequest, User } from "@/src/types/auth.type";
import { baseApi } from "../baseApi";

const ProfileEndpoints = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<User, void>({
      query: () => ({
        url: `users/me`,
        method: "GET",
      }),
      providesTags: ["Profile"],
    }),
    updateProfile: builder.mutation<{user:User}, UpdateProfileRequest>({
      query: (body) => ({
        url: `users/me`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Profile"],
    }),
  }),
});

export const { useGetProfileQuery, useUpdateProfileMutation } =
  ProfileEndpoints;

import { User } from "@/src/types/auth.type";
import { baseApi } from "../baseApi";

const ProfileEndpoints = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<User, void>({
      query: () => ({
        url: `users/me`,
        method: "GET",
        refetchOnMountOrArgChange: false,
        refetchOnFocus: false,
        refetchOnReconnect: false,
        refetchOnMount: false,
        keepUnusedDataFor: 0,
      }),
      providesTags: ["Profile"],
    }),
    updateProfile: builder.mutation<User, any>({
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

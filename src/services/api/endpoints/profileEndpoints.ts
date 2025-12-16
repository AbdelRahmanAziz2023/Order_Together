import { User } from "@/src/types/auth.type";
import { baseApi } from "../baseApi";

const ProfileEndpoints = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<User, string>({
      query: (id) => ({
        url: `users/${id}`,
        method: "GET",
        refetchOnMountOrArgChange: false,
        refetchOnFocus: false,
        refetchOnReconnect: false,
        refetchOnMount: false,
        keepUnusedDataFor: 0,
      }),
      providesTags: ["Profile"],
    }),
    updateProfile: builder.mutation<User, { id: string; body: any }>({
      query: ({ id, body }) => ({
        url: `users/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Profile"],
    }),
  }),
});

export const { useGetProfileQuery, useUpdateProfileMutation } =
  ProfileEndpoints;

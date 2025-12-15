import { baseApi } from "../baseApi";

const ProfileEndpoints = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<any, any>({
      query: (id) => ({
        url: `users/${id}`,
        method: "GET",
      }),
    }),
    updateProfile:builder.mutation<any,any>({
        query:({id,body})=>({
            url:`users/${id}`,
            method:"PUT",
            body,
        }),
    }),
  }),
});

export const {
    useGetProfileQuery,
    useUpdateProfileMutation,
} = ProfileEndpoints;

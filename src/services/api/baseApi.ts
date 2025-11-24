import { getToken } from "@/src/store/expo-secure-store";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.mahmoud-osama.com/api/",
    prepareHeaders: async (headers) => {
      const token = await getToken();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({}),
});

export default baseApi;

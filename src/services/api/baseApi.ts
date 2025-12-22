import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQueryWithReauth";

export const baseApi = createApi({
  reducerPath: "baseApi",
  tagTypes: ["Profile","Tracker","ActiveCart","OrderHistory","Bill","CartState"],
  baseQuery: baseQueryWithReauth,
  keepUnusedDataFor: 30,
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
  refetchOnFocus: true,
  endpoints: (builder) => ({}),
});

export default baseApi;

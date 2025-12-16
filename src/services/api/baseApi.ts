import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQueryWithReauth";

export const baseApi = createApi({
  reducerPath: "baseApi",
  tagTypes: ["Profile","Tracker","ActiveCart","OrderHistory","Bill"],
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});

// export hooks from other endpoints (authApi will inject endpoints)
export default baseApi;

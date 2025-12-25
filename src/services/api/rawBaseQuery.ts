import { getToken } from "@/src/store/expo-secure-store";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Platform } from "react-native";

export const rawBaseQuery = fetchBaseQuery({
  baseUrl: "https://api.mahmoud-osama.com/api/", // <- change to your API base
  prepareHeaders: async (headers) => {
    // 🔐 Auth token
    const token = await getToken();
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    // 📱 Mobile identification
    headers.set("X-Client-Platform", "mobile");
    headers.set("X-Client-OS", Platform.OS);
    headers.set("X-Client-Version", "1.0.0");

    return headers;
  },
});

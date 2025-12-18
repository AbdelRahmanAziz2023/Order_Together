import {
  clearAuth,
  getRefreshToken,
  saveRefreshToken,
  saveToken,
} from "@/src/store/expo-secure-store";
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { rawBaseQuery } from "./rawBaseQuery";

type BaseQuery = BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>;

let refreshPromise: Promise<any> | null = null;

export const baseQueryWithReauth: BaseQuery = async (
  args,
  api,
  extraOptions
) => {
  // first try the original request
  let result = await rawBaseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    // token expired or invalid
    const refreshToken = await getRefreshToken();

    if (!refreshToken) {
      // nothing to refresh -> force logout / cleanup
      await clearAuth();
      return result;
    }

    // if there is already a refresh in-flight, wait for it
    if (!refreshPromise) {
      refreshPromise = (async () => {
        try {
          const res = await fetch(
            "https://api.mahmoud-osama.com/api/auth/refresh",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ token: refreshToken }),
            }
          );

          if (!res.ok) {
            return null;
          }

          const data = await res.json();
          // Persist new tokens
          if (data?.accessToken) {
            await saveToken(data.accessToken);
          }
          if (data?.refreshToken) {
            await saveRefreshToken(data.refreshToken);
          }
          return data;
        } catch (e) {
          console.error("Refresh token request failed", e);
          return null;
        }
      })();
    }

    const refreshResult = await refreshPromise;
    refreshPromise = null;

    if (refreshResult && refreshResult.accessToken) {
      // retry original request after refreshing the token
      result = await rawBaseQuery(args, api, extraOptions);
    } else {
      // refresh failed -> clear stored auth and optionally redirect to login
      await clearAuth();
    }
  }

  return result;
};

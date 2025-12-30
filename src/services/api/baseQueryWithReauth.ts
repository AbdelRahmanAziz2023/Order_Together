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
import { router } from "expo-router";
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
      try {
        await clearAuth();

        // navigate to login if possible
        try {
          // guard against router not being initialized
          router.replace("/(auth)/Login");
        } catch {
          // ignore navigation errors
        }
      } catch {
        console.error("clearAuth failed while handling missing refresh token");
      }
      return result;
    }

    // if there is already a refresh in-flight, wait for it
    if (!refreshPromise) {
      refreshPromise = (async () => {
        try {
          console.info("Attempting to refresh access token...");
          const res = await fetch(
            "https://api2.mahmoud-osama.com/api/auth/refresh",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ token: refreshToken }),
            }
          );

          if (!res.ok) {
            // try to include response body to aid debugging
            let bodyText: string | null = null;
            try {
              bodyText = await res.text();
            } catch {
              /* ignore */
            }
            console.error("Refresh token request failed", res.status, bodyText);
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
        } catch {
          console.error("Refresh token request failed");
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
      // refresh failed -> clear stored auth and redirect to login
      try {
        await clearAuth();

        // navigate to login route if router is available
        try {
          router.replace("/(auth)/Login");
        } catch {
          // ignore navigation errors
        }
      } catch {
        console.error("clearAuth failed while retrying request");
      }
    }
  }

  return result;
};

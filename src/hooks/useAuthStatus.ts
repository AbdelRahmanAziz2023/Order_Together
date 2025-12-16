import { isTokenExpired } from "@/src/helper/isTokenExpired";
import {
  getRefreshToken,
  getToken,
  saveRefreshToken,
  saveToken,
} from "@/src/store/expo-secure-store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRefreshTokenMutation } from "../services/api/endpoints/authEndpoints";
import { RootState } from "../store/store";

const useAuthStatus = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [refreshToken] = useRefreshTokenMutation();
  const user = useSelector((state: RootState) => state.user.user);
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = await getToken();
        const refreshTokenStr = await getRefreshToken();
        const userId = user?.id;

        // No tokens → logged out
        if (!token || !refreshTokenStr) {
          return setIsAuthenticated(false);
        }

        // Access token valid → authenticated
        if (!isTokenExpired(token)) {
          return setIsAuthenticated(true);
        }

        // Access token expired → try refreshing
        // !isTokenExpired(refreshTokenStr)
        if (refreshTokenStr) {
          try {
            const res = await refreshToken({
              userId: userId ?? "",
              token: refreshTokenStr,
            }).unwrap();

            await saveToken(res.accessToken);
            await saveRefreshToken(res.refreshToken);

            return setIsAuthenticated(true);
          } catch (err) {
            // Refresh failed → logout
            console.log("Refresh-token failed:", err);
            return setIsAuthenticated(false);
          }
        }

        // Both tokens expired → fully logout
        return setIsAuthenticated(false);
      } catch (err) {
        console.log("Auth error:", err);
        return setIsAuthenticated(false);
      }
    };

    checkAuthStatus();
  }, []);

  return isAuthenticated;
};

export default useAuthStatus;

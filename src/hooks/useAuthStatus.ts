import { isTokenExpired } from "@/src/helper/isTokenExpired";
import {
    getRefreshToken,
    getToken,
    getUser,
    saveRefreshToken,
    saveToken,
} from "@/src/store/expo-secure-store";
import { useEffect, useState } from "react";
import { useRefreshTokenMutation } from "../services/api/endpoints/authEndpoints";

const useAuthStatus = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [refreshTokenFun] = useRefreshTokenMutation();

  useEffect(() => {
    const checkAuthStatus = async (): Promise<void> => {
      try {
        const token = await getToken();
        const refreshToken = await getRefreshToken();
        const userId = await getUser().then((user) => user?.id);

        if (!token) {
          setIsAuthenticated(false);
          return;
        }
        if (!isTokenExpired(token)) {
          setIsAuthenticated(true);
          return;
        }
        if (refreshToken && !isTokenExpired(refreshToken)) {
          const res = await refreshTokenFun({
            userId: userId ?? "",
            token: refreshToken,
          }).unwrap();
          // Store new tokens
          await saveToken(res.accessToken);
          await saveRefreshToken(res.refreshToken);
          setIsAuthenticated(true);
          return;
        }
        setIsAuthenticated(false);
      } catch (error) {
        console.error("Error checking auth:", error);
        setIsAuthenticated(false);
      }
    };

    checkAuthStatus();
  }, []);

  return isAuthenticated;
};

export default useAuthStatus;

import { getRefreshToken, getUser } from "@/src/store/expo-secure-store";

/**
 * Custom hook to retrieve user ID and refresh token.
 * @returns {Promise<{ userId: string; refreshToken: string }>} - Object containing userId and refreshToken.
 */
const useUserAndToken = async (): Promise<{ userId: string; refreshToken: string }> => {
  const user = await getUser();
  const refreshToken = await getRefreshToken();

  return {
    userId: user?.id ?? "",
    refreshToken: refreshToken ?? "",
  };
};

export default useUserAndToken;
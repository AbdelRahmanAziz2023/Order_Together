import { jwtDecode } from "jwt-decode";
interface TokenPayload {
  exp: number; // Expiry time in seconds since epoch
}

export const isTokenExpired = (token: string): boolean => {
  try {
    const decoded = jwtDecode<TokenPayload>(token);
    const expiryTime = decoded.exp;
    if (!expiryTime) {
      return true;
    }
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    return currentTime >= expiryTime;
  } catch (error) {
    return true;
  }
};

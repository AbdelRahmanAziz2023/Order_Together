// src/store/expo-secure-store.ts
import * as SecureStore from "expo-secure-store";

const TOKEN_KEY = "auth_token";
const REFRESH_TOKEN_KEY = "refresh_token";

export const saveToken = async (token: string): Promise<void> => {
  try {
    await SecureStore.setItemAsync(TOKEN_KEY, token);
  } catch (error) {
    console.error("Error saving token:", error);
    throw error;
  }
};

export const getToken = async (): Promise<string | null> => {
  try {
    return await SecureStore.getItemAsync(TOKEN_KEY);
  } catch (error) {
    console.error("Error getting token:", error);
    return null;
  }
};

export const removeToken = async (): Promise<void> => {
  try {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
  } catch (error) {
    console.error("Error removing token:", error);
    throw error;
  }
};

export const saveRefreshToken = async (token: string): Promise<void> => {
  try {
    await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, token);
  } catch (error) {
    console.error("Error saving refresh token:", error);
    throw error;
  }
};

export const getRefreshToken = async (): Promise<string | null> => {
  try {
    return await SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
  } catch (error) {
    console.error("Error getting refresh token:", error);
    return null;
  }
};

export const removeRefreshToken = async (): Promise<void> => {
  try {
    await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
  } catch (error) {
    console.error("Error removing refresh token:", error);
    throw error;
  }
};

export const clearAuth = async (): Promise<void> => {
  try {
    await Promise.all([
      SecureStore.deleteItemAsync(TOKEN_KEY),
      SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY),
    ]);
  } catch (error) {
    console.error("Error clearing auth data:", error);
    throw error;
  }
};

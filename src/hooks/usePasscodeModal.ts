import { useCartPreviewMutation } from "@/src/services/api/endpoints/cartEndpoints";
import { validatePasscode } from "@/src/utils/validation";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert } from "react-native";

export const usePasscodeModal = () => {
  const router = useRouter();
  const [passcode, setPasscode] = useState("");
  const [cartPreview, { isLoading, isError }] = useCartPreviewMutation();

  const handleSubmit = async () => {
    if (!passcode.trim()) {
      Alert.alert("Error", "Please enter a passcode");
      return;
    }

    const normalized = passcode.trim().toUpperCase();
    if (!validatePasscode(normalized)) return;

    try {
      const result: any = await cartPreview({ joinCode: normalized }).unwrap();
      const cartId = result?.cartId;


      if (!cartId) {
        Alert.alert("Error", "No cart found for that passcode");
        setPasscode("");
        return;
      }

      router.push({
        pathname: "/(app)/(home)/OrderDetails",
        params: { cartId , restaurantShortCode: result?.restaurantShortCode},
      });
      resetForm();
    } catch (error: any) {
      console.log("Error joining cart:", error);
      const message = error || "Failed to join cart";
      Alert.alert("Error", message);
    }
  };

  const resetForm = () => {
    setPasscode("");
  };

  return {
    passcode,
    setPasscode,
    isLoading,
    isError,
    handleSubmit,
    resetForm,
  };
};

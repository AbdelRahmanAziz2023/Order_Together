import {
    useCreateCartMutation,
    useGetCartStateMutation,
    useJoinCartMutation,
    useLeaveCartMutation,
} from "@/src/services/api/endpoints/cartEndpoints";
import { useAddItemToCartMutation } from "@/src/services/api/endpoints/cartItemEndpoint";
import { MenuItemDto } from "@/src/types/restaurant.type";
import { useCallback, useEffect, useState } from "react";
import { Alert } from "react-native";
import Toast from "react-native-toast-message";
import { CartStateResponse } from "../types/cart.type";

interface UseMenuItemCardProps {
  item: MenuItemDto;
  shortCode: string;
  cartId?: string;
  onPress?: () => void;
}

export function useMenuItemCard({
  item,
  shortCode,
  cartId,
  onPress,
}: UseMenuItemCardProps) {
  const [customizationNote, setCustomizationNote] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [cartState, setCartState] = useState<CartStateResponse | null>(null);

  const [getCartState, { isLoading, isError }] = useGetCartStateMutation();

  const [addItemToCart] = useAddItemToCartMutation();
  const [createCart] = useCreateCartMutation();
  const [joinCart] = useJoinCartMutation();
  const [leaveCart] = useLeaveCartMutation();

  /* ================= Fetch Cart State ================= */
  useEffect(() => {
    if (!shortCode) return;

    const fetchCartState = async () => {
      try {
        const res = await getCartState({
          cartId: cartId ?? null,
          restaurantShortCode: shortCode,
        }).unwrap();

        setCartState(res);
      } catch {
        setCartState(null);
      }
    };

    fetchCartState();
  }, [cartId, shortCode]);

  /* ================= Modal Handlers ================= */
  const openCustomization = () => {
    setModalVisible(true);
    onPress?.();
  };

  const closeCustomization = () => setModalVisible(false);

  /* ================= Confirm Logic ================= */
  const handleConfirmCustomization = useCallback(
    async (quantity: number) => {
      if (!cartState) return;

      try {
        switch (cartState.mode) {
          /* ===== User is Cart Creator ===== */
          case "CREATOR": {
            if (!cartId) {
              await createCart({
                menuItemId: item.id,
                quantity: quantity,
                note: customizationNote,
              }).unwrap();

              Toast.show({
                type: "success",
                text1: "Cart created",
                text2: "Item added successfully",
              });
            } else {
              await joinCart({
                cartId,
                intitailItem: {
                  menuItemId: item.id,
                  qty: quantity,
                  note: customizationNote,
                },
              }).unwrap();

              Toast.show({
                type: "success",
                text1: "Joined cart",
                text2: "Item added",
              });
            }
            break;
          }

          /* ===== User is Member ===== */
          case "MEMBER": {
            await addItemToCart({
              cartId: cartState.cartSummary!.cartId,
              menuItemId: item.id,
              qty: quantity,
              note: customizationNote,
            }).unwrap();

            Toast.show({
              type: "success",
              text1: "Item added to cart",
            });
            break;
          }

          /* ===== User is in another cart ===== */
          case "SPECTOR": {
            Alert.alert(
              "You are in another group",
              "Leave current group to add items here?",
              [
                { text: "Cancel", style: "cancel" },
                {
                  text: "Leave & Continue",
                  style: "destructive",
                  onPress: async () => {
                    try {
                      await leaveCart().unwrap();

                      Toast.show({
                        type: "success",
                        text1: "Left previous cart",
                      });

                      setCustomizationNote("");
                      setModalVisible(false);
                    } catch {
                      Toast.show({
                        type: "error",
                        text1: "Failed to leave cart",
                      });
                    }
                  },
                },
              ]
            );
            return; // ⛔ prevent modal auto-close
          }

          default:
            return;
        }

        setCustomizationNote("");
        setModalVisible(false);
      } catch {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Failed to add item to cart",
        });
      }
    },
    [cartState, cartId, customizationNote]
  );

  return {
    customizationNote,
    setCustomizationNote,
    modalVisible,
    openCustomization,
    closeCustomization,
    handleConfirmCustomization,
    isLoading,
    isError,
    cartState,
  };
}

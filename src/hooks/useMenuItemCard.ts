import { showAppAlert } from "@/src/components/common/AppAlert";
import {
  useCreateCartMutation,
  useGetCartStateMutation,
  useJoinCartMutation,
  useLeaveCartMutation,
} from "@/src/services/api/endpoints/cartEndpoints";
import { useAddItemToCartMutation } from "@/src/services/api/endpoints/cartItemEndpoint";
import { useAppDispatch } from "@/src/store/hooks";
import { MenuItemDto } from "@/src/types/restaurant.type";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import { toggleCartState } from "../store/slices/cartSlice";
import { CartStateResponse } from "../types/cart.type";

interface UseMenuItemCardProps {
  item: MenuItemDto;
  shortCode: string;
  cartId?: string;
}

export function useMenuItemCard({
  item,
  shortCode,
  cartId,
}: UseMenuItemCardProps) {
  const dispatch = useAppDispatch();
  const [customizationNote, setCustomizationNote] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [cartState, setCartState] = useState<CartStateResponse | null>(null);

  const [getCartState, { isLoading, isError }] = useGetCartStateMutation();

  const [addItemToCart] = useAddItemToCartMutation();
  const [createCart] = useCreateCartMutation();
  const [joinCart] = useJoinCartMutation();
  const [leaveCart] = useLeaveCartMutation();

  const router = useRouter();
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
              

              const res = await getCartState({
                cartId: null,
                restaurantShortCode: shortCode,
              }).unwrap();
              const cartId = res.cartSummary!.cartId;
              // set global local cart state
              dispatch(toggleCartState(false));
              router.back();
              router.back();
              console.log("before push");
              router.push({
                pathname: "/(app)/(home)/OrderDetails",
                params: {
                  cartId: cartId,
                  restaurantShortCode: shortCode,
                },
              });
              console.log("after push");
              Toast.show({
                type: "success",
                text1: "Cart created",
                text2: "Item added successfully",
              });
            }
            break;
          }

          /* ===== User is Member ===== */
          case "MEMBER": {
            await addItemToCart({
              cartId: cartState.cartSummary!.cartId,
              menuItemId: item.id,
              quantity: quantity,
              note: customizationNote,
            }).unwrap();

            Toast.show({
              type: "success",
              text1: "Item added to cart",
            });
            break;
          }
          case "HOST": {
            await addItemToCart({
              cartId: cartState.cartSummary!.cartId,
              menuItemId: item.id,
              quantity: quantity,
              note: customizationNote,
            }).unwrap();

            Toast.show({
              type: "success",
              text1: "Item added to cart",
            });
            break;
          }

          /* ===== User is in another cart ===== */
          case "SPECTATOR": {
            if (cartState.conflictInfo === null) {
              // join cart and set local cart
              await joinCart({
                cartId: cartState.cartSummary?.cartId!,
                intitailItem: {
                  menuItemId: item.id,
                  qty: quantity,
                  note: customizationNote,
                },
              }).unwrap();

              dispatch(toggleCartState(false));

              Toast.show({
                type: "success",
                text1: "Joined cart",
                text2: "Item added",
              });
            } else {
              if (cartState.conflictInfo.isHost) {
                await showAppAlert({
                  title: "You are Host of another group",
                  message: "Return to your group to show it",
                  buttons: [
                    {
                      text: "Return",
                      style: "destructive",
                      onPress: () => {
                        router.back();
                        router.back();
                        router.push({
                          pathname: "/(app)/(home)/OrderDetails",
                          params: {
                            cartId: cartState?.conflictInfo?.activeCartId,
                            restaurantShortCode:
                              cartState?.conflictInfo?.restaurantShortCode,
                          },
                        });
                      },
                    },
                  ],
                });
              } else {
                await showAppAlert({
                  title: "You are in another group",
                  message: "Leave current group to add items here?",
                  buttons: [
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
                  ],
                  cancelable: true,
                });
              }
            }

            return; // ⛔ prevent modal auto-close
          }

          default:
            return;
        }

        setCustomizationNote("");
        setModalVisible(false);
      } catch(err:any) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: err.data.title,
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

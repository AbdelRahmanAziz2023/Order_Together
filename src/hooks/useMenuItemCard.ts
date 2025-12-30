import { showAppAlert } from "@/src/components/common/AppAlert";
import {
  useAddItemToCartMutation,
  useCreateCartMutation,
  useDeleteCartMutation,
  useGetCartStateMutation,
} from "@/src/services/api/endpoints/cartEndpoints";
import { useAppDispatch } from "@/src/store/hooks";
import { MenuItemDto } from "@/src/types/restaurant.type";
import { emitCartRefresh } from "@/src/utils/cartStateRefresh";
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
  const [quantity, setQuantity] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const [cartState, setCartState] = useState<CartStateResponse | null>(null);

  const [getCartState, { isLoading, isError }] = useGetCartStateMutation();

  const [addItemToCart] = useAddItemToCartMutation();
  const [createCart] = useCreateCartMutation();
  const [deleteCart] = useDeleteCartMutation();

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
  }, [cartId, shortCode, getCartState]);

  /* ================= Modal Handlers ================= */
  const openCustomization = () => {
    setModalVisible(true);
  };

  const closeCustomization = () => setModalVisible(false);

  /* ================= Confirm Logic ================= */
  const handleConfirmCustomization = useCallback(async () => {
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
            router.push({
              pathname: "/(app)/(home)/OrderDetails",
              params: {
                cartId: cartId,
                restaurantShortCode: shortCode,
              },
            });
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
            cartID: cartState.cartSummary?.cartId!,
            item: {
              menuItemId: item.id,
              quantity: quantity,
              note: customizationNote,
            },
          }).unwrap();

          Toast.show({
            type: "success",
            text1: "Item added to cart",
          });

          // notify listeners
          emitCartRefresh();
          break;
        }
        case "HOST": {
          await addItemToCart({
            cartID: cartState.cartSummary?.cartId!,
            item: {
              menuItemId: item.id,
              quantity: quantity,
              note: customizationNote,
            },
          }).unwrap();

          Toast.show({
            type: "success",
            text1: "Item added to cart",
          });

          // notify listeners
          emitCartRefresh();
          break;
        }

        /* ===== User is in another cart ===== */
        case "SPECTATOR": {
          if (cartState.conflictInfo === null) {
            await addItemToCart({
              cartID: cartState.cartSummary?.cartId!,
              item: {
                menuItemId: item.id,
                quantity: quantity,
                note: customizationNote,
              },
            }).unwrap();

            // refresh cart state from server
            try {
              const updated = await getCartState({
                cartId: null,
                restaurantShortCode: shortCode,
              }).unwrap();

              setCartState(updated);
            } catch {
              // ignore refresh errors
            }

            dispatch(toggleCartState(false));
            setCustomizationNote("");
            setModalVisible(false);

            Toast.show({
              type: "success",
              text1: "Joined cart",
              text2: "Item added successfully",
            });

            // notify listeners
            emitCartRefresh();
          } else {
            if (cartState.conflictInfo.isHost) {
              await showAppAlert({
                title: "You are Host of another Cart",
                message: "Return to your Cart =>",
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
                        await deleteCart().unwrap();
                        Toast.show({
                          type: "success",
                          text1: "Left previous cart",
                        });

                        setCustomizationNote("");
                        setModalVisible(false);

                        // notify listeners
                        emitCartRefresh();
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
          break;
        }

        default:
          return;
      }

      setCustomizationNote("");
      setModalVisible(false);
    } catch (err: any) {
      setCustomizationNote("");
      setModalVisible(false);
      Toast.show({
        type: "error",
        text1: "Failed to add item",
        text2: err.data.title,
      });
    }
  }, [
    cartState,
    cartId,
    customizationNote,
    quantity,
    addItemToCart,
    createCart,
    deleteCart,
    getCartState,
    dispatch,
    item.id,
    router,
    shortCode,
  ]);

  return {
    customizationNote,
    setCustomizationNote,
    quantity,
    setQuantity,
    modalVisible,
    openCustomization,
    closeCustomization,
    handleConfirmCustomization,
    isLoading,
    isError,
    cartState,
  };
}

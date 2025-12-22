import {
    useCreateCartMutation,
    useGetActiveCartQuery,
    useGetCartStateQuery,
    useJoinCartMutation,
    useLeaveCartMutation,
} from "@/src/services/api/endpoints/cartEndpoints";
import { useAddItemToCartMutation } from "@/src/services/api/endpoints/cartItemEndpoint";
import { MenuItemDto } from "@/src/types/restaurant.type";
import { useState } from "react";
import { Alert } from "react-native";
import Toast from "react-native-toast-message";

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

  const { data, isLoading, isError } = useGetCartStateQuery({
    restaurantShortCode: shortCode,
  });

  const [addItemToCart] = useAddItemToCartMutation();
  const [createCart] = useCreateCartMutation();
  const [joinCart] = useJoinCartMutation();
  const [leaveCart] = useLeaveCartMutation();
  const { data: activeCart } = useGetActiveCartQuery();

  const openCustomization = () => {
    setModalVisible(true);
    onPress?.();
  };

  const closeCustomization = () => setModalVisible(false);

  const handleConfirmCustomization = async (quantity: number) => {
    console.log("Confirm quantity:", quantity);
    try {
      switch (data?.state) {
        case "NO_SHAREDCART":
          if (!cartId) {
            // await joinCart({
            //   cartId: cartId,
            //   intitailItem: {
            //     menuItemId: item.id,
            //     qty: quantity,
            //     note: customizationNote,
            //   },
            // }).unwrap();

            Toast.show({
              type: "success",
              text1: "You joined the cart",
              text2: "Item added to cart",
            });
          } else {
            // await createCart({
            //   restaurantId: shortCode,
            //   intitailItem: {
            //     menuItemId: item.id,
            //     qty: quantity,
            //     note: customizationNote,
            //   },
            // }).unwrap();

            Toast.show({
              type: "success",
              text1: "Cart created successfully",
              text2: "Item added to cart",
            });
          }
          break;
        case "MEMBER_IN_THIS_GROUP":
          //   await addItemToCart({
          //     cartId: data?.data?.cartId,
          //     menuItemId: item.id,
          //     note: customizationNote,
          //     qty: quantity,
          //   }).unwrap();

          Toast.show({
            type: "success",
            text1: "Item added to cart",
          });

          break;
        case "MEMBER_IN_ANOTHER_GROUP": {
          // Check if user is host of active cart
          const isHost =
            (activeCart &&
              !(
                "isNoContent" in activeCart && (activeCart as any).isNoContent
              ) &&
              (activeCart as any).isHost) ||
            false;

          if (isHost) {
            Alert.alert(
              "Host of another group",
              "You're the host of another group. You cannot leave the cart. Transfer host or delete the cart first.",
              [{ text: "OK", style: "cancel" }]
            );
            break;
          }

          Alert.alert(
            "You are in another group",
            "Leave current group to add items to this cart?",
            [
              { text: "Return", style: "cancel" },
              {
                text: "Leave",
                style: "destructive",
                onPress: async () => {
                  try {
                    // await leaveCart().unwrap();
                    Toast.show({ type: "success", text1: "You left the cart" });

                    setCustomizationNote("");
                    setModalVisible(false);
                  } catch {
                    Toast.show({
                      type: "error",
                      text1: "Error",
                      text2: "Failed to leave and add item. Please try again.",
                    });
                  }
                },
              },
            ]
          );

          break;
        }
        default:
      }

      setCustomizationNote("");
      setModalVisible(false);
    } catch {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to add item to cart. Please try again.",
      });
    }
  };

  return {
    customizationNote,
    setCustomizationNote,
    modalVisible,
    openCustomization,
    closeCustomization,
    handleConfirmCustomization,
    isLoading,
    isError,
    cartState: data,
  };
}

// hooks/useOrderList.ts

import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import {
  useDeleteItemFromCartMutation,
  useEditItemInCartMutation,
} from "../services/api/endpoints/cartEndpoints";
import { CartStateUserItem } from "../types/cart.type";

export const useOrderList = (orders: any, cartID: string) => {
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});
  const [visible, setVisible] = useState(false);

  const [customizationNote, setCustomizationNote] = useState("");
  const [quantity, setQuantity] = useState(1);

  const [selectedItem, setSelectedItem] = useState<CartStateUserItem | null>(null);

  const [deleteItemFromCart] = useDeleteItemFromCartMutation();
  const [editItemInCart] = useEditItemInCartMutation();

  // 🔹 Keep modal fields in sync with selected item
  useEffect(() => {
    if (selectedItem) {
      setQuantity(selectedItem.qty ?? 1);
      setCustomizationNote(selectedItem.note ?? "");
    }
  }, [selectedItem]);

  const toggle = (index: number) => {
    setExpanded((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const onDelete = async (itemId: string) => {
    try {
      await deleteItemFromCart({
        cartId: cartID,
        orderItemId: itemId,
      }).unwrap();

      Toast.show({
        type: "success",
        text1: "Item removed from cart",
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Failed to remove item",
      });
    }
  };

  const onEdit = (item: any) => {
    setSelectedItem(item);
    setVisible(true);
  };

  const onConfirm = async () => {
    if (!selectedItem) return;

    try {
      await editItemInCart({
        cartId: cartID,
        orderItemId: selectedItem.orderItemId,
        body: {
          quantity,
          note: customizationNote,
        },
      }).unwrap();

      Toast.show({
        type: "success",
        text1: "Item edited",
      });

      setVisible(false);
      setSelectedItem(null);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Failed to edit item",
      });
      setVisible(false);
      setSelectedItem(null);
    }
  };

  const onCancel = () => {
    setVisible(false);
    setSelectedItem(null);
  };

  return {
    expanded,
    toggle,

    visible,
    selectedItem,
    quantity,
    setQuantity,
    customizationNote,
    setCustomizationNote,

    onDelete,
    onEdit,
    onConfirm,
    onCancel,
  };
};

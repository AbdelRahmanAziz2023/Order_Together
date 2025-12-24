// hooks/useOrderList.ts
import { useRemoveItemFromCartMutation } from "@/src/services/api/endpoints/cartItemEndpoint";
import { useState } from "react";
import Toast from "react-native-toast-message";

export const useOrderList = (orders:any) => {
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});
  const [visible, setVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const [removeItemFromCart] = useRemoveItemFromCartMutation();

  const toggle = (index: number) =>
    setExpanded((prev) => ({ ...prev, [index]: !prev[index] }));

  const onDelete = async (itemId: string) => {
    try {
      await removeItemFromCart(itemId).unwrap();
      Toast.show({
        type: "success",
        text1: "Item removed from cart",
      });
    } catch {
      Toast.show({
        type: "error",
        text1: "Failed to remove item",
      });
    }
  };

  const onEdit = (item: { id: string; name: string }) => {
    setSelectedItem(item);
    setVisible(true);
  };

  const onConfirm = (quantity: number) => {
    setVisible(false);
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
    onDelete,
    onEdit,
    onConfirm,
    onCancel,
  };
};

// hooks/useOrderList.ts
import { useRemoveItemFromCartMutation } from "@/src/services/api/endpoints/cartItemEndpoint";
import { useMemo, useState } from "react";
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

  const totals = useMemo(
    () =>
      orders.map((o) =>
        o.items.reduce((sum:any, item:any) => sum + item.price, 0)
      ),
    [orders]
  );

  const itemCounts = useMemo(
    () => orders.map((o) => o.items.length),
    [orders]
  );

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
    console.log("Confirm quantity:", quantity);
  };

  const onCancel = () => {
    setVisible(false);
    setSelectedItem(null);
  };

  return {
    expanded,
    toggle,
    totals,
    itemCounts,
    visible,
    selectedItem,
    onDelete,
    onEdit,
    onConfirm,
    onCancel,
  };
};

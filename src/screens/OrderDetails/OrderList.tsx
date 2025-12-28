import { CustomizationModal } from "@/src/components/common/CustomizationModal";
import { useOrderList } from "@/src/hooks/useOrderList";
import { CartStateUser } from "@/src/types/cart.type";
import React from "react";
import { OrderCard } from "./OrderCard";

const OrderList = ({
  orders,
  cartID,
}: {
  orders: CartStateUser[];
  cartID: string;
}) => {
  const {
    expanded,
    toggle,
    visible,
    selectedItem,
    onDelete,
    onEdit,
    onConfirm,
    onCancel,
    quantity,
    setQuantity,
    customizationNote,
    setCustomizationNote,
  } = useOrderList(orders, cartID);
  return (
    <>
      {orders.map((order: CartStateUser, index: number) => (
        <OrderCard
          key={index}
          order={order}
          index={index}
          isExpanded={!!expanded[index]}
          onToggle={() => toggle(index)}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}

      {selectedItem && (
        <CustomizationModal
          visible={visible}
          quantity={quantity}
          setQuantity={setQuantity}
          item={selectedItem}
          isEditing
          existingNote={customizationNote}
          onConfirm={onConfirm}
          onCancel={onCancel}
          editNote={setCustomizationNote}
        />
      )}
    </>
  );
};

export default OrderList;

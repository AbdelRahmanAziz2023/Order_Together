import { CustomizationModal } from "@/src/components/common/CustomizationModal";
import { useOrderList } from "@/src/hooks/useOrderList";
import { CartStateUser } from "@/src/types/cart.type";
import React from "react";
import { OrderCard } from "./OrderCard";

const OrderList = ({ orders }: { orders: CartStateUser[] }) => {
  const {
    expanded,
    toggle,
    visible,
    selectedItem,
    onDelete,
    onEdit,
    onConfirm,
    onCancel,
  } = useOrderList(orders);

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
          itemID={selectedItem.id}
          itemName={selectedItem.name}
          isEditing
          onConfirm={onConfirm}
          onCancel={onCancel}
          editNote={() => {}}
        />
      )}
    </>
  );
};

export default OrderList;

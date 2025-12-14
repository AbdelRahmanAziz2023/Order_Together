import { CustomizationModal } from "@/src/components/common/CustomizationModal";
import { useOrderList } from "@/src/hooks/useOrderList";
import React from "react";
import { OrderCard } from "./OrderCard";

const OrderList = ({ orders }: { orders: any }) => {
  const {
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
  } = useOrderList(orders);

  return (
    <>
      {orders.map((order, index) => (
        <OrderCard
          key={index}
          order={order}
          index={index}
          isExpanded={!!expanded[index]}
          total={totals[index]}
          itemCount={itemCounts[index]}
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

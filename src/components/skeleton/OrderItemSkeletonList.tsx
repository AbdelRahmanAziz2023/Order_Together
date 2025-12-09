import React from "react";
import { FlatList } from "react-native";
import OrderItemSkeleton from "./OrderItemSkeleton";

const OrderItemSkeletonList = () => {
  return (
    <FlatList
      data={[1, 2, 3, 4, 5]}
      keyExtractor={(item) => item.toString()}
      renderItem={() => <OrderItemSkeleton />}
      showsVerticalScrollIndicator={false}
      scrollEnabled={false}
      contentContainerStyle={{ paddingVertical: 16, paddingHorizontal:5 }}
    />
  );
};

export default OrderItemSkeletonList;

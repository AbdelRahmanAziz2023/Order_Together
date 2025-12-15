import { OrderHistoryItem } from "@/src/types/order.type";
import { FlatList, StyleSheet } from "react-native";
import CustomEmptyList from "../common/CustomEmptyList";
import OrderItem from "./OrderItem";



interface OrdersListProps {
  data: OrderHistoryItem[];
}

const OrdersList = ({ data }: OrdersListProps) => {
  
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.orderId}
      renderItem={({ item }) => <OrderItem item={item} />}
      ListEmptyComponent={<CustomEmptyList title="No orders yet" message="Your order history is empty, start ordering now" />}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.ordersList}
      scrollEnabled={false}
    />
  );
};

const styles = StyleSheet.create({
  ordersList: {
    padding: 10,
    gap: 10,
  },
});

export default OrdersList;

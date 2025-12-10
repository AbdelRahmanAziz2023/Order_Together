import { FlatList, StyleSheet } from "react-native";
import CustomEmptyList from "../common/CustomEmptyList";
import OrderItem from "./OrderItem";

export interface OrdersListItem {
  id: string;
  restaurant: string;
  total: number;
  placedOn: string;
  image: string|null;
  isHost: boolean;
  status: string;
}

interface OrdersListProps {
  data: OrdersListItem[];
  
}

const OrdersList = ({ data }: OrdersListProps) => {
  
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
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

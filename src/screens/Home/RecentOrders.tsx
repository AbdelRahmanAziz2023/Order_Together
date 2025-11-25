import CustomText from "@/src/components/common/CustomText";
import OrderItem from "@/src/components/order/OrderItem";
import { Colors } from "@/src/constants/colors";
import { FlatList, StyleSheet, View } from "react-native";

const RecentOrders = () => {
  return (
    <View style={styles.ordersContainer}>
      <CustomText text="Recent Orders" textStyle={styles.headerTitle} />

      <FlatList
        data={[1, 2, 3]}
        renderItem={() => <OrderItem item = {1} />}
        keyExtractor={(item) => item.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ordersList}
        scrollEnabled={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  ordersContainer: {
    marginTop: 20,
    gap: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: "SenBold",
    color: Colors.textPrimary,
  },
  ordersList: {
    padding: 10,
    paddingBottom: 150,
    gap: 10,
  },
});

export default RecentOrders;

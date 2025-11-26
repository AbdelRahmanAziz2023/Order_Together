import CustomText from "@/src/components/common/CustomText";
import OrderItem from "@/src/components/order/OrderItem";
import { Colors } from "@/src/constants/colors";
import { useRouter } from "expo-router";
import { FlatList, Pressable, StyleSheet, View } from "react-native";

const RecentOrders = () => {
  const router = useRouter();
  const onPress = () => {
    router.push("/(app)/(home)/OrderHistory");
  };
  return (
    <View style={styles.ordersContainer}>
      <View style={styles.header}>
        <CustomText text="Recent Orders" textStyle={styles.headerTitle} />
        <Pressable onPress={onPress}>
          <CustomText text="View History →" textStyle={styles.headerTextBtn} />
        </Pressable>
      </View>

      <FlatList
        data={[1, 2, 3]}
        renderItem={() => <OrderItem item={1} />}
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: "SenBold",
    color: Colors.textPrimary,
  },
  headerTextBtn: {
    fontFamily: "SenSemiBold",
    color: Colors.mustard,
  },
  ordersList: {
    padding: 10,
    paddingBottom: 150,
    gap: 10,
  },
});

export default RecentOrders;

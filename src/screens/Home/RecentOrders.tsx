import CustomError from "@/src/components/common/CustomError";
import CustomText from "@/src/components/common/CustomText";
import OrdersList from "@/src/components/order/OrdersList";
import OrderItemSkeletonList from "@/src/components/skeleton/OrderItemSkeletonList";
import { Colors } from "@/src/constants/colors";
import { useGetOrdersHistoryQuery } from "@/src/services/api/endpoints/orderEndpoints";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";

export const orders = [
  {
    id: "1",
    restaurant: "Pizza Hut",
    total: 120,
    placedOn: "2025-11-10",
    image: null,
    isHost: false,
    status: "Unpaid",
  },
  {
    id: "2",
    restaurant: "Koshary El Tahrir",
    total: 85,
    placedOn: "2025-11-12",
    image:
      "https://thumbs.dreamstime.com/b/restaurant-logo-design-idea-chef-hat-fork-graphic-leaf-shape-food-drinks-symbol-concept-cooking-eating-vector-template-173237325.jpg",
    isHost: true,
    status: "Pending",
  },
  {
    id: "3",
    restaurant: "Buffalo Burger",
    total: 240,
    placedOn: "2025-11-14",
    image: null,
    isHost: false,
    status: "Paid",
  },
  {
    id: "4",
    restaurant: "Macarona El Prince",
    total: 175,
    placedOn: "2025-11-18",
    image: null,
    isHost: true,
    status: "Completed",
  },
];

const RecentOrders = () => {
  const router = useRouter();

  const { data, isLoading, isError } = useGetOrdersHistoryQuery(5);
  const onPress = () => {
    router.push("/(app)/(home)/OrderHistory");
  };
  return (
    <View style={styles.ordersContainer}>
      <View style={styles.header}>
        <CustomText text="Recent Orders" textStyle={[styles.headerTitle]} />
        <Pressable onPress={onPress}>
          <CustomText
            text="View History →"
            textStyle={[styles.headerTextBtn]}
          />
        </Pressable>
      </View>

      {isLoading ? (
        <OrderItemSkeletonList />
      ) : isError ? (
        <CustomError title="Error" message="Failed to load recent orders" />
      ) : (
        <OrdersList data={data} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  ordersContainer: {
    marginTop: 20,
    gap: 10,
    paddingBottom: 120,
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
});

export default RecentOrders;

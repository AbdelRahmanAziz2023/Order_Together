import CustomError from "@/src/components/common/CustomError";
import CustomText from "@/src/components/common/CustomText";
import OrdersList from "@/src/components/order/OrdersList";
import OrderItemSkeletonList from "@/src/components/skeleton/OrderItemSkeletonList";
import { Colors } from "@/src/constants/colors";
import { useGetOrdersHistoryQuery } from "@/src/services/api/endpoints/orderEndpoints";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";

const RecentOrders = () => {
  const router = useRouter();

  const { data, isLoading, isError } = useGetOrdersHistoryQuery(5);
  const onPress = () => {
    router.push("/(app)/(home)/OrderHistory");
  };
  return (
    <View style={styles.ordersContainer}>
      <View style={styles.header}>
        <CustomText text="Previous Orders" textStyle={[styles.headerTitle]} />
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
        <OrdersList data={data!} />
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

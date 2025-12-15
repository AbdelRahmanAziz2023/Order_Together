import CustomError from "@/src/components/common/CustomError";
import OrdersList from "@/src/components/order/OrdersList";
import OrderItemSkeletonList from "@/src/components/skeleton/OrderItemSkeletonList";
import { Colors } from "@/src/constants/colors";
import { useGetOrdersHistoryQuery } from "@/src/services/api/endpoints/orderEndpoints";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const OrderHistoryScreen = () => {
  const { data, isLoading, isError } = useGetOrdersHistoryQuery(10);

  return (
    <SafeAreaView style={styles.container}>
      {isError ? (
        <CustomError title="Error" message="Failed to load order history" />
      ) : isLoading ? (
        <OrderItemSkeletonList />
      ) : (
        <OrdersList data={data} />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: "SenBold",
    color: Colors.textPrimary,
  },
  content: {
    flex: 1,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 100,
  },
  emptyText: {
    fontSize: 18,
    fontFamily: "SenBold",
    color: Colors.textPrimary,
    marginBottom: 10,
  },
  emptySubtext: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
});

export default OrderHistoryScreen;

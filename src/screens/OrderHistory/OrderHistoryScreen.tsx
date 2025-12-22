import CustomButton from "@/src/components/common/CustomButton";
import CustomError from "@/src/components/common/CustomError";
import CustomText from "@/src/components/common/CustomText";
import OrdersList from "@/src/components/order/OrdersList";
import OrderItemSkeletonList from "@/src/components/skeleton/OrderItemSkeletonList";
import { Colors } from "@/src/constants/colors";
import { useGetOrdersHistoryQuery } from "@/src/services/api/endpoints/orderEndpoints";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const LIMIT = 5;

const OrderHistoryScreen = () => {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, isFetching } = useGetOrdersHistoryQuery(
    { page, limit: LIMIT },
    { refetchOnMountOrArgChange: true }
  );

  // Initial loading
  if (isLoading) return <OrderItemSkeletonList />;

  // Error
  if (isError) {
    return <CustomError title="Error" message="Failed to load order history" />;
  }

  // Empty state (first page)
  if (!data?.length && page === 1) {
    return (
      <SafeAreaView style={styles.container}>
        <CustomText text="No orders found" />
      </SafeAreaView>
    );
  }

  const hasPrevPage = page > 1;
  const hasNextPage = data?.length === LIMIT;

  return (
    <SafeAreaView style={styles.container}>
      <OrdersList data={data!} />

     { hasNextPage && hasPrevPage && <View style={styles.paginationRow}>
        {/* Prev */}
       { hasPrevPage && <CustomButton
          title="< Prev"
          onPress={() => setPage((p) => Math.max(1, p - 1))}
          isDisabled={isFetching}
          btnStyle={styles.btn}
        />}

        <CustomText text={`${page}`} textStyle={[styles.pageText]} />

        {/* Next */}
       { hasNextPage && <CustomButton
          title="Next >"
          onPress={() => setPage((p) => p + 1)}
          isDisabled={isFetching}
          btnStyle={styles.btn}
        />}
      </View>}
    </SafeAreaView>
  );
};

export default OrderHistoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },

  paginationRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    gap: 50,
    marginBottom: 120,
  },

  btn: {
    backgroundColor: Colors.red,
    borderColor: Colors.red,
    borderWidth: 1,
    borderRadius: 100,
    width: 80,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },

  disabledBtn: {
    opacity: 0.4,
  },

  pageText: {
    color: Colors.red,
    fontFamily: "SenBold",
    fontSize: 18,
    borderColor: Colors.red,
    borderWidth: 1,
    borderRadius: 100,
    padding: 10,
    textAlign: "center",
  },
});

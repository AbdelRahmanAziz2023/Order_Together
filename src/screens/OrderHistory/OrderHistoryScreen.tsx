import CustomButton from "@/src/components/common/CustomButton";
import CustomError from "@/src/components/common/CustomError";
import CustomText from "@/src/components/common/CustomText";
import OrdersList from "@/src/components/order/OrdersList";
import OrderItemSkeletonList from "@/src/components/skeleton/OrderItemSkeletonList";
import { Colors } from "@/src/constants/colors";
import { useGetOrdersHistoryQuery } from "@/src/services/api/endpoints/orderEndpoints";
import { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const LIMIT = 5;

const OrderHistoryScreen = () => {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, isFetching } = useGetOrdersHistoryQuery(
    { page, pageSize: LIMIT },
    { refetchOnMountOrArgChange: true }
  );

  /** 🔹 Animation values */
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateAnim = useRef(new Animated.Value(20)).current;

  /** 🔹 Animate on page change / fetch */
  useEffect(() => {
    if (isFetching) {
      fadeAnim.setValue(0);
      translateAnim.setValue(20);
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(translateAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [page, isFetching]);

  /** Initial loading only */
  if (isLoading) return <OrderItemSkeletonList />;

  if (isError) {
    return <CustomError title="Error" message="Failed to load order history" />;
  }

  const hasPrevPage = page > 1;
  const hasNextPage = data?.length === LIMIT;

  return (
    <SafeAreaView style={styles.container}>
      {/* 🔹 Animated Orders List */}
      <Animated.View
        style={{
          flex: 1,
          opacity: fadeAnim,
          transform: [{ translateY: translateAnim }],
        }}
      >
        <OrdersList isScrollable data={data!} />
      </Animated.View>

      {/* Pagination */}
      <View style={styles.paginationRow}>
        {hasPrevPage && (
          <CustomButton
            title="< Prev"
            onPress={() => setPage((p) => Math.max(1, p - 1))}
            isDisabled={isFetching}
            btnStyle={styles.btn}
          />
        )}

        {(hasPrevPage || hasNextPage) && (
          <CustomText text={`${page}`} textStyle={[styles.pageText]} />
        )}

        {hasNextPage && (
          <CustomButton
            title="Next >"
            onPress={() => setPage((p) => p + 1)}
            isDisabled={isFetching}
            btnStyle={styles.btn}
          />
        )}
      </View>
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
    marginTop: 20,
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

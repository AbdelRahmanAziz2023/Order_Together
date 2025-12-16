import React from "react";
import { FlatList, ScrollView, StyleSheet, View } from "react-native";

import CustomError from "@/src/components/common/CustomError";
import ReceiptSkeleton from "@/src/components/skeleton/ReceiptSkeleton";
import { useGetBillQuery } from "@/src/services/api/endpoints/orderEndpoints";
import { useLocalSearchParams } from "expo-router";
import PaymentReceiver from "../PaymentTracker/PaymentReceiver";
import PaidStamp from "./PaidStamp";
import ReceiptHeader from "./ReceiptHeader";
import ReceiptItemRow from "./ReceiptItemRow";
import ReceiptTotals from "./ReceiptTotals";

const ReceiptScreen = () => {
  const { orderId, status: orderStatus } = useLocalSearchParams<{
    orderId: string;
    status: string;
  }>();

  const { data, isLoading, isError } = useGetBillQuery(orderId);

  

  
  const formattedDate = new Date(data?.orderTime!).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {isLoading ? (
        <ReceiptSkeleton />
      ) : isError ? (
        <CustomError
          title="Error"
          message="Failed to load receipt. Please try again."
        />
      ) : (
        <View style={styles.card}>
          {/* Show PAID Stamp only if paid */}
          {data?.isPaid && <PaidStamp />}

          {/* Header */}
          <ReceiptHeader
            restaurant={data?.restaurantName!}
            date={formattedDate}
            status={orderStatus}
            isPaid={data?.isPaid!}
          />

          <View style={styles.itemsWrapper}>
            {/* Show unpaid widget */}
            {!data?.isPaid && <PaymentReceiver textToCopy={data?.paymentInstructions!} />}

            <FlatList
              data={data?.items}
              keyExtractor={(item) => item.orderItemId.toString()}
              ItemSeparatorComponent={() => <View style={{ height: 18 }} />}
              renderItem={({ item }) => <ReceiptItemRow item={item} />}
              scrollEnabled={false}
            />
          </View>

          {/* Separator */}
          <View style={styles.separator} />

          {/* Totals */}
          <ReceiptTotals
            subtotal={data?.subTotal!}
            delivery={data?.sharedFee!}
            total={data?.totalDue!}
          />
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    marginBottom: 120,
    overflow: "hidden",
    elevation: 5,
    borderWidth: 1,
  },

  itemsWrapper: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    gap: 20,
  },

  separator: {
    borderTopWidth: 2,
    borderStyle: "dashed",
    borderColor: "#e5e7eb",
    marginHorizontal: 24,
    marginVertical: 12,
  },
});

export default ReceiptScreen;

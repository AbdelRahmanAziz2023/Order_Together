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

const dummyData = {
  restaurant: "Koshary El Tahrir",
  date: "Nov 15, 2025 • 01:45 PM",
  status: "PAID IN FULL",
  items: [
    {
      id: 1,
      name: "Koshary Star",
      note: "Extra Crispy Onions",
      price: 35,
      qty: 1,
    },
    { id: 2, name: "Rice Pudding", note: "", price: 10, qty: 1 },
  ],
  subtotal: 45,
  delivery: 0,
  total: 45,
};

const ReceiptScreen = () => {
  const { orderId, status: orderStatus } = useLocalSearchParams<{
    orderId: string;
    status: string;
  }>();

  const { data, isLoading, isError } = useGetBillQuery(orderId);

  // Use API data if available, fallback to dummy data
  const billData = data || dummyData;
  const { restaurant, date, status, items, subtotal, delivery, total } =
    billData;

  const isPaidInFull = data?.isPaid ?? orderStatus !== "Unpaid";

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {isLoading ? (
        <ReceiptSkeleton />
      ) : !isError ? (
        <CustomError
          title="Error"
          message="Failed to load receipt. Please try again."
        />
      ) : (
        <View style={styles.card}>
          {/* Show PAID Stamp only if paid */}
          {isPaidInFull && <PaidStamp />}

          {/* Header */}
          <ReceiptHeader
            restaurant={restaurant}
            date={date}
            status={status}
            isPaid={isPaidInFull}
          />

          <View style={styles.itemsWrapper}>
            {/* Show unpaid widget */}
            {!isPaidInFull && <PaymentReceiver textToCopy="ahmed@instapay" />}

            <FlatList
              data={items}
              keyExtractor={(item) => item.id.toString()}
              ItemSeparatorComponent={() => <View style={{ height: 18 }} />}
              renderItem={({ item }) => <ReceiptItemRow item={item} />}
              scrollEnabled={false}
            />
          </View>

          {/* Separator */}
          <View style={styles.separator} />

          {/* Totals */}
          <ReceiptTotals
            subtotal={subtotal}
            delivery={delivery}
            total={total}
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

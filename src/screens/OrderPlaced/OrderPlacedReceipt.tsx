import React from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  restaurant: string;
  totalPaid: number;
  participants: number;
};

const OrderPlacedReceipt: React.FC<Props> = ({
  restaurant,
  totalPaid,
  participants,
}) => {
  return (
    <View style={styles.receipt}>
      <View style={styles.row}>
        <Text style={styles.label}>Restaurant</Text>
        <Text style={styles.value}>{restaurant}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Total Paid</Text>
        <Text style={styles.value}>{totalPaid.toFixed(2)} EGP</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Participants</Text>
        <Text style={styles.value}>{participants} People</Text>
      </View>
    </View>
  );
};

export default OrderPlacedReceipt;

const styles = StyleSheet.create({
  receipt: {
    width: "100%",
    backgroundColor: "#F3F4F6",
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "500",
  },
  value: {
    fontSize: 14,
    color: "#111827",
    fontWeight: "700",
  },
});

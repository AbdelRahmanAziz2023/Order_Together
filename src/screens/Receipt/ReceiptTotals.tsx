import CustomText from "@/src/components/common/CustomText";
import { Colors } from "@/src/constants/colors";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const ReceiptTotals = ({ subtotal, delivery, total }: { subtotal: number; delivery: number; total: number }) => (
  <>
    <View style={styles.calcBox}>
      <View style={styles.row}>
        <CustomText text="Subtotal" textStyle={[styles.label]} />
        <CustomText text={`${subtotal} EGP`} textStyle={[styles.value]} />
      </View>

      <View style={styles.row}>
        <CustomText text="Shared Delivery" textStyle={[styles.label]} />
        <CustomText text={`${delivery} EGP`} textStyle={[styles.value]} />
      </View>
    </View>

    <View style={styles.totalBox}>
      <CustomText text="Total Paid" textStyle={[styles.totalLabel]} />
      <Text style={styles.totalValue}>
        {total} <Text style={styles.totalEGP}>EGP</Text>
      </Text>
    </View>
  </>
);

const styles = StyleSheet.create({
  calcBox: {
    padding: 24,
    backgroundColor: "#f9fafb",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  label: { color: "#6b7280" },
  value: { fontFamily: "SenBold", color: "#111" },

  totalBox: {
    backgroundColor: Colors.black,
    padding: 24,
  },

  totalLabel: {
    color: "#d1d5db",
    fontSize: 12,
    marginBottom: 4,
  },

  totalValue: {
    color: "#fff",
    fontSize: 30,
    fontFamily: "SenExtraBold",
  },

  totalEGP: { color: "#9ca3af", fontSize: 16 },
});

export default ReceiptTotals;

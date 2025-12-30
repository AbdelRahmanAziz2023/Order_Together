import CustomText from "@/src/components/common/CustomText";
import { CartItemDto } from "@/src/types/cart.type";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const ReceiptItemRow = ({ item }: { item: CartItemDto }) => (
  <View style={styles.row}>
    <View style={styles.left}>
      <View style={styles.qtyBox}>
        <CustomText text={item.quantity.toString()} textStyle={[styles.qtyText]} />
      </View>

      <View style={styles.itemRow}>
        <CustomText text={item.name} numOfLines={2} textStyle={[styles.name]} />
        {item.note ? (
          <CustomText text={item.note} textStyle={[styles.note]} />
        ) : null}
      </View>
    </View>

    <View style={styles.right}>
      <Text style={styles.price}>
        {item.price.toFixed(2)}{" "}
        <Text style={styles.egp}>EGP</Text>
      </Text>
      <CustomText
        text={`${item.price.toFixed(2)} x ${item.quantity}`}
        textStyle={[styles.subInfo]}
      />
    </View>
  </View>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
   itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },

  left: {
    flexDirection: "row",
    gap: 8,
  },

  qtyBox: {
    width: 24,
    height: 24,
    backgroundColor: "#f3f4f6",
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },

  qtyText: { fontWeight: "700" },

  name: { fontWeight: "700", color: "#111" },

  note: { fontSize: 11, color: "#6b7280", marginTop: 2 },

  right: { alignItems: "flex-end" },

  price: { fontFamily: "SenBold", color: "#111" },

  egp: { fontSize: 10, color: "#6b7280" },

  subInfo: { fontSize: 10, color: "#9ca3af" },
});

export default ReceiptItemRow;

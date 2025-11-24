import CustomText from "@/src/components/common/CustomText";
import React from "react";
import { StyleSheet, View } from "react-native";

const OrderTotals = ({ subtotal, deliveryFee=0 }: { subtotal: number; deliveryFee?: number }) => {
  return (
    <View style={styles.totalsSection}>
      <View style={styles.row}>
        <CustomText text="Subtotal" textStyle={styles.totalLabel} />
        <CustomText text={`${subtotal.toFixed(2)} EGP`} textStyle={styles.price} />
      </View>

     <View style={styles.row}>
  <CustomText text="Delivery Fee" textStyle={styles.totalLabel} />
  <CustomText
    text={`${Number(deliveryFee).toFixed(2)} EGP`}
    textStyle={styles.price}
  />
</View>

<View style={styles.row}>
  <CustomText text="Total" textStyle={styles.totalLabel} />
  <CustomText
    text={`${(subtotal + Number(deliveryFee)).toFixed(2)} EGP`}
    textStyle={styles.price}
  />
</View>

    </View>
  );
};

export default OrderTotals;

const styles = StyleSheet.create({
  totalsSection: { marginTop: 20 },
  row: { flexDirection: "row", justifyContent: "space-between", marginBottom: 6 },
  totalLabel: { fontSize: 16, color: "#555" },
  price: { fontFamily: "SenBold" },
});

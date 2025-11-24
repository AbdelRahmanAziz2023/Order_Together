import CustomText from "@/src/components/common/CustomText";
import { Colors } from "@/src/constants/colors";
import getStatusBadgeStyle from "@/src/helper/getStatusBadgeStyle";
import React from "react";
import { StyleSheet, View } from "react-native";

const OrderHeader = () => {
  return (
    <View style={styles.headerRow}>
      <CustomText text="Order Details" textStyle={styles.header} />

      <View style={[styles.statusBadge, getStatusBadgeStyle("opened")]}>
        <CustomText text="Opened" textStyle={styles.statusText} />
      </View>
    </View>
  );
};

export default OrderHeader;

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  header: {
    fontSize: 24,
    fontFamily: "SenExtraBold",
  },
  statusBadge: {
    borderRadius: 50,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  statusText: {
    color: Colors.white,
    fontSize: 13,
    fontFamily: "SenBold",
  },
});

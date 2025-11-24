import CustomText from "@/src/components/common/CustomText";
import { Colors } from "@/src/constants/colors";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const OrderList = ({ orders, isOpened }: { orders: any[]; isOpened: boolean }) => {
  return (
    <>
      {orders.map((order, index) => (
        <View key={index} style={styles.orderBlock}>
          <Text style={[styles.name, order.isYou && { color: Colors.red }]}>
            {order.name}
          </Text>

          {order.items.map((item: any, idx: number) => (
            <View key={idx} style={styles.row}>
              <CustomText text={item.label} textStyle={styles.itemText} />
              <CustomText text={`${item.price.toFixed(2)} EGP`} textStyle={styles.price} />
            </View>
          ))}

          {order.isYou && isOpened && (
            <View style={styles.actionsRow}>
              <Pressable>
                <CustomText text="Edit" textStyle={styles.edit} />
              </Pressable>

              <Pressable>
                <CustomText text="Delete" textStyle={styles.delete} />
              </Pressable>
            </View>
          )}

          {index !== orders.length - 1 && (
            <View style={styles.separator} />
          )}
        </View>
      ))}
    </>
  );
};

export default OrderList;

const styles = StyleSheet.create({
  orderBlock: {
    marginBottom: 16,
  },
  name: {
    fontSize: 18,
    fontFamily: "SenBold",
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  itemText: { fontSize: 16 },
  price: { fontFamily: "SenBold" },
  actionsRow: {
    flexDirection: "row",
    gap: 16,
    marginTop: 6,
  },
  edit: { color: Colors.mustard, fontSize: 14, fontWeight: "600" },
  delete: { color: Colors.lightred, fontSize: 14, fontWeight: "600" },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
    marginTop: 12,
    marginBottom: 10,
  },
});

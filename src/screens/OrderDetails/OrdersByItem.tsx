import CustomText from "@/src/components/common/CustomText";
import { Colors } from "@/src/constants/colors";
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";

const OrdersByItem = ({ cartSummary }: { cartSummary?: any }) => {
  // Simple grouping: aggregate items across users
  if (!cartSummary || !cartSummary.users) {
    return (
      <View style={styles.container}>
        <CustomText text="No items to show" textStyle={[styles.emptyText]} />
      </View>
    );
  }

  const map: Record<string, { name: string; qty: number; users: string[] }> =
    {};

  cartSummary.users.forEach((user: any) => {
    user.items.forEach((it: any) => {
      if (!map[it.menuItemId]) {
        map[it.menuItemId] = { name: it.name, qty: it.qty, users: [user.name] };
      } else {
        map[it.menuItemId].qty += it.qty;
        map[it.menuItemId].users.push(user.name);
      }
    });
  });

  const items = Object.keys(map).map((id) => ({ id, ...map[id] }));

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <View style={styles.itemRow}>
            <View style={styles.itemLeft}>
              <CustomText text={item.name} textStyle={[styles.itemName]} />
              <CustomText
                text={`By: ${item.users.join(", ")}`}
                textStyle={[styles.itemUsers]}
              />
            </View>
            <CustomText text={`${item.qty}`} textStyle={[styles.itemQty]} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 12,
    marginVertical: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  emptyText: {
    color: Colors.gray600,
    fontSize: 14,
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  itemLeft: {
    flex: 1,
    paddingRight: 8,
  },
  itemName: {
    fontSize: 16,
    color: Colors.textPrimary,
  },
  itemUsers: {
    fontSize: 12,
    color: Colors.gray600,
  },
  itemQty: {
    fontSize: 16,
    color: Colors.red,
    minWidth: 30,
    textAlign: "right",
  },
});

export default OrdersByItem;

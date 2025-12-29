import CustomText from "@/src/components/common/CustomText";
import { Colors } from "@/src/constants/colors";
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";

const OrdersByItem = ({ cartSummary }: { cartSummary?: any }) => {
  const items = cartSummary?.items ?? [];

  if (!items.length) {
    return (
      <View style={styles.container}>
        <CustomText text="No items to show" textStyle={[styles.emptyText]} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.aggregateId}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <View style={styles.itemRow}>
            <View style={styles.left}>
              <CustomText text={item.name} textStyle={[styles.itemName]} />

              {!!item.note && (
                <CustomText
                  text={item.note}
                  textStyle={[styles.itemNote]}
                />
              )}
            </View>

            <View style={styles.right}>
              <View style={styles.qtyBadge}>
                <CustomText text={`x${item.qty}`} textStyle={[styles.qtyText]} />
              </View>

              <CustomText
                text={`${item.price * item.qty} EGP`}
                textStyle={[styles.priceText]}
              />
            </View>
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
    textAlign: "center",
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  left: {
    flex: 1,
    paddingRight: 12,
  },
  itemName: {
    fontSize: 15,
    color: Colors.textPrimary,
  },
  itemNote: {
    fontSize: 12,
    color: Colors.gray600,
    marginTop: 2,
  },
  right: {
    alignItems: "flex-end",
  },
  qtyBadge: {
    backgroundColor: Colors.red + "15",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 20,
    marginBottom: 4,
  },
  qtyText: {
    fontSize: 13,
    color: Colors.red,
    fontWeight: "600",
  },
  priceText: {
    fontSize: 13,
    color: Colors.gray700,
  },
  separator: {
    height: 1,
    backgroundColor: "#F1F5F9",
  },
});

export default OrdersByItem;

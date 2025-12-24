// components/OrderItem.tsx
import CustomText from "@/src/components/common/CustomText";
import { Colors } from "@/src/constants/colors";
import { CartStateUserItem } from "@/src/types/cart.type";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

type Props = {
  item: CartStateUserItem;
  isYou: boolean;
  onDelete: () => void;
  onEdit: () => void;
};

export const CartOrderItem = ({ item, isYou, onDelete, onEdit }: Props) => {
  return (
    <View>
      <View style={styles.itemRow}>
        <CustomText text={item.name} textStyle={[styles.itemText]} />
        <CustomText
          text={`${item.qty} x ${item.price.toFixed(2)} EGP`}
          textStyle={[styles.price]}
        />
      </View>

      {isYou && (
        <View style={styles.actions}>
          <Pressable onPress={onDelete}>
            <CustomText text="Delete" textStyle={[styles.delete]} />
          </Pressable>
          <Pressable onPress={onEdit}>
            <CustomText text="Edit" textStyle={[styles.edit]} />
          </Pressable>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  itemText: { fontFamily: "SenBold" },
  price: { fontFamily: "SenBold" },
  actions: {
    flexDirection: "row",
    gap: 10,
  },
  delete: { color: Colors.red },
  edit: { color: Colors.mustard },
});

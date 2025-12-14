// components/OrderItem.tsx
import CustomText from "@/src/components/common/CustomText";
import { Colors } from "@/src/constants/colors";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

type Props = {
  label: string;
  price: number;
  isYou: boolean;
  onDelete: () => void;
  onEdit: () => void;
};

export const CartOrderItem = ({
  label,
  price,
  isYou,
  onDelete,
  onEdit,
}: Props) => {
  return (
    <View style={styles.item}>
      <View style={styles.itemRow}>
        <CustomText text={label} textStyle={[styles.itemText]} />
        <CustomText text={`${price.toFixed(2)} EGP`} textStyle={[styles.price]} />
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
  itemText: { fontSize: 14 },
  item: {},
  
  price: { fontFamily: "SenBold" },
actions: {
    flexDirection: "row",
    gap: 8,
  },
  delete: { color: Colors.red },
  edit: { color: Colors.mustard },
});
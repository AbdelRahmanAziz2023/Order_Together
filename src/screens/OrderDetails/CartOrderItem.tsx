// components/OrderItem.tsx
import CustomText from "@/src/components/common/CustomText";
import { Colors } from "@/src/constants/colors";
import { RootState } from "@/src/store/store";
import { CartStateUserItem } from "@/src/types/cart.type";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";

type Props = {
  item: CartStateUserItem;
  isYou: boolean;
  onDelete?: () => void;
  onEdit?: () => void;
};

export const CartOrderItem = ({ item, isYou, onDelete, onEdit }: Props) => {
  const isLocked = useSelector((state: RootState) => state.cart.isLocked);
  return (
    <View>
      <View style={styles.itemRow}>
        <CustomText text={item.name} numOfLines={2}  textStyle={[styles.itemText]} />
        <CustomText
          text={`${item.qty} x ${item.price.toFixed(2)} EGP`}
          textStyle={[styles.price]}
        />
      </View>

      {item.note && <CustomText text={item.note} textStyle={[styles.note]} />}

      {!isLocked && isYou && (
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
    alignItems: "center",
    marginBottom: 5,
  },
  itemText: { fontFamily: "SenBold", flex: 1, marginRight: 8 },
  note: {
    color: Colors.gray500,
    fontSize: 12,
  },
  price: { fontFamily: "SenBold", flexShrink: 0, textAlign: "right" },
  actions: {
    flexDirection: "row",
    gap: 10,
  },
  delete: { color: Colors.red },
  edit: { color: Colors.mustard },
});

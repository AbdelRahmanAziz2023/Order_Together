// components/OrderCard.tsx
import CustomText from "@/src/components/common/CustomText";
import { Colors } from "@/src/constants/colors";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { CartOrderItem } from "./CartOrderItem";

type Props = {
  order: any;
  index: number;
  isExpanded: boolean;
  total: number;
  itemCount: number;
  onToggle: () => void;
  onDelete: (id: string) => void;
  onEdit: (item: { id: string; name: string }) => void;
};

export const OrderCard = ({
  order,
  isExpanded,
  total,
  itemCount,
  onToggle,
  onDelete,
  onEdit,
}: Props) => {
  const isYou = !!order.isYou;

  return (
    <View style={styles.card}>
      <Pressable style={styles.rowHeader} onPress={onToggle}>
        <View style={styles.left}>
          <Text
            style={[styles.name, isYou && { color: Colors.red }]}
            numberOfLines={1}
          >
            {order.name}
          </Text>
          <CustomText text={`${itemCount} items`} textStyle={[styles.meta]} />
        </View>

        <View style={styles.right}>
          <CustomText text={`${total.toFixed(2)} EGP`} textStyle={[styles.total]} />
          <CustomText text={isExpanded ? "▾" : "▸"} textStyle={[styles.chev]} />
        </View>
      </Pressable>

      {isExpanded && (
        <View style={styles.expandedContent}>
          {order.items.map((item:any) => (
            <CartOrderItem
              key={item.label}
              label={item.label}
              price={item.price}
              isYou={isYou}
              onDelete={() => onDelete(item.label)}
              onEdit={() =>
                onEdit({ id: item.label, name: item.label })
              }
            />
          ))}
        </View>
      )}
    </View>
  );
};


const styles = StyleSheet.create({
    card: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  rowHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  left: { flex: 1, paddingRight: 8 },
  right: { alignItems: "flex-end" },
  name: { fontSize: 16, fontFamily: "SenBold", color: Colors.textPrimary },
  meta: { fontSize: 12, color: Colors.textMuted, marginTop: 2 },
  total: { fontSize: 14, fontFamily: "SenBold", color: Colors.textPrimary },
  chev: { fontSize: 18, color: Colors.textMuted, marginTop: 4 },
  expandedContent: {
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: 12,
  },
});
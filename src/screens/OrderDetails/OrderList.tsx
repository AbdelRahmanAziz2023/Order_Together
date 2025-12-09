import CustomText from "@/src/components/common/CustomText";
import { Colors } from "@/src/constants/colors";
import React, { useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Order = {
  name: string;
  items: { label: string; price: number }[];
  isYou?: boolean;
};

const OrderList = ({ orders }: { orders: Order[] }) => {
  const [expanded, setExpanded] = useState<{ [key: number]: boolean }>({});

  const toggle = (i: number) => setExpanded((s) => ({ ...s, [i]: !s[i] }));

  const totals = useMemo(
    () => orders.map((o) => o.items.reduce((s, it) => s + it.price, 0)),
    [orders]
  );

  const itemCounts = useMemo(() => orders.map((o) => o.items.length), [orders]);

  const onDelete = () => {
    console.log("onDelete");
  };

  const onEdit = () => {
    console.log("onEdit");
  };

  return (
    <>
      {orders.map((order, index) => {
        const isYou = !!order.isYou;
        const isExpanded = !!expanded[index];
        return (
          <View key={index} style={styles.card}>
            <Pressable style={styles.rowHeader} onPress={() => toggle(index)}>
              <View style={styles.left}>
                <Text
                  style={[styles.name, isYou && { color: Colors.red }]}
                  numberOfLines={1}
                >
                  {order.name}
                </Text>
                <CustomText
                  text={`${itemCounts[index]} items`}
                  textStyle={[styles.meta]}
                />
              </View>

              <View style={styles.right}>
                <CustomText
                  text={`${totals[index].toFixed(2)} EGP`}
                  textStyle={[styles.total]}
                />
                <CustomText
                  text={isExpanded ? "▾" : "▸"}
                  textStyle={[styles.chev]}
                />
              </View>
            </Pressable>

            {isExpanded && (
              <View style={styles.expandedContent}>
                {order.items.map((item, idx) => (
                  <View key={idx} style={styles.item}>
                    <View style={styles.itemRow}>
                      <CustomText
                        text={item.label}
                        textStyle={[styles.itemText]}
                      />
                      <CustomText
                        text={`${item.price.toFixed(2)} EGP`}
                        textStyle={[styles.price]}
                      />
                    </View>
                    {isYou && (
                      <View style={styles.actions}>
                        <Pressable onPress={onDelete}>
                          <CustomText
                            text="Delete"
                            textStyle={[styles.delete]}
                          />
                        </Pressable>
                        <Pressable onPress={onEdit}>
                          <CustomText text="Edit" textStyle={[styles.edit]} />
                        </Pressable>
                      </View>
                    )}
                  </View>
                ))}
              </View>
            )}
          </View>
        );
      })}
    </>
  );
};

export default OrderList;

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
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  itemText: { fontSize: 14 },
  item: {},
  actions: {
    flexDirection: "row",
    gap: 8,
  },
  delete: { color: Colors.red },
  edit: { color: Colors.mustard },
  price: { fontFamily: "SenBold" },
});

// components/OrderCard.tsx
import CustomText from "@/src/components/common/CustomText";
import { Colors } from "@/src/constants/colors";
import { RootState } from "@/src/store/store";
import { CartStateUser, CartStateUserItem } from "@/src/types/cart.type";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import { CartOrderItem } from "./CartOrderItem";

type Props = {
  order: CartStateUser;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
  onDelete: (id: string) => void;
  onEdit: (item:any) => void;
};

export const OrderCard = ({
  order,
  isExpanded,
  onToggle,
  onDelete,
  onEdit,
}: Props) => {
  const user = useSelector((state: RootState) => state.user.user);

  // Determine if this order belongs to the current user. Support both server-side 'participantId' (number) and mapped 'isYou' flag.
  const isYou =
    !!user &&
    order.userId !== undefined &&
    String(user.id) === String(order.userId);


  const isHost = !!order.isHost;
  const router=useRouter();

  // Compose role styles: host and you can both apply
  const roleStyle: any[] = [styles.participantCard];
  if (isHost) roleStyle.push(styles.hostCard);
  if (isYou) roleStyle.push(styles.youCard);

  return (
    <View style={[styles.card, roleStyle]}>
      <Pressable style={styles.rowHeader} onPress={onToggle}>
        <View style={styles.left}>
          <View style={styles.nameRow}>
            <CustomText
              text={order.name}
              textStyle={[styles.name, isYou && { color: Colors.red }]}
            />
            <View style={{ gap: 5 }}>
              {isHost && (
                <View style={styles.hostBadge}>
                  <CustomText text="Host" textStyle={[styles.hostBadgeText]} />
                </View>
              )}

              {isYou && (
                <View style={styles.youBadge}>
                  <CustomText text="You" textStyle={[styles.youBadgeText]} />
                </View>
              )}
            </View>
          </View>

          <CustomText
            text={`${order.items.length} items`}
            textStyle={[styles.meta]}
          />
        </View>

        <View style={styles.right}>
          <CustomText
            text={`${order.subtotal.toFixed(2)} EGP`}
            textStyle={[styles.total]}
          />
          <CustomText text={isExpanded ? "▾" : "▸"} textStyle={[styles.chev]} />
        </View>
      </Pressable>

      {isExpanded && (
        <View style={styles.expandedContent}>
          {order.items.map((item: CartStateUserItem) => (
            <CartOrderItem
              key={item.orderItemId}
              item={item}
              isYou={isYou}
              onDelete={() => {
                if(isHost&&order.items.length===1) {
                  onDelete(item.orderItemId.toString());
                  router.replace("/(app)/(home)");
                  return;
                }
                onDelete(item.orderItemId.toString());
              }}
              onEdit={() => onEdit(item)}
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
  meta: { fontSize: 12, color: Colors.gray500, marginTop: 2 },
  total: { fontSize: 14, fontFamily: "SenBold", color: Colors.textPrimary },
  chev: { fontSize: 18, color: Colors.gray500, marginTop: 4 },
  expandedContent: {
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.gray500,
    paddingTop: 12,
  },

  // Role specific
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  hostBadge: {
    backgroundColor: Colors.mustard,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  hostBadgeText: { fontSize: 12, color: Colors.white },

  youBadge: {
    backgroundColor: Colors.red,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  youBadgeText: { fontSize: 12, color: Colors.white },

  hostCard: {
    borderColor: Colors.mustard,
    backgroundColor: Colors.yellow100,
  },

  youCard: {
    borderColor: Colors.red,
    backgroundColor: Colors.red100,
  },

  participantCard: {
    borderColor: Colors.border,
    backgroundColor: Colors.white,
  },
});

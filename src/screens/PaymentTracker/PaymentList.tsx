import CustomText from "@/src/components/common/CustomText";
import usePaymentList from "@/src/hooks/usePaymentList";
import { TrackerParticipant } from "@/src/types/order.type";
import React, { useCallback } from "react";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

type Props = {
  calculateTotal: (amount: number) => void;
  participants?: TrackerParticipant[];
  orderId: string;
};

/* Toggle constants (no magic numbers) */
const TOGGLE_WIDTH = 44;
const TOGGLE_HEIGHT = 24;
const TOGGLE_PADDING = 2;
const CIRCLE_SIZE = 16;

const PaymentList: React.FC<Props> = ({
  calculateTotal,
  participants,
  orderId,
}) => {
  const list = participants ?? [];

  const { toggles, toggleSwitch } = usePaymentList({
    participants: list,
    orderId,
    calculateTotal,
  });

  const renderItem = useCallback(
    ({ item }: { item: TrackerParticipant }) => {
      const isHost = item.isHost;
      const isPaid = Boolean(toggles[item.participantId]);

      const currentStatus: "host" | "paid" | "unpaid" = isHost
        ? "host"
        : isPaid
        ? "paid"
        : "unpaid";

      const translateX = isPaid
        ? TOGGLE_WIDTH - CIRCLE_SIZE - TOGGLE_PADDING * 2
        : 0;

      return (
        <View
          style={[
            styles.card,
            currentStatus === "host" && styles.hostCard,
            currentStatus === "paid" && styles.paidCard,
            currentStatus === "unpaid" && styles.unpaidCard,
          ]}
        >
          {/* Left Section */}
          <View style={styles.info}>
            <View
              style={[
                styles.avatar,
                currentStatus === "host" && styles.hostAvatar,
                currentStatus === "paid" && styles.paidAvatar,
                currentStatus === "unpaid" && styles.unpaidAvatar,
              ]}
            >
              {item.avatarUrl ? (
                <Image
                  source={{ uri: item.avatarUrl }}
                  style={StyleSheet.absoluteFillObject}
                />
              ) : (
                <CustomText
                  text={item.userName?.[0]?.toUpperCase() ?? "?"}
                  textStyle={[styles.avatarText]}
                />
              )}
            </View>

            <View>
              <Text style={styles.name}>{item.userName}</Text>
              <Text
                style={[
                  styles.amount,
                  currentStatus === "unpaid" && styles.unpaidAmount,
                ]}
              >
                {item.total} EGP
              </Text>
            </View>
          </View>

          {/* Right Section */}
          <View style={styles.actions}>
            {isHost && (
              <View style={styles.autoPaid}>
                <Text style={styles.autoPaidText}>Auto-Paid</Text>
              </View>
            )}

            {!isHost && (
              <Pressable
                style={[
                  styles.toggle,
                  isPaid ? styles.toggleOn : styles.toggleOff,
                ]}
                onPress={() => toggleSwitch(item.participantId)}
              >
                <View
                  style={[styles.toggleCircle, { transform: [{ translateX }] }]}
                />
              </Pressable>
            )}
          </View>
        </View>
      );
    },
    [toggles, toggleSwitch]
  );

  return (
    <FlatList
      data={list}
      keyExtractor={(item) => item.participantId}
      renderItem={renderItem}
      ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
      contentContainerStyle={{ padding: 16, paddingBottom: 120 }}
      scrollEnabled={list.length > 5}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    backgroundColor: "#fff",
  },

  /* Card States */
  hostCard: {
    backgroundColor: "#F9FAFB",
    borderColor: "#E5E7EB",
  },
  paidCard: {
    backgroundColor: "#DCFCE7",
    borderColor: "#D1FAE5",
  },
  unpaidCard: {
    borderLeftWidth: 4,
    borderLeftColor: "#EF4444",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },

  info: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  /* Avatar */
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  hostAvatar: { backgroundColor: "#111827" },
  paidAvatar: { backgroundColor: "#22C55E" },
  unpaidAvatar: { backgroundColor: "#EF4444" },

  avatarText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },

  name: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#111827",
  },
  amount: {
    fontSize: 12,
    color: "#6B7280",
  },
  unpaidAmount: {
    color: "#EF4444",
    fontWeight: "bold",
  },

  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  autoPaid: {
    backgroundColor: "#E5E7EB",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  autoPaidText: {
    fontSize: 10,
    color: "#4B5563",
  },

  /* Toggle */
  toggle: {
    width: TOGGLE_WIDTH,
    height: TOGGLE_HEIGHT,
    borderRadius: TOGGLE_HEIGHT / 2,
    justifyContent: "center",
    padding: TOGGLE_PADDING,
  },
  toggleOn: { backgroundColor: "#22C55E" },
  toggleOff: { backgroundColor: "#E5E7EB" },

  toggleCircle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    backgroundColor: "#fff",
  },
});

export default PaymentList;

import usePaymentList from "@/src/hooks/usePaymentList";
import { TrackerParticipant } from "@/src/types/order.type";
import React from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View
} from "react-native";


type Props = {
  calculateTotal: (amount: number) => void;
  participants?: TrackerParticipant[];
  orderId: string;
};

const PaymentList = ({ calculateTotal, participants, orderId }: Props) => {
  const list = participants ?? [];

  const { toggles, toggleSwitch } = usePaymentList({ participants: list, orderId, calculateTotal });

  const renderItem = ({ item }: { item: TrackerParticipant }) => {
    const isHost = item.isHost;
    const isPaid = toggles[item.userId];
    const currentStatus = isHost ? "host" : isPaid ? "paid" : "unpaid";

    const containerStyle = [
      styles.card,
      currentStatus === "host" && styles.hostCard,
      currentStatus === "paid" && styles.paidCard,
      currentStatus === "unpaid" && styles.unpaidCard,
    ];

    return (
      <View style={containerStyle}>
        <View style={styles.info}>
          <View
            style={[
              styles.avatar,
              currentStatus === "host" && styles.hostAvatar,
              currentStatus === "paid" && styles.paidAvatar,
              currentStatus === "unpaid" && styles.unpaidAvatar,
            ]}
          >
            <Text style={styles.avatarText}>{item.avatarUrl}</Text>
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

        <View style={styles.actions}>
          {item.isHost && (
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
              onPress={() => toggleSwitch(item.userId)}
            >
              <View
                style={[
                  styles.toggleCircle,
                  { transform: [{ translateX: isPaid ? 20 : 2 }] },
                ]}
              />
            </Pressable>
          )}
        </View>
      </View>
    );
  };

  return (
    <FlatList
      data={list}
      keyExtractor={(item) => item.userId}
      renderItem={renderItem}
      ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
      contentContainerStyle={{ padding: 16, paddingBottom: 120 }}
      scrollEnabled={false}
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

  // Card States
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

  // Avatar styles
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
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

  // Toggle
  toggle: {
    width: 44,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    padding: 2,
  },
  toggleOn: { backgroundColor: "#22C55E" },
  toggleOff: { backgroundColor: "#E5E7EB" },

  toggleCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#fff",
  },
});

export default PaymentList;

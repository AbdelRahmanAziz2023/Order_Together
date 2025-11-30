import { Colors } from "@/src/constants/colors";
import { Pressable, StyleSheet, Text, View } from "react-native";

const PaymentReceiver = () => {
  return (
    <View style={styles.wrapper}>
      {/* Icon */}
      <View style={styles.iconBox}>
        <Text style={styles.icon}>💳</Text>
      </View>

      {/* Text Info */}
      <View style={{ flex: 1 }}>
        <Text style={styles.label}>RECEIVING ON</Text>
        <Text style={styles.value}>ahmed@instapay</Text>
      </View>

      {/* Actions */}
      <View style={styles.actions}>
        <Pressable onPress={() => {}}>
          <Text style={styles.actionText}>Copy</Text>
        </Pressable>

        <Pressable onPress={() => {}}>
          <Text style={styles.actionText}>Edit</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default PaymentReceiver;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.gray300,
    borderRadius: 12,
    backgroundColor: Colors.gray100,
    padding: 16,
    gap: 12,
  },
  iconBox: {
    width: 32,
    height: 32,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    fontSize: 18,
  },
  label: {
    fontSize: 10,
    color: "#6B7280",
    fontWeight: "700",
    textTransform: "uppercase",
  },
  value: {
    fontSize: 14,
    color: "#111827",
    fontWeight: "500",
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  actionText: {
    fontSize: 13,
    color: "#3B82F6", // blue-500
    fontWeight: "600",
  },
});

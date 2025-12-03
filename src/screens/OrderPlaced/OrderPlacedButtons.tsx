import { Colors } from "@/src/constants/colors";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

type Props = {
  onTrackPayments: () => void;
  onReturnDashboard: () => void;
};

const OrderPlacedButtons: React.FC<Props> = ({
  onTrackPayments,
  onReturnDashboard,
}) => {
  return (
    <>
      <TouchableOpacity style={styles.primaryButton} onPress={onTrackPayments}>
        <Text style={styles.primaryButtonText}>Track Payments</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={onReturnDashboard}
      >
        <Text style={styles.secondaryButtonText}>Return to Dashboard</Text>
      </TouchableOpacity>
    </>
  );
};

export default OrderPlacedButtons;

const styles = StyleSheet.create({
  primaryButton: {
    width: "100%",
    backgroundColor: Colors.lightred,
    paddingVertical: 16,
    borderRadius: 16,
    marginBottom: 12,
    alignItems: "center",
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 16,
  },
  secondaryButton: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    paddingVertical: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    alignItems: "center",
  },
  secondaryButtonText: {
    color: "#4B5563",
    fontWeight: "700",
    fontSize: 16,
  },
});

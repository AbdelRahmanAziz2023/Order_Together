import React from "react";
import { Animated, StyleSheet, Text } from "react-native";

const OrderPlacedHeader = ({ scaleAnim }: { scaleAnim: Animated.Value }) => {
  return (
    <>
      <Animated.View
        style={[styles.iconWrapper, { transform: [{ scale: scaleAnim }] }]}
      >
        <Text style={styles.icon}>✔️</Text>
      </Animated.View>

      <Text style={styles.title}>Order Placed!</Text>

      <Text style={styles.subtitle}>
        Your cart has been archived and all participants notified.
      </Text>
    </>
  );
};

export default OrderPlacedHeader;

const styles = StyleSheet.create({
  iconWrapper: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: "#D1FAE5",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  icon: {
    fontSize: 48,
    color: "#10B981",
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 24,
  },
});

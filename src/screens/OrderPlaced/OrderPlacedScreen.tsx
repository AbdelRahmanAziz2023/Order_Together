import React, { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";

import { useLocalSearchParams, useRouter } from "expo-router";
import OrderPlacedButtons from "./OrderPlacedButtons";
import OrderPlacedHeader from "./OrderPlacedHeader";
import OrderPlacedReceipt from "./OrderPlacedReceipt";

const OrderPlacedScreen = () => {
  const redirectSeconds = 10;
  const [timeLeft, setTimeLeft] = useState(redirectSeconds);
  const scaleAnim = useRef(new Animated.Value(0)).current;

  const {orderId,participantCount,totalAmount,restaurantName} = useLocalSearchParams<{orderId:string;participantCount:string;totalAmount:string;restaurantName:string}>();
console.log(orderId,participantCount,totalAmount,restaurantName)
  const router = useRouter();

  const onReturnDashboard = () => {
    router.replace("/(app)/(home)");
  };

  const onTrackPayments = () => {
    router.replace({
      pathname: "/(app)/(home)/PaymentTracker",
      params: {orderId:orderId}
    });
  };

  // Countdown
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onReturnDashboard();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Animate Icon
  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={styles.container}>
      {/* Background */}
      <View style={[styles.particle, styles.p1]} />
      <View style={[styles.particle, styles.p2]} />
      <View style={[styles.particle, styles.p3]} />
      <View style={[styles.particle, styles.p4]} />

      <View style={styles.card}>
        <OrderPlacedHeader scaleAnim={scaleAnim} />

        <OrderPlacedReceipt
          restaurant={restaurantName}
          totalPaid={Number(totalAmount)}
          participants={Number(participantCount)}
        />

        <OrderPlacedButtons
          onTrackPayments={onTrackPayments}
          onReturnDashboard={onReturnDashboard}
        />
      </View>

      <Text style={styles.countdown}>
        Redirecting to dashboard in {timeLeft}s...
      </Text>
    </View>
  );
};

export default OrderPlacedScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    marginBottom: 120,
  },

  particle: {
    position: "absolute",
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#E0E7FF",
    opacity: 0.3,
  },

  p1: { top: 20, left: 20 },
  p2: { top: 30, right: 0 },
  p3: { bottom: 65, left: 30 },
  p4: { bottom: 50, right: 20 },

  card: {
    width: "90%",
    maxWidth: 400,
    backgroundColor: "#FFFFFF",
    borderRadius: 32,
    padding: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    zIndex: 10,
  },

  countdown: {
    fontSize: 12,
    color: "#9CA3AF",
    marginTop: 24,
  },
});

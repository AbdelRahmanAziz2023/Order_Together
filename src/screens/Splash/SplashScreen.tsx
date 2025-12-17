import { useRouter } from "expo-router";
import React, { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet, View } from "react-native";

import useAuthStatus from "@/src/hooks/useAuthStatus";
import FooterIcon from "./FooterIcon";
import HeaderIcon from "./HeaderIcon";
import MainLogo from "./MainLogo";

const SplashScreen: React.FC = () => {
  const router = useRouter();
  const isAuthenticated = useAuthStatus();

  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isAuthenticated === null) return;

    Animated.sequence([
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 3,
          tension: 100,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
      Animated.delay(500),
    ]).start(() => {
      router.replace(
        isAuthenticated ? "/(app)/(home)" : "/(auth)/Login"
      );
    });
  }, [isAuthenticated]);

  return (
    <View style={styles.container}>
      <HeaderIcon fadeAnim={fadeAnim} scaleAnim={scaleAnim} />
      <FooterIcon fadeAnim={fadeAnim} scaleAnim={scaleAnim} />
      <MainLogo fadeAnim={fadeAnim} scaleAnim={scaleAnim} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default SplashScreen;

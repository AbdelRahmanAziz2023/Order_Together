import { useRouter } from "expo-router";
import React, { useEffect, useRef } from "react";
import { Animated, Easing, Image, StyleSheet, View } from "react-native";

import useAuthStatus from "@/src/hooks/useAuthStatus";
import { Icons } from "../../constants/images";

const SplashScreen: React.FC = () => {
  const router = useRouter();

  // Use the custom hook for authentication logic
  const isAuthenticated = useAuthStatus();

  // Typed animation refs
  const scaleAnim = useRef<Animated.Value>(new Animated.Value(0.5)).current;
  const fadeAnim = useRef<Animated.Value>(new Animated.Value(0)).current;

  useEffect(() => {
    if (isAuthenticated === null) return; // still loading

    const startAnimation = (): void => {
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
        setTimeout(() => {
          if (isAuthenticated) {
            router.replace("/(app)/(home)");
          } else {
            router.replace("/(auth)/Login");
          }
        }, 100);
      });
    };

    startAnimation();
  }, [isAuthenticated, fadeAnim, scaleAnim, router]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.topLeft,
          { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
        ]}
      >
        <Icons.ellipseMustard width={180} height={180} />
      </Animated.View>

      <Animated.View
        style={[
          styles.bottomRight,
          { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
        ]}
      >
        <Icons.ellipseRed width={250} height={250} />
      </Animated.View>

      <Animated.View
        style={[
          styles.logoContainer,
          { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
        ]}
      >
        <Image 
          source={require("../../../assets/images/Order-Together-Logo.png")} 
          style={styles.logo}
          resizeMode="contain"
        />
      </Animated.View>
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
  logoContainer: {
    zIndex: 10,
  },
  logo: {
    width: 300,
    height: 300,
  },
  topLeft: { position: "absolute", top: 0, left: 0 },
  bottomRight: { position: "absolute", bottom: 0, right: 0 },
});

export default SplashScreen;

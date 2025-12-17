import React from "react";
import { Animated, Image, StyleSheet } from "react-native";

interface Props {
  fadeAnim: Animated.Value;
  scaleAnim: Animated.Value;
}

const MainLogo: React.FC<Props> = ({ fadeAnim, scaleAnim }) => {
  return (
    <Animated.View
      style={[
        styles.container,
        { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
      ]}
    >
      <Image
        source={require("../../../assets/images/Order-Together-Logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 10,
  },
  logo: {
    width: 300,
    height: 300,
  },
});

export default MainLogo;

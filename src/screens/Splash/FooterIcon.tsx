import { Icons } from "@/src/constants/images";
import React from "react";
import { Animated, StyleSheet } from "react-native";

interface Props {
  fadeAnim: Animated.Value;
  scaleAnim: Animated.Value;
}

const FooterIcon: React.FC<Props> = ({ fadeAnim, scaleAnim }) => {
  return (
    <Animated.View
      style={[
        styles.container,
        { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
      ]}
    >
      <Icons.ellipseRed width={250} height={250} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    right: 0,
  },
});

export default FooterIcon;

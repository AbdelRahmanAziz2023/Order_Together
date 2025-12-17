import { Icons } from "@/src/constants/images";
import React from "react";
import { Animated, StyleSheet } from "react-native";

interface Props {
  fadeAnim: Animated.Value;
  scaleAnim: Animated.Value;
}

const HeaderIcon: React.FC<Props> = ({ fadeAnim, scaleAnim }) => {
  return (
    <Animated.View
      style={[
        styles.container,
        { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
      ]}
    >
      <Icons.ellipseMustard width={180} height={180} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
  },
});

export default HeaderIcon;

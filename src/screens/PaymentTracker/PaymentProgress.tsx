import CustomText from "@/src/components/common/CustomText";
import { Colors } from "@/src/constants/colors";
import { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet, View } from "react-native";

type PaymentProgressProps = {
  collected: number;
  remaining:number;
  total: number; 
};

const PaymentProgress = ({ collected, total,  }: PaymentProgressProps) => {
  const progressAnim = useRef(new Animated.Value(0)).current;
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  const progressPercent = total > 0 ? Math.min(collected / total, 1) : 0;
  const remaining = Math.max(total - collected, 0);



  useEffect(() => {
    // Animate progress fill
    Animated.timing(progressAnim, {
      toValue: progressPercent,
      duration: 1000,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false,
    }).start();

    // Loop shimmer animation
    Animated.loop(
      Animated.timing(shimmerAnim, {
        toValue: 1,
        duration:1500,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [progressPercent, progressAnim, shimmerAnim]);

  const shimmerTranslate = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-300, 300],
  });

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.rowBetween}>
       <CustomText text="Collected" textStyle={[styles.badge]} />
       <CustomText text={`${collected.toFixed(2)} / ${total.toFixed(2)} EGP`} textStyle={[styles.amount]} />
      </View>

      {/* Progress Bar */}
      <View style={styles.progressBackground}>
        <Animated.View
          style={[
            styles.progressFill,
            {
              width: progressAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ["0%", "100%"],
              }),
            },
          ]}
        >
          {/* Shimmer */}
          <Animated.View
            style={[styles.shimmer, { transform: [{ translateX: shimmerTranslate }] }]}
          />
        </Animated.View>
      </View>

      {/* Remaining Amount */}
      <CustomText text={`Remaining: ${remaining.toFixed(2)} EGP`} textStyle={[styles.remaining]} />
    </View>
  );
};

export default PaymentProgress;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingTop: 20,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  badge: {
    fontSize: 10,
    fontFamily: "SenBold",
    textTransform: "uppercase",
    paddingVertical: 2,
    paddingHorizontal: 8,
    color: Colors.success,
    backgroundColor: Colors.green100,
    borderRadius: 12,
  },
  amount: {
    fontSize: 12,
    fontWeight: "600",
    color: Colors.success,
  },
  progressBackground: {
    width: "100%",
    height: 10,
    backgroundColor: Colors.gray200,
    borderRadius: 20,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: Colors.success,
    borderRadius: 20,
    overflow: "hidden",
  },
  shimmer: {
    position: "absolute",
    width: "40%",
    height: "100%",
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.3)",
  },
  remaining: {
    fontSize: 14,
    fontWeight: "500",
    color: Colors.lightred,
    marginTop: 8,
    alignSelf: "center",
  },
});

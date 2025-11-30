import CustomText from "@/src/components/common/CustomText";
import React from "react";
import { StyleSheet, View } from "react-native";

type Props = {
  count: number;
};

const ParticipantsHeader = ({count }: Props) => {
  return (
    <View style={styles.container}>
      <CustomText text={`Participants (${count})`} textStyle={styles.title} />
      <CustomText text="Tap to toggle status" textStyle={styles.subtitle} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111827",
  },
  subtitle: {
    fontSize: 12,
    color: "#6B7280",
  },
});

export default ParticipantsHeader;

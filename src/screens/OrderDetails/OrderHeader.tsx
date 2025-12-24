import CustomText from "@/src/components/common/CustomText";
import { Colors } from "@/src/constants/colors";
import getStatusBadgeStyle from "@/src/helper/getStatusBadgeStyle";
import * as Clipboard from "expo-clipboard";
import { Copy } from "lucide-react-native";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Toast from "react-native-toast-message";

type Props = {
  status: string;
  inviteCode?: string;
};

const OrderHeader = ({ status, inviteCode }: Props) => {
  const isOpen = status === "Open";

  const handleCopy = async () => {
    if (!inviteCode) return;
    await Clipboard.setStringAsync(inviteCode);
    Toast.show({
      type: "success",
      text1: "Copied to clipboard",
      text2: `${inviteCode} has been copied to your clipboard.`,
    });
  };

  return (
    <View style={styles.container}>
      {/* Title */}
      <CustomText text="Cart Details" textStyle={[styles.header]} />

      {/* Status + Invite */}
      <View style={styles.row}>
        {/* Status */}
        <View style={[styles.statusBadge, getStatusBadgeStyle(status)]}>
          <CustomText text={isOpen ? "Open" : "Locked"} textStyle={[styles.statusText]} />
        </View>

        {/* Invite Code */}
        {isOpen && inviteCode && (
          <Pressable
            style={({ pressed }) => [styles.inviteCode, pressed && styles.invitePressed]}
            onPress={handleCopy}
          >
            <CustomText text={inviteCode} textStyle={[styles.inviteCodeText]} />
            <Copy size={16} color={Colors.mustard} />
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default OrderHeader;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: 12,
    marginBottom: 10,
  },

  header: {
    fontSize: 24,
    fontFamily: "SenExtraBold",
    color: Colors.black,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },

  statusBadge: {
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 14,
  },

  statusText: {
    color: Colors.white,
    fontSize: 13,
    fontFamily: "SenBold",
  },

  inviteCode: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.mustard,
    backgroundColor: Colors.mustard + "10",
  },

  invitePressed: {
    opacity: 0.7,
    transform: [{ scale: 0.97 }],
  },

  inviteCodeText: {
    color: Colors.mustard,
    fontSize: 13,
    fontFamily: "SenBold",
  },
});

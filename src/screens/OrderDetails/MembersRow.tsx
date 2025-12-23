import CustomText from "@/src/components/common/CustomText";
import { Colors } from "@/src/constants/colors";
import {
  useDeleteCartMutation,
  useLeaveCartMutation,
  useUnlockCartMutation,
} from "@/src/services/api/endpoints/cartEndpoints";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Toast from "react-native-toast-message";

type OrderItem = {
  label?: string;
  price?: number;
};

type Props = {
  status: string;
  setStatus: (s: string) => void;
  membersCount?: number;
  isItems?: boolean;
  isHost?: boolean;
};

const MembersRow = ({
  status,
  setStatus,
  isItems = false,
  isHost = false,
  membersCount = 3,
}: Props) => {
  const isLocked = status === "Locked";
  const isOpened = status === "Open";

  const [leaveCart] = useLeaveCartMutation();
  const [unlockCart] = useUnlockCartMutation();
  const [cancelOrder] = useDeleteCartMutation();

  const router = useRouter();

  const onUnlockPress = async () => {
    try {
      //await unlockCart().unwrap();
    } catch (e) {
      console.log(e);
      Toast.show({
        type: "error",
        text1: "Error unlocking cart",
        text2: "Please try again",
      });
    }
  };

  const onCancelPress = async () => {
    try {
      //await cancelOrder().unwrap();
      router.replace("/(app)/(home)");
      Toast.show({
        type: "success",
        text1: "You canceled the order",
      });
    } catch (e) {
      console.log(e);
      Toast.show({
        type: "error",
        text1: "Error canceling order",
        text2: "Please try again",
      });
    }
  };

  const onLeavePress = async () => {
    try {
      //await leaveCart().unwrap();
      router.replace("/(app)/(home)");
      Toast.show({
        type: "success",
        text1: "You left the cart",
      });
    } catch (e) {
      console.log(e);
      Toast.show({
        type: "error",
        text1: "Error leaving cart",
        text2: "Please try again",
      });
    }
  };

  return (
    <View style={styles.membersRow}>
      <View style={{ flex: 1 }}>
        <CustomText
          text={`${membersCount} ${isItems ? "items" : "members"}`}
          textStyle={[styles.membersText]}
        />
      </View>

      <View>
        {isHost ? (
          <Pressable
            style={({ pressed }) => [
              styles.textButton,
              pressed && styles.textButtonPressed,
            ]}
            onPress={() => {
              if (isOpened) {
                onCancelPress();
              } else {
                onUnlockPress();
                setStatus("Open");
              }
            }}
          >
            <CustomText
              text={isOpened ? "Cancel" : "Unlock"}
              textStyle={[styles.actionText]}
            />
          </Pressable>
        ) : (
          isOpened && (
            <Pressable
              onPress={onLeavePress}
              style={({ pressed }) => [
                styles.textButton,
                pressed && styles.textButtonPressed,
              ]}
            >
              <CustomText text="Leave" textStyle={[styles.actionText]} />
            </Pressable>
          )
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  membersRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  membersText: { fontSize: 14, fontFamily: "SenMedium", color: "#374151" },
  actionText: { fontSize: 14, fontFamily: "SenBold", color: "#EF4444" },
  textButton: {
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: Colors.lightred,
  },
  textButtonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.97 }],
  },
});

export default MembersRow;

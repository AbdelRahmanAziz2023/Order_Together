import CustomText from "@/src/components/common/CustomText";
import { Colors } from "@/src/constants/colors";
import {
  useDeleteCartMutation,
  useLeaveCartMutation,
  useUnlockCartMutation,
} from "@/src/services/api/endpoints/cartEndpoints";
import { toggleCartState } from "@/src/store/slices/cartSlice";
import { RootState } from "@/src/store/store";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";

type Props = {
  membersCount?: number;
  isItems?: boolean;
  isHost?: boolean;
  isSpectator?: boolean;
  cartId: string;
};

const MembersRow = ({
  isItems = false,
  isHost = false,
  isSpectator = false,
  membersCount = 3,
  cartId,
}: Props) => {
  useLeaveCartMutation();
  const [unlockCart] = useUnlockCartMutation();
  useDeleteCartMutation();

  const isLocked = useSelector((state: RootState) => state.cart.isLocked);
  const router = useRouter();
  const dispatch = useDispatch();

  const onUnlockPress = async () => {
    try {
      await unlockCart(cartId).unwrap();
      dispatch(toggleCartState(false));
      Toast.show({
        type: "success",
        text1: "You unlocked the cart",
      });
    } catch (e) {
      console.debug(e);
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
      console.debug(e);
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
      console.debug(e);
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
          text={`${membersCount} ${isItems ? "Items" : "Members"}`}
          textStyle={[styles.membersText]}
        />
      </View>

      {!isSpectator && (
        <View>
          {isHost ? (
            <Pressable
              style={({ pressed }) => [
                styles.textButton,
                pressed && styles.textButtonPressed,
              ]}
              onPress={() => {
                if (!isLocked) {
                  onCancelPress();
                } else {
                  onUnlockPress();
                }
              }}
            >
              <CustomText
                text={isLocked ? "Unlock" : "Cancel"}
                textStyle={[styles.actionText]}
              />
            </Pressable>
          ) : (
            !isLocked && (
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
      )}
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

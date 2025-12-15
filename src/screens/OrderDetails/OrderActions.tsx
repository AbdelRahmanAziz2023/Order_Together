import CustomButton from "@/src/components/common/CustomButton";
import { Colors } from "@/src/constants/colors";
import { Icons } from "@/src/constants/images";
import { usePlaceOrderMutation } from "@/src/services/api/endpoints/orderEndpoints";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";
import Toast from "react-native-toast-message";

const OrderActions = ({
  isOpened,
  isLocked,
  isCreator,
  onChangeStatus,
}: any) => {
  const [placeOrder] = usePlaceOrderMutation();
  const router = useRouter();
  const onPlaceOrderPress = async () => {
    try {
      //const res = await placeOrder({}).unwrap();
      router.replace({
        pathname: "/(app)/(home)/OrderPlaced",
        //params: { orderId: res.id, status: res.status },
      });
    } catch (e) {
      console.log(e);
      Toast.show({
        type: "error",
        text1: "Error placing order",
        text2: "Please try again",
      });
    }
  };

  const onCheckoutPress = () => {
    onChangeStatus("Locked");
  };
  return (
    <>
      {/* -------------------- OPENED -------------------- */}
      {isOpened && (
        <>
          <CustomButton
            title="Add Items"
            btnStyle={styles.addBtn}
            Icon={Icons.plus}
          />
          {isCreator && (
            <CustomButton
              title="Lock & Checkout"
              btnStyle={styles.leaveBtn}
              Icon={Icons.check}
              onPress={onCheckoutPress}
            />
          )}
        </>
      )}

      {/* -------------------- LOCKED -------------------- */}
      {isLocked && isCreator && (
        <CustomButton
          title="Place Order"
          btnStyle={styles.leaveBtn}
          Icon={Icons.check}
          onPress={onPlaceOrderPress}
        />
      )}
    </>
  );
};

export default OrderActions;

const styles = StyleSheet.create({
  addBtn: {
    marginTop: 26,
    backgroundColor: Colors.mustard,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  leaveBtn: {
    marginTop: 26,
    backgroundColor: Colors.red,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
});

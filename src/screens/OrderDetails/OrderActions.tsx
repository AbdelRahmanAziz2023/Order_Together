import CustomButton from "@/src/components/common/CustomButton";
import { Colors } from "@/src/constants/colors";
import { Icons } from "@/src/constants/images";
import React from "react";
import { StyleSheet } from "react-native";

const OrderActions = ({
  isLocked,
  isHost,
  onChangeStatus,
  onPlaceOrder,
  onAddItem
}: any) => {
    

  const onCheckout = () => {
    onChangeStatus("Locked");
  };
  return (
    <>
      {/* -------------------- OPENED -------------------- */}
      {!isLocked && (
        <>
          <CustomButton
            title="Add Items"
            btnStyle={styles.addBtn}
            Icon={Icons.plus}
            onPress={onAddItem}
          />
          {isHost && (
            <CustomButton
              title="Lock & Checkout"
              btnStyle={styles.leaveBtn}
              Icon={Icons.check}
              onPress={onCheckout}
            />
          )}
        </>
      )}

      {/* -------------------- LOCKED -------------------- */}
      {isLocked && isHost && (
        <CustomButton
          title="Place Order"
          btnStyle={styles.leaveBtn}
          Icon={Icons.check}
          onPress={onPlaceOrder}
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

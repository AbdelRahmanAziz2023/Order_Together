import CustomButton from "@/src/components/common/CustomButton";
import { Colors } from "@/src/constants/colors";
import { Icons } from "@/src/constants/images";
import React from "react";
import { StyleSheet } from "react-native";

const OrderActions = ({
  isOpened,
  isLocked,
  isPlaced,
  isCreator,
  onCheckoutPress,
  onChangeStatus,
}: any) => {
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

          <CustomButton
            title={isCreator ? "Cancel Order" : "Leave Order"}
            btnStyle={styles.leaveBtn}
            Icon={isCreator ? Icons.cross : Icons.logout}
            onPress={() => onChangeStatus("placed")}
          />
        </>
      )}

      {/* -------------------- LOCKED -------------------- */}
      {isLocked && isCreator && (
        <>
          <CustomButton
            title="Open Order"
            btnStyle={styles.addBtn}
            Icon={Icons.plus}
            onPress={() => onChangeStatus("opened")}
          />

          <CustomButton
            title="Checkout"
            btnStyle={styles.leaveBtn}
            Icon={Icons.check}
            onPress={onCheckoutPress}
          />
        </>
      )}

      {/* -------------------- PLACED -------------------- */}
      {isPlaced && isCreator && (
        <CustomButton
          title="Payment"
          btnStyle={styles.leaveBtn}
          Icon={Icons.creditCard}
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

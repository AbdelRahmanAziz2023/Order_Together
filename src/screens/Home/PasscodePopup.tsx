import CustomButton from "@/src/components/common/CustomButton";
import CustomText from "@/src/components/common/CustomText";
import CustomTextField from "@/src/components/common/CustomTextField";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Modal, StyleSheet, TouchableOpacity, View } from "react-native";

type Props = {
  isVisible: boolean;
  onClose: () => void;
};

const PasscodePopup = ({ isVisible = false, onClose }: Props) => {
  const router = useRouter();
  const [passcode, setPasscode] = useState("");

  const handleSubmit = () => {
    router.push({
      pathname: "/(app)/(home)/OrderDetails",
      params: { orderId:""},
    });
    handleClose();
  };

  const handleClose = () => {
    setPasscode("");
    onClose();
  };

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="fade"
      onRequestClose={handleClose}
    >
      <View style={styles.overlay}>
        <View style={styles.alertBox}>
          <CustomText text="Enter Passcode" textStyle={styles.title} />

          <CustomTextField
            placeholder="Passcode"
            name=""
            value={passcode}
            onChangeText={setPasscode}
          />

          <CustomButton
            title="Submit"
            btnStyle={styles.submitButton}
            onPress={handleSubmit}
          />

          <TouchableOpacity onPress={handleClose}>
            <CustomText text="Close" textStyle={styles.closeText} />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },

  alertBox: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 25,
    alignItems: "center",
  },

  title: {
    fontSize: 22,
    fontFamily: "SenBold",
    color: "#000",
  },

  submitButton: {
    width: "50%",
    marginTop: 20,
  },

  closeText: {
    marginTop: 15,
    fontSize: 14,
    color: "#777",
    textDecorationLine: "underline",
  },
});

export default PasscodePopup;

import CustomText from "@/src/components/common/CustomText";
import { Colors } from "@/src/constants/colors";
import React from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

type Props = {
  visible: boolean;
  fee: string;
  onClose: () => void;
  onConfirm: (value: string) => void;
};

const DeliveryFeePopup = ({ visible, onClose, onConfirm, fee }: Props) => {
  const [tempFee, setTempFee] = React.useState(fee);

  // 🔥 Sync tempFee when popup opens or fee changes
  React.useEffect(() => {
    if (visible) setTempFee(fee);
  }, [visible, fee]);

  if (!visible) return null;

  const isInvalid = tempFee !== "" && isNaN(Number(tempFee));

  return (
    <View style={styles.popupOverlay}>
      <View style={styles.popupCard}>
        <CustomText text="Add Delivery Fee" textStyle={styles.popupTitle} />

        <TextInput
          style={styles.popupInput}
          placeholder="Enter fee (EGP)"
          keyboardType="numeric"
          value={tempFee}
          onChangeText={setTempFee}
        />

        {isInvalid && <Text style={styles.errorText}>Enter a valid number</Text>}

        <View style={styles.buttons}>
          <Pressable style={styles.cancelBtn} onPress={onClose}>
            <Text style={styles.cancelText}>Cancel</Text>
          </Pressable>

          <Pressable
            style={styles.confirmBtn}
            onPress={() => {
              if (!isInvalid) onConfirm(tempFee);
            }}
          >
            <Text style={styles.confirmText}>Confirm</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default DeliveryFeePopup;

const styles = StyleSheet.create({
  popupOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  popupCard: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
  },
  popupTitle: {
    fontSize: 20,
    fontFamily: "SenBold",
    marginBottom: 14,
    textAlign: "center",
  },
  popupInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    marginBottom: 8,
  },
  errorText: {
    color: Colors.red,
    fontSize: 13,
    marginBottom: 8,
  },
  buttons: {
    flexDirection: "row",
    gap: 12,
    marginTop: 6,
  },
  cancelBtn: {
    flex: 1,
    backgroundColor: "#ccc",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  confirmBtn: {
    flex: 1,
    backgroundColor: Colors.mustard,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  cancelText: {
    fontSize: 16,
    fontFamily: "SenBold",
  },
  confirmText: {
    fontSize: 16,
    fontFamily: "SenBold",
    color: Colors.black,
  },
});

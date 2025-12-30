import CustomText from "@/src/components/common/CustomText";
import React from "react";
import { StyleSheet, TextInput, View } from "react-native";

type Props = {
  deliveryFee: number;
  setDeliveryFee: (v: number) => void;
  setPaymentInstapay: (v: string) => void;
  membersCount?: number;
};

const DeliveryPaymentSection = ({
  deliveryFee,
  setDeliveryFee,
  setPaymentInstapay,
  membersCount = 3,
}: Props) => {
  const perPerson =
    membersCount > 0 ? (deliveryFee / membersCount).toFixed(2) : "0.00";

  const onDeliveryChange = (v: string) => {
    setDeliveryFee(Number(v));
  };

  return (
    <View style={styles.container}>
      {/* Delivery Fee */}
      <View style={styles.row}>
        <View style={{ flex: 1 }}>
          <CustomText text="Total Delivery" textStyle={[styles.label]} />

          <View style={styles.inputGroup}>
            <View style={styles.leftTag}>
              <CustomText text="EGP" textStyle={[styles.leftTagText]} />
            </View>

            <TextInput
              keyboardType="numeric"
              placeholder="0"
              onChangeText={onDeliveryChange}
              style={styles.numberInput}
              value={String(deliveryFee)}
            />
          </View>
        </View>

        {/* AUTO CALCULATED */}
        <View style={styles.perPersonBox}>
          <CustomText
            text={`= ${perPerson} / person`}
            textStyle={[styles.perPersonText]}
          />
        </View>
      </View>

      {/* Payment Instructions */}
      <View style={styles.section}>
        <CustomText text="Payment Instructions" textStyle={[styles.label]} />

        <View style={styles.inputGroup}>
          <View style={styles.icon}>
            <CustomText text="💳" textStyle={[{ fontSize: 18 }]} />
          </View>

          <TextInput
            placeholder="ahmed@instapay"
            style={styles.textInput}
            onChangeText={(v) => setPaymentInstapay(v)}
          />
        </View>

        <CustomText
          text="Participants will see this on their bill."
          textStyle={[styles.hint]}
        />
      </View>
    </View>
  );
};

export default DeliveryPaymentSection;

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },

  row: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 20,
  },

  label: {
    fontSize: 11,
    fontFamily: "SenBold",
    color: "#6B7280",
    textTransform: "uppercase",
    marginBottom: 6,
  },

  inputGroup: {
    justifyContent: "center",
  },

  leftTag: {
    position: "absolute",
    left: 12,
    top: 0,
    bottom: 0,
    zIndex: 1,
    justifyContent: "center",
  },

  leftTagText: {
    fontSize: 14,
    fontFamily: "SenBold",
    color: "#D1D5DB",
  },

  numberInput: {
    paddingLeft: 55,
    height: 48,
    width: "100%",
    backgroundColor: "#F9FAFB",
    borderColor: "#D1D5DB",
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 17,
    fontWeight: "700",
    color: "#111827",
  },

  perPersonBox: {
    justifyContent: "flex-end",
    paddingBottom: 4,
  },

  perPersonText: {
    fontSize: 14,
    fontFamily: "SenBold",
    color: "#111827",
  },

  /** Payment Instructions */
  section: {
    marginBottom: 16,
  },

  icon: {
    position: "absolute",
    left: 12,
    top: 13,
    zIndex: 1,
  },

  textInput: {
    paddingLeft: 45,
    height: 48,
    borderRadius: 10,
    borderColor: "#D1D5DB",
    borderWidth: 1,
    fontSize: 15,
    backgroundColor: "#FFFFFF",
    color: "#111827",
  },

  hint: {
    fontSize: 11,
    color: "#9CA3AF",
    marginTop: 6,
  },
});

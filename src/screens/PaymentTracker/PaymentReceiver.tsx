import CustomText from "@/src/components/common/CustomText";
import { Colors } from "@/src/constants/colors";
import * as Clipboard from "expo-clipboard";
import { Copy } from "lucide-react-native";
import { Pressable, StyleSheet, View } from "react-native";
import Toast from "react-native-toast-message";

type Props = {
  isEditing?: boolean;
  textToCopy?: string;
};

const PaymentReceiver = ({
  isEditing = false,
  textToCopy = "ahmed@instapay",
}: Props) => {
  const handleCopy = async () => {
    // Copy logic here
    await Clipboard.setStringAsync(textToCopy);
    Toast.show({
      type: "success",
      text1: "Copied to clipboard",
      text2: `${textToCopy} has been copied to your clipboard.`,
    })
  };
  return (
    <View style={styles.wrapper}>
      {/* Icon */}
      <View style={styles.iconBox}>
        <CustomText text="💳" textStyle={[styles.icon]} />
      </View>

      {/* Text Info */}
      <View style={{ flex: 1 }}>
        <CustomText text="Instapay" textStyle={[styles.label]} />
        <CustomText text={textToCopy} textStyle={[styles.value]} />
      </View>

      {/* Actions */}
      <View style={styles.actions}>
        <Pressable onPress={handleCopy}>
          <Copy size={25} color={Colors.gray600} />
        </Pressable>

        {isEditing && (
          <Pressable onPress={() => {}}>
            <CustomText text="Edit" textStyle={[styles.actionText]} />
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default PaymentReceiver;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.gray300,
    borderRadius: 12,
    backgroundColor: Colors.gray100,
    padding: 16,
    marginVertical: 12,
    gap: 12,
  },
  iconBox: {
    width: 32,
    height: 32,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    fontSize: 18,
  },
  label: {
    fontSize: 10,
    color: "#6B7280",
    fontFamily: "SenBold",
    textTransform: "uppercase",
  },
  value: {
    fontSize: 14,
    color: "#111827",
    fontFamily: "SenMedium",
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  actionText: {
    fontSize: 13,
    color: "#3B82F6", // blue-500
    fontFamily: "SenBold",
  },
});

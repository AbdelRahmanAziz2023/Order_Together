import { Colors } from "@/src/constants/colors";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import CustomButton from "./CustomButton";
import CustomText from "./CustomText";
import { QuantityController } from "./QuantityController";

interface CustomizationModalProps {
  visible: boolean;
  itemID: string;
  itemName: string;
  existingNote?: string;
  isEditing?: boolean;
  isCreating?: boolean;
  currentQuantity?: number;
  editNote: React.Dispatch<React.SetStateAction<string>>;
  onConfirm: (quantity: number) => void;
  onCancel: () => void;
}

export const CustomizationModal: React.FC<CustomizationModalProps> = ({
  visible,
  itemID,
  itemName,
  existingNote = "",
  currentQuantity = 1,
  isEditing = false,
  isCreating = false,
  editNote,
  onConfirm,
  onCancel,
}) => {
  const [quantity, setQuantity] = useState(currentQuantity);

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  const handleConfirm = () => {
    editNote(existingNote.trim().replace(/\s+/g, " "));
    onConfirm(quantity);
  };

  const handleClearNote = () => {
    editNote("");
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={onCancel}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardView}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
          >
            <TouchableOpacity activeOpacity={1}>
              <View style={styles.modalContainer}>
                <View style={styles.header}>
                  <CustomText
                    text="Customize Item"
                    textStyle={[styles.title]}
                  />
                  <CustomText text={itemName} textStyle={[styles.itemName]} />
                </View>

                {/* QUANTITY SECTION */}
                <View style={styles.quantitySection}>
                  <QuantityController
                    quantity={quantity}
                    onIncrease={handleIncrease}
                    onDecrease={handleDecrease}
                  />
                </View>
                {/* NOTE INPUT */}
                <View style={styles.content}>
                  <View style={styles.labelRow}>
                    <CustomText
                      text="Special Instructions"
                      textStyle={[styles.label]}
                    />
                    {existingNote.length > 0 && (
                      <TouchableOpacity onPress={handleClearNote}>
                        <CustomText
                          text="Clear"
                          textStyle={[styles.clearButton]}
                        />
                      </TouchableOpacity>
                    )}
                  </View>
                  <TextInput
                    style={styles.textInput}
                    placeholder="e.g. Extra sauce, no onions..."
                    placeholderTextColor={Colors.textMuted}
                    multiline
                    value={existingNote}
                    maxLength={50}
                    onChangeText={(text) => {
                      const normalized = text.replace(/\s{2,}/g, " ");
                      editNote(normalized);
                    }}
                  />
                  <View style={styles.charCountContainer}>
                    <Text style={styles.charCount}>
                      {existingNote.length}/50
                    </Text>
                  </View>
                </View>

                {/* FOOTER */}
                <View style={styles.footer}>
                  <CustomButton
                    title={
                      isEditing
                        ? "Edit Item"
                        : isCreating
                        ? "Create Order"
                        : "Add to Cart"
                    }
                    onPress={handleConfirm}
                    btnStyle={styles.confirmButton}
                  />
                  <TouchableOpacity
                    onPress={onCancel}
                    style={styles.closeContainer}
                  >
                    <CustomText text="Close" textStyle={[styles.closeText]} />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
  },
  modalContainer: {
    backgroundColor: Colors.white,
    borderRadius: 24,
    padding: 30,
    marginHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 12,
    fontFamily: "SenMedium",
    color: Colors.textMuted,
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  itemName: {
    fontSize: 28,
    fontFamily: "SenBold",
    color: Colors.textPrimary,
    marginTop: 5,
  },
  quantitySection: {
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  content: {
    marginVertical: 10,
  },
  labelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    fontFamily: "SenMedium",
    color: Colors.textPrimary,
    letterSpacing: 0.3,
  },
  clearButton: {
    fontSize: 13,
    fontFamily: "SenMedium",
    color: Colors.red,
  },
  textInput: {
    borderWidth: 1.5,
    borderRadius: 14,
    padding: 14,
    minHeight: 100,
    backgroundColor: Colors.gray50,
    borderColor: Colors.border,
    fontFamily: "SenMedium",
    fontSize: 14,
    color: Colors.textPrimary,
    textAlignVertical: "top",
  },
  charCountContainer: {
    alignItems: "flex-end",
    marginTop: 8,
  },
  charCount: {
    fontSize: 12,
    color: Colors.textMuted,
    fontFamily: "SenMedium",
  },
  footer: {
    marginTop: 20,
    gap: 5,
  },
  confirmButton: {
    backgroundColor: Colors.red,
  },
  closeContainer: {
    marginTop: 8,
    alignItems: "center",
    paddingVertical: 5,
  },
  closeText: {
    fontSize: 14,
    color: Colors.gray500,
    textDecorationLine: "underline",
    fontFamily: "SenMedium",
  },
});

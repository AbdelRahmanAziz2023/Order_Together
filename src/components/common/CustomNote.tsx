import CustomText from "@/src/components/common/CustomText";
import { Colors } from "@/src/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

interface CustomNoteProps {
  note: string;
  onClear?: () => void;
}

const CustomNote: React.FC<CustomNoteProps> = ({ note, onClear }) => {
  return (
    <View style={styles.container}>
      <CustomText text={`Note: ${note}`} textStyle={styles.noteText} />
      {onClear && (
        <Pressable onPress={onClear} style={styles.clearButton}>
          <Ionicons name="close-circle" size={20} color={Colors.textMuted} />
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: Colors.mustard,
    marginBottom: 16,
    gap: 8,
  },
  noteText: {
    flex: 1,
    color: Colors.textMuted,
    fontSize: 14,
    fontStyle: 'italic',
  },
  clearButton: {
    padding: 4,
  },
});

export default CustomNote;

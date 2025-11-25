import { Colors } from '@/src/constants/colors';
import React, { useState } from 'react';
import {
    Keyboard,
    KeyboardAvoidingView,
    Modal,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import CustomButton from './CustomButton';

interface CustomizationModalProps {
  visible: boolean;
  itemName: string;
  existingNote?: string;
  onConfirm: (note: string) => void;
  onCancel: () => void;
}

export const CustomizationModal: React.FC<CustomizationModalProps> = ({
  visible,
  itemName,
  existingNote = '',
  onConfirm,
  onCancel,
}) => {
  const [note, setNote] = useState(existingNote);

  React.useEffect(() => {
    if (visible) {
      setNote(existingNote);
    }
  }, [visible, existingNote]);

  const handleConfirm = () => {
    Keyboard.dismiss();
    onConfirm(note);
  };

  const handleCancel = () => {
    Keyboard.dismiss();
    onCancel();
  };

  const handleClearNote = () => {
    setNote('');
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleCancel}
    >
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={handleCancel}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <TouchableOpacity activeOpacity={1} onPress={(e) => e.stopPropagation()}>
              <View style={styles.modalContainer}>
              <View style={styles.header}>
                <Text style={styles.title}>Customize Your Order</Text>
                <Text style={styles.itemName}>{itemName}</Text>
              </View>

              <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.labelRow}>
                  <Text style={styles.label}>Add Special Instructions</Text>
                  {note.length > 0 && (
                    <TouchableOpacity onPress={handleClearNote}>
                      <Text style={styles.clearButton}>Clear</Text>
                    </TouchableOpacity>
                  )}
                </View>
                <TextInput
                  style={styles.textInput}
                  placeholder="E.g., No onions, extra sauce, well done..."
                  placeholderTextColor={Colors.textMuted}
                  value={note}
                  onChangeText={setNote}
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                  maxLength={200}
                />
                <Text style={styles.charCount}>{note.length}/200</Text>
              </ScrollView>

              <View style={styles.footer}>
                {existingNote ? (
                  <CustomButton
                    title="Remove Note"
                    onPress={() => {
                      Keyboard.dismiss();
                      onConfirm('');
                    }}
                    btnStyle={styles.removeButton}
                  />
                ) : null}
                <CustomButton
                  title="Cancel"
                  onPress={handleCancel}
                  btnStyle={styles.cancelButton}
                />
                <CustomButton
                  title="Confirm"
                  onPress={handleConfirm}
                  btnStyle={styles.confirmButton}
                />
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: '7.5%',
  },
  keyboardView: {
    width: '100%',
    maxWidth: 400,
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: 40,
  },
  modalContainer: {
    width: '100%',
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  header: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    paddingBottom: 16,
  },
  title: {
    fontSize: 22,
    fontFamily: 'SenBold',
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  itemName: {
    fontSize: 16,
    fontFamily: 'SenMedium',
    color: Colors.red,
  },
  content: {
    maxHeight: 200,
    marginBottom: 20,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    fontFamily: 'SenMedium',
    color: Colors.textPrimary,
  },
  clearButton: {
    fontSize: 13,
    fontFamily: 'SenMedium',
    color: Colors.red,
  },
  textInput: {
    backgroundColor: Colors.gray50,
    borderRadius: 12,
    padding: 12,
    fontSize: 15,
    fontFamily: 'SenRegular',
    color: Colors.textPrimary,
    minHeight: 100,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  charCount: {
    fontSize: 12,
    fontFamily: 'SenRegular',
    color: Colors.textMuted,
    textAlign: 'right',
    marginTop: 4,
  },
  footer: {
    flexDirection: 'row',
    gap: 12,
    flexWrap: 'wrap',
  },
  removeButton: {
    width: '100%',
    height: 44,
    backgroundColor: Colors.gray200,
    marginBottom: 8,
  },
  cancelButton: {
    flex: 1,
    height: 44,
    backgroundColor: Colors.red,
  },
  confirmButton: {
    flex: 1,
    height: 44,
    backgroundColor: Colors.red,
  },
});

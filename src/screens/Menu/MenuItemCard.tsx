import { CustomizationModal } from "@/src/components/common/CustomizationModal";
import CustomNote from "@/src/components/common/CustomNote";
import CustomText from "@/src/components/common/CustomText";
import { Colors } from "@/src/constants/colors";
import { MenuItemDto } from "@/src/types/restaurant.type";

import React, { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";

interface MenuItemCardProps {
  item: MenuItemDto;
  onPress?: () => void;
}

export const MenuItemCard: React.FC<MenuItemCardProps> = ({
  item,
  onPress,
}) => {
  const [customizationNote, setCustomizationNote] = useState("");

  const [modalVisible, setModalVisible] = useState(false);

  const handleConfirmCustomization = (note: string) => {
    setModalVisible(false);
  };

  const openCustomization = () => {
    setModalVisible(true);
    onPress?.();
  };

  return (
    <>
      <Pressable
        onPress={openCustomization}
        style={({ pressed }) => [
          styles.card,
          styles.customizableBorder,
          pressed && styles.cardPressed,
        ]}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <CustomText text={item.name} textStyle={[styles.name]} />
          <CustomText text={item.description} textStyle={[styles.badgeText]} />
        </View>
        {/* PRICE */}
        <View style={styles.priceRow}>
          <CustomText text={item.price.toFixed(2)} textStyle={[styles.price]} />
          <CustomText text="EGP" textStyle={[styles.currency]} />
        </View>

        {/* CUSTOM NOTE */}
        {customizationNote ? (
          <CustomNote note={customizationNote} onClear={() => {setCustomizationNote("")}} />
        ) : null}
      </Pressable>

      <CustomizationModal
        visible={modalVisible}
        itemID={item.id}
        itemName={item.name}
        existingNote={customizationNote}
        editNote={setCustomizationNote}
        onConfirm={handleConfirmCustomization}
        onCancel={() => setModalVisible(false)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: 18,
    padding: 18,
    marginHorizontal: 16,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },

  cardPressed: {
    transform: [{ scale: 0.97 }],
    opacity: 0.9,
  },

  customizableBorder: {
    borderColor: Colors.mustard,
    borderWidth: 1,
  },

  inactiveCard: {
    opacity: 0.45,
  },

  header: {
    justifyContent: "space-between",
    gap: 4,
    marginBottom: 8,
  },

  name: {
    fontSize: 22,
    fontFamily: "SenBold",
    color: Colors.textPrimary,
  },

  badge: {
    backgroundColor: Colors.gray200,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
  },

  badgeText: {
    fontSize: 11,
    fontFamily: "SenMedium",
    color: Colors.gray600,
  },

  priceRow: {
    flexDirection: "row",
    alignItems: "baseline",
    marginTop: 4,
  },

  price: {
    fontSize: 20,
    fontFamily: "SenBold",
    color: Colors.red,
  },

  currency: {
    fontSize: 13,
    marginLeft: 4,
    fontFamily: "SenMedium",
    color: Colors.gray500,
  },
});

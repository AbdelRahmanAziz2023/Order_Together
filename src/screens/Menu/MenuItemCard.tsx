import { CustomizationModal } from '@/src/components/common/CustomizationModal';
import CustomNote from '@/src/components/common/CustomNote';
import { QuantityController } from '@/src/components/common/QuantityController';
import { Colors } from '@/src/constants/colors';
import { Icons } from '@/src/constants/images';
import { addItem, selectCartItems, updateItemNote, updateItemQuantity } from '@/src/store/slices/cartSlice';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

interface MenuItemCardProps {
  itemID: number;
  name: string;
  price: number;
  allowCustomization: boolean;
  isActive: boolean;
  onPress?: () => void;
}

export const MenuItemCard: React.FC<MenuItemCardProps> = ({
  itemID,
  name,
  price,
  allowCustomization,
  isActive,
  onPress,
}) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  
  // Find this item in the cart
  const cartItem = cartItems.find(item => item.itemID === itemID);
  
  // Derive state from Redux (single source of truth)
  const quantity = cartItem?.quantity || 0;
  const customizationNote = cartItem?.customizationNote || '';
  
  const [modalVisible, setModalVisible] = useState(false);

  const handleAddToCart = () => {
    dispatch(addItem({
      itemID,
      name,
      price,
      allowCustomization,
      customizationNote: '',
    }));
  };

  const handleConfirmCustomization = (note: string) => {
    dispatch(updateItemNote({ itemID, note }));
    setModalVisible(false);
  };

  const handleCancelCustomization = () => {
    setModalVisible(false);
  };

  const handleCardPress = () => {
    if (allowCustomization && isActive) {
      setModalVisible(true);
    } else if (onPress) {
      onPress();
    }
  };

  const handleRemoveNote = () => {
    dispatch(updateItemNote({ itemID, note: '' }));
  };

  const handleIncrease = () => {
    dispatch(updateItemQuantity({ itemID, quantity: quantity + 1 }));
  };

  const handleDecrease = () => {
    const newQuantity = quantity - 1;
    dispatch(updateItemQuantity({ itemID, quantity: Math.max(0, newQuantity) }));
  };

  return (
    <>
      <Pressable
        style={({ pressed }) => [
          styles.card,
          !isActive && styles.inactiveCard,
          pressed && styles.cardPressed,
          allowCustomization && isActive && styles.customizableCard,
        ]}
        onPress={handleCardPress}
        disabled={!isActive}
      >
        {/* Header: Name and Status */}
        <View style={styles.header}>
          <Text style={styles.name} numberOfLines={2}>
            {name}
          </Text>
          {!isActive && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Unavailable</Text>
            </View>
          )}
        </View>

        {/* Main Content: Price and Action Button */}
        <View style={styles.row}>
          <View style={styles.priceContainer}>
            <Text style={styles.currency}>$</Text>
            <Text style={styles.price}>{price.toFixed(2)}</Text>
          </View>

          {quantity === 0 ? (
            <Pressable
              style={({ pressed }) => [
                styles.addButton,
                pressed && styles.addButtonPressed,
              ]}
              onPress={handleAddToCart}
              disabled={!isActive}
            >
              <Icons.plus width={16} height={16} fill={Colors.white} />
            </Pressable>
          ) : (
            <QuantityController
              quantity={quantity}
              onIncrease={handleIncrease}
              onDecrease={handleDecrease}
            />
          )}
        </View>

        {/* Customization Hint */}
        {allowCustomization && !customizationNote && (
          <View style={styles.hint}>
            <Ionicons name="information-circle-outline" size={14} color={Colors.mustard} />
            <Text style={styles.hintText}>Tap to add special instructions</Text>
          </View>
        )}

        {/* Customization Note */}
        {customizationNote && (
          <CustomNote note={customizationNote} onClear={handleRemoveNote} />
        )}
      </Pressable>

      <CustomizationModal
        visible={modalVisible}
        itemName={name}
        existingNote={customizationNote}
        onConfirm={handleConfirmCustomization}
        onCancel={handleCancelCustomization}
      />
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  customizableCard: {
    borderColor: Colors.mustard,
    borderWidth: 1.5,
  },
  inactiveCard: {
    opacity: 0.6,
    backgroundColor: Colors.gray50,
  },
  cardPressed: {
    opacity: 0.7,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
    gap: 8,
  },
  name: {
    flex: 1,
    fontSize: 24,
    fontFamily: 'SenBold',
    color: Colors.textPrimary,
  },
  badge: {
    backgroundColor: Colors.gray200,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeText: {
    fontSize: 10,
    fontFamily: 'SenMedium',
    color: Colors.textMuted,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  currency: {
    fontSize: 16,
    fontFamily: 'SenMedium',
    color: Colors.black,
    marginTop: 2,
  },
  price: {
    fontSize: 16,
    fontFamily: 'SenMedium',
    color: Colors.black,
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.mustard,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  addButtonPressed: {
    opacity: 0.8,
  },
  hint: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 183, 77, 0.1)',
    padding: 10,
    borderRadius: 8,
    gap: 6,
    borderWidth: 1,
    borderColor: 'rgba(255, 183, 77, 0.3)',
  },
  hintText: {
    flex: 1,
    fontSize: 13,
    fontFamily: 'SenMedium',
    color: Colors.mustard,
  },
});
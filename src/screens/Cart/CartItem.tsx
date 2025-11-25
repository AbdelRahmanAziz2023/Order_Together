import CustomNote from "@/src/components/common/CustomNote";
import CustomText from "@/src/components/common/CustomText";
import { Colors } from "@/src/constants/colors";
import { CartItem as CartItemType, removeItem, updateItemNote, updateItemQuantity } from "@/src/store/slices/cartSlice";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { useDispatch } from "react-redux";

interface CartItemProps {
  item: CartItemType;
}

export const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const dispatch = useDispatch();

  const handleIncrease = () => {
    dispatch(updateItemQuantity({ itemID: item.itemID, quantity: item.quantity + 1 }));
  };

  const handleDecrease = () => {
    if (item.quantity > 1) {
      dispatch(updateItemQuantity({ itemID: item.itemID, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.itemID));
    }
  };

  const handleRemove = () => {
    dispatch(removeItem(item.itemID));
  };

  const handleClearNote = () => {
    dispatch(updateItemNote({ itemID: item.itemID, note: '' }));
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <CustomText text={item.name} textStyle={styles.name} />
          <Pressable onPress={handleRemove} style={styles.removeButton}>
            <Ionicons name="trash-outline" size={20} color={Colors.red} />
          </Pressable>
        </View>

        {item.customizationNote && (
          <CustomNote note={item.customizationNote} onClear={handleClearNote} />
        )}

        <View style={styles.footer}>
          <CustomText text={`$${item.price.toFixed(2)}`} textStyle={styles.price} />

          <View style={styles.quantityController}>
            <Pressable
              onPress={handleDecrease}
              style={[styles.quantityButton, item.quantity === 1 && styles.quantityButtonDanger]}
            >
              <Ionicons
                name={item.quantity === 1 ? "trash-outline" : "remove"}
                size={16}
                color={item.quantity === 1 ? Colors.red : Colors.textPrimary}
              />
            </Pressable>
            <CustomText text={item.quantity.toString()} textStyle={styles.quantity} />
            <Pressable onPress={handleIncrease} style={styles.quantityButton}>
              <Ionicons name="add" size={16} color={Colors.textPrimary} />
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  content: {
    padding: 18,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  name: {
    flex: 1,
    marginRight: 12,
    fontSize: 17,
    fontFamily: 'SenBold',
    color: Colors.textPrimary,
  },
  removeButton: {
    padding: 6,
    backgroundColor: Colors.background,
    borderRadius: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
  },
  price: {
    color: Colors.red,
    fontSize: 20,
    fontFamily: 'SenBold',
  },
  quantityController: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    backgroundColor: Colors.background,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: Colors.border,
  },
  quantityButtonDanger: {
    borderColor: Colors.red,
    backgroundColor: Colors.background,
  },
  quantity: {
    minWidth: 24,
    textAlign: 'center',
    fontFamily: 'SenBold',
    fontSize: 16,
    color: Colors.textPrimary,
  },
});

import { Colors } from '@/src/constants/colors';
import { selectCartTotalItems } from '@/src/store/slices/cartSlice';
import { Ionicons } from '@expo/vector-icons';
import { usePathname, useRouter } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { useSelector } from 'react-redux';

export const CartBanner: React.FC = () => {
  const totalItems = useSelector(selectCartTotalItems);
  const router = useRouter();
  const pathname = usePathname();

  // Hide banner if on cart screen, menu screen, or if cart is empty
  if (totalItems === 0 || pathname === '/Cart') {
    return null;
  }

  const handleViewSummary = () => {
    try {
      console.log('CartBanner pressed - navigating to cart');
      router.push('/(home)/Cart' as any);
    } catch (error) {
      console.error('Navigation error:', error);
    }
  };

  return (
    <Pressable
      style={({ pressed }) => [styles.container, pressed && styles.containerPressed]}
      onPress={handleViewSummary}
    >
      <Ionicons name="cart" size={20} color={Colors.white} />
      <Text style={styles.itemsCount}>{totalItems}</Text>
      <Ionicons name="chevron-forward" size={20} color={Colors.white} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 120,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.red,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 50,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
    zIndex: 10,
  },
  containerPressed: {
    opacity: 0.9,
  },
  itemsCount: {
    fontSize: 16,
    fontFamily: 'SenBold',
    color: Colors.white,
  },
});

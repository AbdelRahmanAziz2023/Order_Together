import { Colors } from '@/src/constants/colors';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

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
  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        !isActive && styles.inactiveCard,
        pressed && styles.cardPressed,
      ]}
      onPress={onPress}
      disabled={!isActive}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name} numberOfLines={2}>
            {name}
          </Text>
          {!isActive && (
            <View style={styles.inactiveBadge}>
              <Text style={styles.inactiveBadgeText}>Unavailable</Text>
            </View>
          )}
        </View>

        <View style={styles.footer}>
          <Text style={styles.price}>${price.toFixed(2)}</Text>
          {allowCustomization && (
            <View style={styles.customizableBadge}>
              <Text style={styles.customizableText}>Customizable</Text>
            </View>
          )}
        </View>
      </View>


    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  inactiveCard: {
    opacity: 0.6,
    backgroundColor: Colors.gray50,
  },
  cardPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  name: {
    flex: 1,
    fontSize: 18,
    fontFamily: 'SenBold',
    color: Colors.textPrimary,
    marginRight: 8,
  },
  inactiveBadge: {
    backgroundColor: Colors.gray200,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  inactiveBadgeText: {
    fontSize: 10,
    fontFamily: 'SenMedium',
    color: Colors.textMuted,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 20,
    fontFamily: 'SenBold',
    color: Colors.red,
  },
  customizableBadge: {
    backgroundColor: Colors.mustard,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
  },
  customizableText: {
    fontSize: 11,
    fontFamily: 'SenMedium',
    color: Colors.white,
  },
  idBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: Colors.lightred,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  idText: {
    fontSize: 11,
    fontFamily: 'SenBold',
    color: Colors.white,
  },
});

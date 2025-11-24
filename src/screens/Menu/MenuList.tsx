import { Colors } from '@/src/constants/colors';
import { MenuItem } from '@/src/services/api/Endpoints/RestaurantEndpoints';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { MenuItemCard } from './MenuItemCard';

interface MenuListProps {
  menuItems: MenuItem[];
  onItemPress?: (item: MenuItem) => void;
}

export const MenuList: React.FC<MenuListProps> = ({ menuItems, onItemPress }) => {
  const renderItem = ({ item }: { item: MenuItem }) => (
    <MenuItemCard
      itemID={item.itemID}
      name={item.name}
      price={item.price}
      allowCustomization={item.allowCustomization}
      isActive={item.isActive}
      onPress={() => onItemPress?.(item)}
    />
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No menu items available</Text>
    </View>
  );

  return (
    <FlatList
      data={menuItems}
      renderItem={renderItem}
      keyExtractor={(item) => item.itemID.toString()}
      contentContainerStyle={styles.listContent}
      ListEmptyComponent={renderEmpty}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  listContent: {
    paddingTop: 16,
    paddingBottom: 32,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 64,
  },
  emptyText: {
    fontSize: 16,
    fontFamily: 'SenRegular',
    color: Colors.textMuted,
  },
});

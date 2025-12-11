import CustomEmptyList from '@/src/components/common/CustomEmptyList';
import { Colors } from '@/src/constants/colors';
import { MenuItemDto } from '@/src/types/restaurant.type';
import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { MenuItemCard } from './MenuItemCard';

interface MenuListProps {
  menuItems: MenuItemDto[];
  onItemPress?: (item: MenuItemDto) => void;
}

export const MenuList: React.FC<MenuListProps> = ({ menuItems, onItemPress }) => {
  const renderItem = ({ item }: { item: MenuItemDto }) => (
    <MenuItemCard
     item={item}
      onPress={() => onItemPress?.(item)}
    />
  );

  const renderEmpty = () => (
    <CustomEmptyList title="No menu items" message="No menu items available." />
  );

  return (
    <FlatList
      data={menuItems}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContent}
      ListEmptyComponent={renderEmpty}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  listContent: {
    paddingTop: 16,
    paddingBottom: 110,
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

import { Colors } from '@/src/constants/colors';
import { Restaurant } from '@/src/services/api/Endpoints/RestaurantEndpoints';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { RestaurantCard } from './RestaurantCard';

interface RestaurantListProps {
  restaurants: Restaurant[];
  onRestaurantPress?: (restaurant: Restaurant) => void;
}

export const RestaurantList: React.FC<RestaurantListProps> = ({ 
  restaurants, 
  onRestaurantPress 
}) => {
  const renderItem = ({ item }: { item: Restaurant }) => (
    <RestaurantCard
      id={item.id}
      name={item.name}
      onPress={() => onRestaurantPress?.(item)}
    />
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No restaurants found</Text>
    </View>
  );

  return (
    <FlatList
      data={restaurants}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
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

import { Colors } from '@/src/constants/colors';
import { useGetRestaurantMenuQuery } from '@/src/services/api/Endpoints/RestaurantEndpoints';
import { setRestaurant } from '@/src/store/slices/cartSlice';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect } from 'react';
import { ActivityIndicator, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { MenuList } from './MenuList';

const MenuScreen: React.FC = () => {
  const { restaurantId, restaurantName } = useLocalSearchParams<{
    restaurantId: string;
    restaurantName: string;
  }>();
  const dispatch = useDispatch();

  const { data: menuItems = [], isLoading, isError } = useGetRestaurantMenuQuery(
    Number(restaurantId),
    {
      skip: !restaurantId,
    }
  );

  // Set restaurant info in cart when menu loads
  useEffect(() => {
    if (restaurantId && restaurantName) {
      dispatch(setRestaurant({
        id: Number(restaurantId),
        name: restaurantName,
      }));
    }
  }, [restaurantId, restaurantName, dispatch]);

  const handleMenuItemPress = (item: any) => {
    console.log('Menu item pressed:', item);
    // Navigate to item details or add to cart
  };

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={Colors.red} />
        <Text style={styles.loadingText}>Loading menu...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Failed to load menu. Please try again.</Text>
      </View>
    );
  }

  const activeItems = menuItems.filter(item => item.isActive);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{restaurantName || 'Menu'}</Text>
        <Text style={styles.subtitle}>
          {activeItems.length} item{activeItems.length !== 1 ? 's' : ''} available
        </Text>
      </View>

      <MenuList menuItems={menuItems} onItemPress={handleMenuItemPress} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 4,
  },
  title: {
    fontSize: 28,
    fontFamily: 'SenBold',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'SenRegular',
    color: Colors.textMuted,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    fontFamily: 'SenRegular',
    color: Colors.textMuted,
  },
  errorText: {
    fontSize: 16,
    fontFamily: 'SenRegular',
    color: Colors.red,
    textAlign: 'center',
    paddingHorizontal: 32,
  },
});

export default MenuScreen;
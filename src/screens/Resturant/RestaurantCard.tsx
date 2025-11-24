import { Colors } from '@/src/constants/colors';
import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

interface RestaurantCardProps {
  id: number;
  name: string;
  onPress?: () => void;
}

export const RestaurantCard: React.FC<RestaurantCardProps> = ({ id, name, onPress }) => {
  return (
    <Pressable 
      style={({ pressed }) => [
        styles.card,
        pressed && styles.cardPressed
      ]}
      onPress={onPress}
    >
      <View style={styles.imageContainer}>
        <Image 
          source={require('../../../assets/images/logo-mustard.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>
          {name}
        </Text>
        
        <View style={styles.footer}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>ID: {id}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    overflow: 'hidden',
  },
  cardPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  imageContainer: {
    width: '100%',
    height: 180,
    backgroundColor: Colors.gray200,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  content: {
    padding: 16,
  },
  name: {
    fontSize: 20,
    fontFamily: 'SenBold',
    color: Colors.textPrimary,
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  badge: {
    backgroundColor: Colors.red,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  badgeText: {
    fontSize: 12,
    fontFamily: 'SenMedium',
    color: Colors.gray100,
  },
});

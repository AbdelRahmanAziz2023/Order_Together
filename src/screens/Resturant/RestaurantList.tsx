import CustomEmptyList from "@/src/components/common/CustomEmptyList";
import CustomText from "@/src/components/common/CustomText";
import { Colors } from "@/src/constants/colors";
import { RestaurantDto } from "@/src/types/restaurant.type";
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { RestaurantCard } from "./RestaurantCard";

interface RestaurantListProps {
  restaurants: RestaurantDto[];
  onRestaurantPress?: (restaurant: RestaurantDto) => void;
}

export const RestaurantList: React.FC<RestaurantListProps> = ({
  restaurants,
  onRestaurantPress,
}) => {
  const renderItem = ({ item }: { item: RestaurantDto }) => (
    <RestaurantCard
      
      item={item}
      onPress={() => onRestaurantPress?.(item)}
    />
  );

  const header = () => {
    return (
      <View style={styles.header}>
        <CustomText
          text={`${restaurants.length} restaurants available`}
          textStyle={[styles.subtitle]}
        />
      </View>
    );
  };

  return (
    <FlatList
      data={restaurants}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.listContent}
      ListEmptyComponent={
        <CustomEmptyList
          title="No Restaurants Found"
          message="Sorry, there are no restaurants available at the moment."
        />
      }
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={header}
    />
  );
};

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: 32,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: Colors.gray300,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: "SenRegular",
    color: Colors.textMuted,
  },
});

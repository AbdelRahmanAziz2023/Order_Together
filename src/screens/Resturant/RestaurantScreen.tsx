import CustomError from "@/src/components/common/CustomError";
import RestaurantCardSkeletonList from "@/src/components/skeleton/RestaurantCardSkeletonList";
import { Colors } from "@/src/constants/colors";
import { useGetRestaurantsQuery } from "@/src/services/api/endpoints/restaurantEndpoints";
import { RestaurantDto } from "@/src/types/restaurant.type";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import { RestaurantList } from "./RestaurantList";

const RestaurantScreen: React.FC = () => {
  const router = useRouter();
  const {
    data: restaurants = [],
    isLoading,
    isError,
  } = useGetRestaurantsQuery();

  const handleRestaurantPress = (restaurant: RestaurantDto) => {
    router.push({
      pathname: "/(app)/(home)/Menu",
      params: {
        restaurantShortCode: restaurant.shortCode,
      },
    });
  };

  if (isLoading) return <RestaurantCardSkeletonList />;

  if (isError) return <CustomError
        title="Error"
        message="Failed to load restaurants. Please try again."
      />
    

  return (
    <View style={styles.container}>
        <RestaurantList
          restaurants={restaurants}
          onRestaurantPress={handleRestaurantPress}
        />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingTop: 20,
    paddingBottom: 80,
  },
});

export default RestaurantScreen;

import CustomText from "@/src/components/common/CustomText";
import { Colors } from "@/src/constants/colors";
import { RestaurantDto } from "@/src/types/restaurant.type";
import React from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";

interface RestaurantCardProps {
 item:RestaurantDto;
  onPress?: () => void;
}

export const RestaurantCard: React.FC<RestaurantCardProps> = ({
  item,
  onPress,
}) => {
  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      onPress={onPress}
    >
      <View style={styles.imageContainer}>
        <Image
          source={item.logoUrl ? { uri: item.logoUrl } : require("../../../assets/images/logo-mustard.png")}
          style={styles.logo}
          resizeMode="stretch"
        />
      </View>

      <View style={styles.content}>
        <CustomText text={item.name} textStyle={[styles.name]} />
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
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    overflow: "hidden",
  },
  cardPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  imageContainer: {
    width: "100%",
    height: 180,
    backgroundColor: Colors.gray200,
    justifyContent: "center",
    alignItems: "center",
   
  },
  logo: {
    width: "100%",
    height: "100%",
  },
  content: {
    padding: 16,
  },
  name: {
    fontSize: 20,
    fontFamily: "SenBold",
    color: Colors.textPrimary,
    marginBottom: 12,
  },
});

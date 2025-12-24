import CustomError from "@/src/components/common/CustomError";
import CustomHint from "@/src/components/common/CustomHint";
import CustomText from "@/src/components/common/CustomText";
import MenuItemCardSkeletonList from "@/src/components/skeleton/MenuItemCardSkeletonList";
import { Colors } from "@/src/constants/colors";
import { useGetRestaurantMenuQuery } from "@/src/services/api/endpoints/restaurantEndpoints";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MenuList } from "./MenuList";

const MenuScreen: React.FC = () => {
  const { restaurantShortCode, cartId } = useLocalSearchParams<{
    restaurantShortCode: string;
    cartId: string;
  }>();

  const { data, isLoading, isError } =
    useGetRestaurantMenuQuery(restaurantShortCode);

  const handleMenuItemPress = (item: any) => {
    console.debug("Menu item pressed:", item);
  };

  if (isLoading) {
    return <MenuItemCardSkeletonList />;
  }

  if (isError) {
    return (
      <CustomError
        title="Error"
        message="Failed to load menu. Please try again."
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <CustomText text={data?.name || "Menu"} textStyle={[styles.title]} />
        <CustomText
          text={` ${data?.menuItems.length} item${
            data?.menuItems.length !== 1 ? "s" : ""
          } available`}
        />
        {data?.menuItems.length! > 0 && (
          <CustomHint message="Tap to customize your order" />
        )}
      </View>

      <MenuList
        menuItems={data?.menuItems!}
        restaurantShortCode={restaurantShortCode}
        cartId={cartId}
        onItemPress={handleMenuItemPress}
      />
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.background,
  },
  header: {
    paddingHorizontal: 16,
    paddingBottom: 4,
  },
  title: {
    fontSize: 28,
    fontFamily: "SenBold",
    color: Colors.textPrimary,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: "SenRegular",
    color: Colors.textMuted,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    fontFamily: "SenRegular",
    color: Colors.textMuted,
  },
  errorText: {
    fontSize: 16,
    fontFamily: "SenRegular",
    color: Colors.red,
    textAlign: "center",
    paddingHorizontal: 32,
  },
});

export default MenuScreen;

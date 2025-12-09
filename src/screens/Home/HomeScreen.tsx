import CustomError from "@/src/components/common/CustomError";
import ActiveCartSkeleton from "@/src/components/skeleton/ActiveCartSkeleton";
import { Colors } from "@/src/constants/colors";

import { useGetActiveCartQuery } from "@/src/services/api/endpoints/cartEndpoints";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ActiveCart from "./ActiveCart";
import ActiveCartPlaceholder from "./ActiveCartPlaceholder";
import HomeActions from "./HomeActions";
import HomeHeader from "./HomeHeader";
import PasscodePopup from "./PasscodePopup";
import RecentOrders from "./RecentOrders";

const HomeScreen = () => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);

  const { data, isLoading, isError } = useGetActiveCartQuery();
  const isActiveCart = data ? true : false;

  const showPasscodePopup = () => {
    setIsVisible(true);
  };

  const navigateToRestaurant = () => {
    router.push("/(app)/(home)/Restaurant");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        <PasscodePopup
          isVisible={isVisible}
          onClose={() => setIsVisible(false)}
        />
        <HomeHeader />

        <HomeActions
          onJoin={showPasscodePopup}
          onCreate={navigateToRestaurant}
        />
        {isLoading ? (
          <ActiveCartSkeleton />
        ) : !isError ? (
          <CustomError title="Error" message="Failed to load active cart" />
        ) : isActiveCart ? (
          <ActiveCartPlaceholder />
        ) : (
          <ActiveCart />
        )}

        <RecentOrders />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    padding: 20,
  },
});

export default HomeScreen;

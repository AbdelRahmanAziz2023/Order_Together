import { Colors } from "@/src/constants/colors";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ActiveCart from "./ActiveCart";
import HomeActions from "./HomeActions";
import HomeHeader from "./HomeHeader";
import PasscodePopup from "./PasscodePopup";
import RecentOrders from "./RecentOrders";


const HomeScreen = () => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);

  const showPasscodePopup = () => {
    setIsVisible(true);
  };

  const navigateToRestaurant = () => {
    router.push("/(app)/(home)/Restaurant");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        <PasscodePopup isVisible={isVisible} onClose={() => setIsVisible(false)} />
        <HomeHeader />

        <HomeActions 
          onJoin={showPasscodePopup} 
          onCreate={navigateToRestaurant} 
        />
        <ActiveCart/>

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

import CustomButton from "@/src/components/common/CustomButton";
import { Colors } from "@/src/constants/colors";
import { clearAuth } from "@/src/store/expo-secure-store";
import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MenuSection from "./MenuSection";
import ProfileHeader from "./ProfileHeader";

const ProfileScreen = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await clearAuth();
      router.replace("/(auth)/Login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleOrderHistory = () => {
    router.push("/(app)/(profile)/OrderHistory");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        <ProfileHeader />

        <MenuSection onOrderHistoryPress={handleOrderHistory} />

        <View style={styles.logoutSection}>
          <CustomButton
            title="Logout"
            onPress={handleLogout}
            btnStyle={{ backgroundColor: Colors.red }}
          />
        </View>
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
  },
  logoutSection: {
    marginTop: 30,
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
});

export default ProfileScreen;

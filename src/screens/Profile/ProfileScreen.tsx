import CustomButton from "@/src/components/common/CustomButton";
import { Colors } from "@/src/constants/colors";
import { Icons } from "@/src/constants/images";
import { useLogoutMutation } from "@/src/services/api/endpoints/authEndpoints";
import { clearAuth, getRefreshToken } from "@/src/store/expo-secure-store";
import { clearUser } from "@/src/store/slices/userSlice";
import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import MenuSection from "./MenuSection";
import ProfileHeader from "./ProfileHeader";

const ProfileScreen = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [logout,{isLoading}] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      const refreshToken = await getRefreshToken();
      await logout({ token: refreshToken ?? "" }).unwrap();
      try {
        await clearAuth();
      } catch (e) {
        console.error("clearAuth failed during logout:", e);
      }
      dispatch(clearUser());
      router.replace("/(auth)/Login");
    } catch (error) {
      console.error("Logout error:", error);
      try {
        await clearAuth();
      } catch (e) {
        console.error("clearAuth failed during logout:", e);
      }
      dispatch(clearUser());
      router.replace("/(auth)/Login");
    }
  };

  const handleEditProfile = () => {
    router.push("/(app)/(profile)/EditProfile");
  };
  const handleOrderHistory = () => {
    router.push("/(app)/(home)/OrderHistory");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        <ProfileHeader />

        <MenuSection
          onOrderHistoryPress={handleOrderHistory}
          onEditProfilePress={handleEditProfile}
        />

        <View style={styles.logoutSection}>
          <CustomButton
            title={isLoading ? "Logging out..." : "Logout"}
            onPress={handleLogout}
            Icon={Icons.logout}
            btnStyle={{ backgroundColor: Colors.red, marginTop: 20 }}
            isDisabled={isLoading}
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

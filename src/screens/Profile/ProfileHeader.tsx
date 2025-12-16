import CustomText from "@/src/components/common/CustomText";
import { Colors } from "@/src/constants/colors";
import { Icons } from "@/src/constants/images";
import { RootState } from "@/src/store/store";
import { Image, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

const ProfileHeader = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();

  // ✅ Do NOT depend on redux user
  // const { data, isLoading } = useGetProfileQuery(user?.id!);

  // ✅ Sync RTKQ → Redux
  // useEffect(() => {
  //   if (data) {
  //     dispatch(setUser(data as User));
  //   }
  // }, [data, dispatch]);

  return (
    <View style={styles.profileCard}>
      <View style={styles.avatarContainer}>
        {user?.avatarUrl ? (
          <Image
            source={{ uri: user.avatarUrl }}
            style={{ width: 60, height: 60, borderRadius: 150 }}
          />
        ) : (
          <Icons.user width={60} height={60} stroke={Colors.red} />
        )}
      </View>

      <CustomText
        text={`${user?.firstName ?? ""} ${user?.lastName ?? ""}` || "User"}
        textStyle={[styles.userName]}
      />

      <CustomText text={user?.email ?? "Email"} textStyle={[styles.userEmail]} />
    </View>
  );
};

const styles = StyleSheet.create({
  profileCard: {
    backgroundColor: Colors.white,
    padding: 30,
    alignItems: "center",
    marginTop: 20,
    marginHorizontal: 20,
    borderRadius: 15,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 150,
    borderWidth: 2,
    borderColor: Colors.black,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  userName: {
    fontSize: 22,
    fontFamily: "SenBold",
    color: Colors.textPrimary,
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
});

export default ProfileHeader;

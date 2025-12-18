import CustomText from "@/src/components/common/CustomText";
import { Colors } from "@/src/constants/colors";
import { Icons } from "@/src/constants/images";
import { RootState } from "@/src/store/store";
import { Image, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

const ProfileHeader = () => {
  const dispatch = useDispatch();

  // const { data, isLoading, isSuccess } = useGetProfileQuery();

  // useEffect(() => {
  //   if (isSuccess && data) {
  //     dispatch(setUser(data));
  //   }
  // }, [isSuccess, data, dispatch]);

  const user = useSelector((state: RootState) => state.user.user);

  const fullName =
    user?.firstName || user?.lastName
      ? `${user?.firstName ?? ""} ${user?.lastName ?? ""}`.trim()
      : "User";

  return (
    <View style={styles.profileCard}>
      <View style={styles.avatarContainer}>
        {user?.avatarUrl ? (
          <Image
            source={{ uri: user.avatarUrl }}
            style={styles.avatarImage}
          />
        ) : (
          <Icons.user width={60} height={60} stroke={Colors.red} />
        )}
      </View>

      <CustomText
        text={fullName}
        textStyle={[styles.userName]}
      />

      <CustomText
        text={user?.email ?? "Email"}
        textStyle={[styles.userEmail]}
      />
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
    borderColor: Colors.red,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  avatarImage: {
    width: "100%",
    height: "100%",
    borderRadius: 100,
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

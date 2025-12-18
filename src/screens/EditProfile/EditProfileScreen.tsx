import CustomButton from "@/src/components/common/CustomButton";
import CustomText from "@/src/components/common/CustomText";
import CustomTextField from "@/src/components/common/CustomTextField";
import { Colors } from "@/src/constants/colors";
import { Icons } from "@/src/constants/images";
import useEditProfile from "@/src/hooks/useEditProfile";
import { useRouter } from "expo-router";
import {
    Alert,
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const EditProfileScreen = () => {
  const router = useRouter();
  const {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    image,
    pickImage,
    openCamera,
    removeImage,
    onSave,
    isSaving,
  } = useEditProfile();


  const openAvatarOptions = () => {
    Alert.alert("Profile Image", "Choose an option", [
      { text: "Choose photo", onPress: pickImage },
      { text: "Open camera", onPress: openCamera },
      { text: "Remove photo", onPress: removeImage, style: "destructive" },
      { text: "Cancel", style: "cancel" },
    ]);
  };
  const handleSave = async () => {
    const ok = await onSave();
    if (ok) router.back();
  };

  const Camera = Icons.camera;
  const User = Icons.user;


  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* <CustomText text="Edit Profile" textStyle={[styles.title]} /> */}

        <View style={styles.card}>
          <View>
            <Pressable
              style={styles.avatarContainer}
              onPress={openAvatarOptions}
            >
              {image ? (
                <Image source={{ uri: image }} style={styles.avatar} />
              ) : (
                <User width={80} height={80} stroke={Colors.red} />
              )}
            </Pressable>
            <View style={styles.cameraBadge}>
              <Camera width={16} height={16} />
            </View>
          </View>

          <CustomText text="Tap image to change" textStyle={[styles.hint]} />

          <View style={styles.form}>
            <CustomTextField
              name="First name"
              placeholder="Enter first name"
              value={firstName}
              onChangeText={setFirstName}
            />

            <CustomTextField
              name="Last name"
              placeholder="Enter last name"
              value={lastName}
              onChangeText={setLastName}
            />

            <View style={styles.saveButton}>
              <CustomButton
                title={isSaving? "Saving..." : "Save"}
                onPress={handleSave}
                isDisabled={firstName.trim() === "" || lastName.trim() === "" || isSaving}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  container: {
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontFamily: "SenBold",
    marginBottom: 16,
  },
  card: {
    backgroundColor: Colors.white,
    padding: 24,
    borderRadius: 14,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    alignItems: "center",
    gap: 12,
  },
  avatarContainer: {
    width: 110,
    height: 110,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  avatar: {
    width: "100%",
    height: "100%",
    borderRadius: 999,
  },
  cameraBadge: {
    position: "absolute",
    right: 0,
    bottom: 0,
    backgroundColor: Colors.white,
    padding: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    zIndex: 10,
  },
  hint: {
    fontSize: 12,
    color: Colors.textMuted,
    marginBottom: 6,
  },
  form: {
    width: "100%",
    gap: 14,
    marginTop: 6,
  },
  saveButton: {
    marginTop: 8,
  },
});

export default EditProfileScreen;

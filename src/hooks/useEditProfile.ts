import createFormData from "@/src/helper/createFormData";
import { useUploadImageMutation } from "@/src/services/api/endpoints/mediaEndppoints";
import { useUpdateProfileMutation } from "@/src/services/api/endpoints/profileEndpoints";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../store/slices/userSlice";
import { RootState } from "../store/store";

type UseEditProfileReturn = {
  firstName: string;
  setFirstName: (v: string) => void;
  lastName: string;
  setLastName: (v: string) => void;
  image: string | null;
  pickImage: () => Promise<void>;
  removeImage: () => void;
  onSave: () => Promise<boolean>;
  isSaving: boolean;
};

const useEditProfile = (): UseEditProfileReturn => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [formDataFile, setFormDataFile] = useState<FormData | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const [uploadImage] = useUploadImageMutation();
  const [updateProfile] = useUpdateProfileMutation();

  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();

  useEffect(() => {
    setFirstName(user?.firstName || "");
    setLastName(user?.lastName || "");
    setImage(user?.avatarUrl || null);
  }, []);

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert(
        "Permission Denied",
        "Permission to access camera roll is required!"
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setFormDataFile(createFormData(result.assets[0].uri));
    }
  };

  const removeImage = () => {
    setImage(null);
    setFormDataFile(null);
  };

  const onSave = async () => {
    setIsSaving(true);
    try {
      let avatarUrl = image;

      if (formDataFile) {
        const res = await uploadImage(formDataFile).unwrap();
        avatarUrl = res.url;
      }
      await updateProfile({
        firstName,
        lastName,
        avatarUrl,
      })
        .unwrap()
        .then((res) => {
          dispatch(setUser(res.user));
        });

      Toast.show({
        type: "success",
        text1: "Profile updated",
        text2: "Your profile has been successfully updated.",
      });

      setFormDataFile(null);
      setIsSaving(false);
      return true;
    } catch (error:any) {
      setIsSaving(false);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: `Failed to update profile: ${error.data?.title}`,
      });
      console.error("Failed to update profile:", error);
      return false;
    }
  };

  return {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    image,
    pickImage,
    removeImage,
    onSave,
    isSaving,
  };
};

export default useEditProfile;

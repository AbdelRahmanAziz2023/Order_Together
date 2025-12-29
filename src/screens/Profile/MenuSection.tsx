import { Colors } from "@/src/constants/colors";
import { Icons } from "@/src/constants/images";
import { StyleSheet, View } from "react-native";
import MenuItem from "./MenuItem";

type Props = {
  onOrderHistoryPress: () => void;
  onNotificationsPress?: () => void;
  onEditProfilePress?: () => void;
};

const MenuSection = ({
  onOrderHistoryPress,
  onNotificationsPress,
  onEditProfilePress,
}: Props) => {
  return (
    <View style={styles.menuSection}>
       <MenuItem
        icon={Icons.activeUser}
        title="Edit Profile"
        onPress={onEditProfilePress}
        iconStroke={Colors.textPrimary}
      />
      <MenuItem
        icon={Icons.watch}
        title="Order History"
        onPress={onOrderHistoryPress}
      />
      
     
    </View>
  );
};

const styles = StyleSheet.create({
  menuSection: {
    backgroundColor: Colors.white,
    marginTop: 20,
    marginHorizontal: 20,
    borderRadius: 15,
    overflow: "hidden",
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});

export default MenuSection;

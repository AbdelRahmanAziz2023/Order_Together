import CustomText from "@/src/components/common/CustomText";
import { Colors } from "@/src/constants/colors";
import { StyleSheet, View } from "react-native";


const ActiveCartPlaceholder = () => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <View style={styles.innerContent}>
          <CustomText
            text="🛒 No active cart right now"
            textStyle={[styles.mainMessage]}
          />
          <CustomText
            text="You can create a new order or join an existing one 👆🏻"
            textStyle={[styles.subMessage]}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    marginTop: 20,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  title: {
    fontSize: 24,
    fontFamily: "SenBold",
  },

  container: {
    padding: 20,
    marginVertical: 15,
    borderRadius: 18,
    backgroundColor: Colors.white,
    minHeight: 160,
    justifyContent: "center",
    alignItems: "center",

    shadowColor: Colors.black,
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,

    borderWidth: 3,
    borderColor: Colors.lightred,
  },

  innerContent: {
    alignItems: "center",
    paddingHorizontal: 10,
  },

  mainMessage: {
    fontSize: 18,
    fontFamily: "SenBold",
    color: Colors.black,
    marginBottom: 6,
    textAlign: "center",
  },

  subMessage: {
    fontSize: 14,
    fontFamily: "SenRegular",
    color: Colors.gray600,
    textAlign: "center",
    lineHeight: 20,
  },
});

export default ActiveCartPlaceholder;

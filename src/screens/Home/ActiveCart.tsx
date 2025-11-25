import CustomButton from "@/src/components/common/CustomButton";
import CustomText from "@/src/components/common/CustomText";
import { Colors } from "@/src/constants/colors";
import getStatusBadgeStyle from "@/src/helper/getStatusBadgeStyle";
import { Image, StyleSheet, View } from "react-native";

const ActiveCart = () => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <CustomText text="Active Cart" textStyle={styles.title} />
        <View style={[styles.statusBadge, getStatusBadgeStyle("opened")]}>
          <CustomText text="Opened" textStyle={styles.statusText} />
        </View>
      </View>

      <View style={styles.container}>
        <View style={styles.leftWrapper}>
          <View style={styles.imageContainer}>
            <Image
              source={{
                uri: "https://thumbs.dreamstime.com/b/restaurant-logo-design-idea-chef-hat-fork-graphic-leaf-shape-food-drinks-symbol-concept-cooking-eating-vector-template-173237325.jpg",
              }}
              style={styles.image}
            />
          </View>

          <View style={styles.textGroup}>
            <CustomText text="MacDonald's" textStyle={styles.cartTitle} />
            <CustomText text="Hosted by Saleh" textStyle={styles.hostText} />
            <CustomText text="Participants: 3" textStyle={styles.hostText} />
          </View>
        </View>

        <View style={styles.rightWrapper}>
          <CustomText text="Your Total" textStyle={styles.totalLabel} />
          <CustomText text="100 EGP" textStyle={styles.totalValue} />

          <CustomButton
            title="Go To Cart →"
            btnStyle={styles.btnStyle}
            textStyle={styles.btnText}
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
    // paddingHorizontal: 20,
    // paddingVertical: 10,
  },
  title: {
    fontSize: 24,
    fontFamily: "SenBold",
  },
  container: {
    flexDirection: "row",
    padding: 10,
    marginVertical: 15,
    borderRadius: 18,
    backgroundColor: Colors.red,
    minHeight: 140,
    alignItems: "center",

    shadowColor: Colors.black,
    shadowOpacity: 0.18,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 8,

    borderWidth: 5,
    borderColor: Colors.lightred,
  },

  leftWrapper: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: 10,
  },

  imageContainer: {
    width: 65,
    height: 65,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: Colors.white,
    overflow: "hidden",
  },

  image: {
    width: "100%",
    height: "100%",
  },

  textGroup: {
    flexShrink: 1,
    gap: 4,
  },

  cartTitle: {
    color: Colors.white,
    fontSize: 20,
    fontFamily: "SenBold",
  },

  hostText: {
    color: Colors.gray200,
    fontSize: 13,
  },

  rightWrapper: {
    alignItems: "center",
    justifyContent: "center",

    gap: 5,
    width: 110,
  },

  totalLabel: {
    color: Colors.white,
    fontSize: 12,
  },

  totalValue: {
    color: Colors.white,
    fontSize: 20,
    fontFamily: "SenBold",
  },

  btnStyle: {
    paddingHorizontal: 5,
    backgroundColor: Colors.white,
    borderRadius: 10,
    minWidth: 110,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: Colors.mustard,
    shadowOpacity: 0.15,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },

  btnText: {
    color: Colors.red,
    fontSize: 14,
    fontFamily: "SenBold",
  },
  statusBadge: {
    borderRadius: 50,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: "#FF6B6B", // fallback if getStatusBadgeStyle fails
  },
  statusText: {
    color: Colors.white,
    fontSize: 13,
    fontFamily: "SenBold",
  },
});

export default ActiveCart;

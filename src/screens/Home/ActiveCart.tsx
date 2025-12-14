import CustomButton from "@/src/components/common/CustomButton";
import CustomText from "@/src/components/common/CustomText";
import { Colors } from "@/src/constants/colors";
import getStatusBadgeStyle from "@/src/helper/getStatusBadgeStyle";
import { ActiveCartResponse } from "@/src/types/cart.type";
import { useRouter } from "expo-router";
import { Image, StyleSheet, View } from "react-native";

interface ActiveCartProps {
  cartData?: ActiveCartResponse;
}

const ActiveCart: React.FC<ActiveCartProps> = ({ cartData }) => {
  const router = useRouter();

  const handleGoToCart = () => {
    router.push({
      pathname: "/(app)/(home)/OrderDetails",
      params: { cartId: cartData?.cartId ?? "" },
    });
  };

  const cartStatus = cartData?.isLocked ? "Locked" : "Open";

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <CustomText text="Active Cart" textStyle={[styles.title]} />
        <View style={[styles.statusBadge, getStatusBadgeStyle(cartStatus)]}>
          <CustomText text={cartStatus} textStyle={[styles.statusText]} />
        </View>
      </View>

      <View style={styles.container}>
        <View style={styles.leftWrapper}>
          <View style={styles.imageContainer}>
            <Image
              source={
                cartData?.restaurantLogoUrl
                  ? {
                      uri: cartData?.restaurantLogoUrl,
                    }
                  : require("../../../assets/images/logo-mustard.png")
              }
              style={styles.image}
            />
          </View>

          <View style={styles.textGroup}>
            <CustomText
              text={cartData?.restaurantName ?? "Restaurant Name"}
              textStyle={[styles.cartTitle]}
            />
            <CustomText
              text={`Hosted by ${cartData?.hostName}`}
              textStyle={[styles.hostText]}
            />
            <CustomText
              text={`Participants: ${cartData?.participantCount}`}
              textStyle={[styles.hostText]}
            />
          </View>
        </View>

        <View style={styles.rightWrapper}>
          <CustomText text="Your Total" textStyle={[styles.totalLabel]} />
          <CustomText
            text={`${cartData?.personalSubTotal} EGP`}
            textStyle={[styles.totalValue]}
          />

          <CustomButton
            title="Go To Cart →"
            btnStyle={styles.btnStyle}
            textStyle={styles.btnText}
            onPress={handleGoToCart}
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
    backgroundColor: Colors.white,
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

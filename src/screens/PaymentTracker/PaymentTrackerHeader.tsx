import CustomText from "@/src/components/common/CustomText";
import { Colors } from "@/src/constants/colors";
import React from "react";
import { StyleSheet, View } from "react-native";

interface Props {
  restaurantName: string;
  orderDate: string;
  orderTotal: number;
  imageEmoji?: string;
}

const PaymentTrackerHeader = ({
  restaurantName,
  orderDate,
  orderTotal,
  imageEmoji = "💰",
}: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <CustomText text={imageEmoji} textStyle={[styles.image]} />
      </View>

      <CustomText text={restaurantName} textStyle={[styles.title]} />

      <View style={styles.infoContainer}>
        <CustomText text={orderDate} textStyle={[styles.date]} />
        <CustomText text={`${orderTotal} EGP`} textStyle={[styles.price]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: "100%",
    backgroundColor: Colors.white,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  imageContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.red100,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  image: {
    fontSize: 24,
  },
  title: {
    fontSize: 22,
    fontFamily: "SenExtraBold",
    marginBottom: 6,
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  date: {
    fontSize: 14,
    fontFamily: "SenRegular",
    color: Colors.gray500,
  },
  price: {
    fontSize: 16,
    fontFamily: "SenBold",
    color: Colors.black,
  },
});

export default PaymentTrackerHeader;

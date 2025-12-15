import { Colors } from "@/src/constants/colors";
import { getPaidStatusStyle } from "@/src/helper/getPaidStausStyle";
import { getPaymentStatusStyle } from "@/src/helper/getPaymentStatusStyle";
import { getUserStatusStyle } from "@/src/helper/getUserStatusStyle";
import { OrderHistoryItem } from "@/src/types/order.type";
import { useRouter } from "expo-router";
import { Image, Pressable, StyleSheet, View } from "react-native";
import CustomText from "../common/CustomText";

type Props={
  item: OrderHistoryItem;
}

const OrderItem = ({ item }: Props) => {
  const router = useRouter();

  


  const onPress = () => {
    router.push({
      pathname: item.isHost && item.status === "PENDING" ? "/(app)/(home)/PaymentTracker" : "/(app)/(home)/Receipt",
      params: { orderId: item.orderId, status: item.status },
    });
  };

  // Host uses PaymentStatus, others use PaidStatus
  const statusBadgeStyles = item.isHost
    ? getPaymentStatusStyle(item.status)
    : getPaidStatusStyle(item.status);

    const date = new Date(item.completedAt);
    const formattedDate = date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  return (
    <Pressable style={({ pressed }) => [styles.orderCard, pressed && styles.itemPressed]} onPress={onPress}>
      {/* Header with image + status */}
      <View style={styles.headerRow}>
        <View style={styles.imageContainer}>
          <Image source={item.restaurantLogoUrl ?{ uri: item.restaurantLogoUrl }:require("../../../assets/images/logo-mustard.png")} style={styles.image} />
        </View>

        <View style={[styles.statusBadge, statusBadgeStyles]}>
          <CustomText text={item.status} textStyle={[styles.statusText, statusBadgeStyles ]} />
        </View>
      </View>

      {/* Restaurant Name */}
      <CustomText text={item.restaurantName} textStyle={[styles.restaurantName]} />

      {/* Host Note OR Price */}
      <View style={{ flexDirection: "row", justifyContent: "space-between" }} >
        <View style={[styles.statusBadge, getUserStatusStyle(item.isHost?"Host":"Participant")]}>
          <CustomText text={item.isHost?"Host":"Participant"} textStyle={[styles.statusText, getUserStatusStyle(item.isHost?"Host":"Participant") ]} />
        </View>
        <CustomText text={`${item.myTotal} EGP`} textStyle={[styles.orderTotal]} />
      </View>
      {/* Order date */}
      <CustomText
        text={`Placed on: ${formattedDate}`}
        textStyle={[styles.orderDate]}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  orderCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  imageContainer: {
    width: 65,
    height: 65,
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: Colors.lightred,
  },

  image: { width: "100%", height: "100%" },

  statusBadge: {
    borderRadius: 50,
    paddingVertical: 6,
    paddingHorizontal: 12,
    justifyContent: "center",
    height: 32,
    borderWidth: 1,
  },

  statusText: {
    color: Colors.white,
    fontSize: 13,
    fontFamily: "SenBold",
  },

  restaurantName: {
    fontSize: 22,
    fontFamily: "SenBold",
    color: "#222",
    marginBottom: 6,
  },

  orderTotal: {
    color: "#444",
    fontFamily: "SenBold",
    marginBottom: 4,
  },
   itemPressed: {
    transform: [{ scale: 0.97 }],
    opacity: 0.9,
  },
  orderDate: {
    paddingTop: 10,
    fontSize: 13,
    color: "#999",
  },
});

export default OrderItem;

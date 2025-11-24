import { Colors } from "@/src/constants/colors";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";
import getStatusBadgeStyle from "../../helper/getStatusBadgeStyle";
import CustomText from "../common/CustomText";

type Props = {
  item: any;
};

const OrderItem = ({ item }: Props) => {
  const router = useRouter();
  const onPress = () => {
    router.push({
      pathname: "/(app)/(home)/OrderDetails",
      params: { orderId: "" },
    });
  };
  return (
    <Pressable style={styles.orderCard} onPress={onPress}>
      <View style={styles.headerRow}>
        <CustomText text={"#3fd34"} textStyle={styles.orderId} />
        <View style={[styles.statusBadge, getStatusBadgeStyle("opened")]}>
          <CustomText text="Opened" textStyle={styles.statusText} />
        </View>
      </View>
      <CustomText text={`نعمه`} textStyle={styles.restaurantName} />
      <CustomText text={`CreatedBy: Saleh`} textStyle={styles.orderTotal} />
      <CustomText text={`Participants: 3`} textStyle={styles.orderTotal} />
      <View style={styles.divider} />
      <CustomText
        text={`Placed on : 10/10/2023 `}
        textStyle={styles.orderDate}
      />
    </Pressable>
  );
};
const styles = StyleSheet.create({
  orderCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 5,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  orderId: {
    fontWeight: "700",
    fontSize: 16,
    color: "#1E1E1E",
    letterSpacing: 0.5,
  },
  restaurantName: {
    fontSize: 22,
    fontFamily: "SenBold",
    color: "#222",
    marginBottom: 5,
  },
  orderTotal: {
    color: "#444",
    fontWeight: "500",
    marginBottom: 4,
  },
  orderAddress: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
    lineHeight: 20,
  },
  divider: {
    height: 1,
    backgroundColor: "#E5E5E5",
    marginVertical: 12,
  },
  orderDate: {
    fontSize: 13,
    color: "#999",
    fontWeight: "400",
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
  emptyText: {
    textAlign: "center",
    color: "#AAA",
    fontSize: 14,
    marginTop: 30,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: "SenBold",
    color: "#111",
  },
});

export default OrderItem;

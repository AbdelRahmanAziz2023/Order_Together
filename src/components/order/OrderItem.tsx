import { Colors } from "@/src/constants/colors";
import { getPaidStatusStyle } from "@/src/helper/getPaidStausStyle";
import { getPaymentStatusStyle } from "@/src/helper/getPaymentStatusStyle";
import { useRouter } from "expo-router";
import { Image, Pressable, StyleSheet, View } from "react-native";
import CustomText from "../common/CustomText";

type Props = {
  item: any;
};

const OrderItem = ({ item }: Props) => {
  const router = useRouter();
  const isHost=false;
  const onPress = () => {
    router.push({
      pathname: "/(app)/(home)/OrderDetails",
      params: { orderId: " "},
    });
  };

  const status= isHost?"Completed":"Unpaid";

  const statusBadge = !isHost?getPaidStatusStyle(status):getPaymentStatusStyle(status);

  return (
    <Pressable style={styles.orderCard} onPress={onPress}>
      <View style={styles.headerRow}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: "https://thumbs.dreamstime.com/b/restaurant-logo-design-idea-chef-hat-fork-graphic-leaf-shape-food-drinks-symbol-concept-cooking-eating-vector-template-173237325.jpg",
            }}
            style={styles.image}
          />
        </View>
        <View style={[styles.statusBadge, statusBadge]}>
          <CustomText text={status} textStyle={statusBadge} />
        </View>
      </View>
      <CustomText text={`Pizza Hut`} textStyle={styles.restaurantName} />

      { isHost&&<CustomText text={`Hosted by you `} textStyle={styles.orderTotal} />}
      { !isHost&&<CustomText text={`60.00 EGP`} textStyle={styles.orderTotal} />}
     
      <CustomText
        text={`Placed on: 10/10/2023`}
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
  
    marginBottom: 12,
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
    height: 32,
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
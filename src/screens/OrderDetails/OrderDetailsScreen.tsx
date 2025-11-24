import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import DeliveryFeePopup from "./DeliveryFeePopup";
import OrderActions from "./OrderActions";
import OrderHeader from "./OrderHeader";
import OrderList from "./OrderList";
import OrderTotals from "./OrderTotals";

const dummyOrders = [
  {
    name: "Slaeh Salem",
    items: [
      { label: "1x طعمية", price: 11.5 },
      { label: "1x صوابع عادي", price: 15.5 },
    ],
  },
  {
    name: "mahmoud osama",
    items: [{ label: "1x صوابع كانتشب", price: 18.5 }],
  },
  {
    name: "Abdelrahman Aziz (You)",
    isYou: true,
    items: [{ label: "4x طعمية ع فول", price: 15.5 }],
  },
];

const OrderDetailsScreen = () => {
  // -------------------
  // ORDER STATUS STATE,, will handle it after backend
  // -------------------
  const [status, setStatus] = React.useState("locked");
  // placed | locked | opened

  const isPlaced = status === "placed";
  const isLocked = status === "locked";
  const isOpened = status === "opened";
  const isCreator = true;

  // -------------------
  // DELIVERY FEE POPUP,, still working on it
  // -------------------
  const [deliveryFee, setDeliveryFee] = React.useState("0");
  const [deliveryPopupVisible, setDeliveryPopupVisible] = React.useState(false);

  const subtotal = dummyOrders
    .flatMap((o) => o.items)
    .reduce((sum, item) => sum + item.price, 0);

  return (
    <>
      <DeliveryFeePopup
        visible={deliveryPopupVisible}
        fee={deliveryFee}
        onClose={() => setDeliveryPopupVisible(false)}
        onConfirm={(val) => {
          setDeliveryFee(val);
          setDeliveryPopupVisible(false);
        }}
      />
      <ScrollView style={styles.container}>
        <View style={styles.card}>
          <OrderHeader />
          <OrderList orders={dummyOrders} isOpened={isOpened} />
          <OrderTotals subtotal={subtotal} />

          <OrderActions
            isOpened={isOpened}
            isLocked={isLocked}
            isPlaced={isPlaced}
            isCreator={isCreator}
            onCheckoutPress={() => setDeliveryPopupVisible(true)}
            onChangeStatus={setStatus}
          />
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: "#F5F6FA" },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 150,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 5,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
});

export default OrderDetailsScreen;

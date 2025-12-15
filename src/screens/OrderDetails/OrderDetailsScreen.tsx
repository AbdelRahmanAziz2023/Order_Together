import CustomHint from "@/src/components/common/CustomHint";
import CustomText from "@/src/components/common/CustomText";
import { Colors } from "@/src/constants/colors";
import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import DeliveryPaymentSection from "./DeliveryPaymentSection";
import MembersRow from "./MembersRow";
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
  const [status, setStatus] = React.useState("Open");

  // keep orders in local state so participant can "leave" in demo
  const [ordersState, setOrdersState] = useState(dummyOrders);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [paymentInstapay, setPaymentInstapay] = useState("");
  const [isHost, setIsHost] = useState(true);

  const isLocked = status === "Locked";
  const isOpened = status === "Open";

  

  const subtotal = ordersState
    .flatMap((o) => o.items)
    .reduce((sum, item) => sum + item.price, 0);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        {/* Order header */}
        <OrderHeader status={status} />

        {/* members row */}
        <MembersRow
          status={status}
          setStatus={setStatus}
          isHost={isHost}
          membersCount={ordersState.length}
        />

        {/* Order list of participants */}
        <OrderList
          orders={ordersState}
          {...({ isOpened, isLocked, isHost } as any)}
        />

        {/* Inputs for Host when lock */}
        {isLocked && isHost && (
          <DeliveryPaymentSection
            deliveryFee={deliveryFee}
            setDeliveryFee={setDeliveryFee}
            setPaymentInstapay={setPaymentInstapay}
          />
        )}

        {/* Order total fee */}
        <OrderTotals deliveryFee={deliveryFee} subtotal={subtotal} />

        {/* Hint to participant */}
        {!isHost && (
          <CustomHint
            message={
              isOpened
                ? "Waiting for Host to lock order..."
                : "Host is finalizing the order..."
            }
          />
        )}

        <Pressable onPress={() => { setIsHost(!isHost)}} style={{ marginVertical: 20 ,borderWidth:1,borderColor:Colors.red,padding:10,borderRadius:8,alignItems:'center'}}>
          <CustomText text="'Toggle' isHost true/false, press for test" textStyle={[{color:Colors.red}]} />
        </Pressable>

        {/* Actoins Buttons */}
        <OrderActions
          isOpened={isOpened}
          isLocked={isLocked}
          isCreator={isHost}
          onChangeStatus={setStatus}
        />
      </View>
    </ScrollView>
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
  membersRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
});

export default OrderDetailsScreen;

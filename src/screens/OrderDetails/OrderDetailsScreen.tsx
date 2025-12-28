import CustomHint from "@/src/components/common/CustomHint";
import { Colors } from "@/src/constants/colors";
import { RootState } from "@/src/store/store";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import { useCartDetailsLogic } from "../../hooks/useCartDetailsLogic";
import DeliveryPaymentSection from "./DeliveryPaymentSection";
import MembersRow from "./MembersRow";
import OrderActions from "./OrderActions";
import OrderHeader from "./OrderHeader";
import OrderList from "./OrderList";
import OrdersByItem from "./OrdersByItem";
import OrderTotals from "./OrderTotals";
import ShowType from "./ShowType";

const OrderDetailsScreen = () => {
  const {
    cartState,
    deliveryFee,
    setDeliveryFee,
    setPaymentInstapay,
    showDataPerItem,
    setShowDataPerItem,
    isHost,
    isSpectator,
    subtotal,
    onPlaceOrder,
    onAddItem,
    onLockCart,
  } = useCartDetailsLogic();

  const isLocked = useSelector((state: RootState) => state.cart.isLocked);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        {/* Order header */}
        <OrderHeader inviteCode={cartState?.cartSummary?.joinCode} />

        {/* Hint for inspector */}
        {!isHost && isSpectator && (
          <CustomHint
            Color={!isLocked ? Colors.success : Colors.red}
            style={
              !isLocked
                ? {
                    backgroundColor: Colors.green100,
                    borderColor: Colors.success,
                  }
                : { backgroundColor: Colors.red100, borderColor: Colors.red }
            }
            message={
              !isLocked
                ? "You are an inspector, add item to join"
                : "This cart is locked, you so late"
            }
          />
        )}
        {/* members row */}
        <MembersRow
          isItems={showDataPerItem}
          isHost={isHost}
          isSpectator={isSpectator}
          cartId={cartState?.cartSummary?.cartId ?? ""}
          membersCount={
            showDataPerItem
              ? cartState?.cartSummary?.items?.length ?? 0
              : cartState?.cartSummary?.users?.length ?? 0
          }
        />

        {/* Show by item or by participant */}
        <ShowType
          showDataPerItem={showDataPerItem}
          onByItemPress={() => setShowDataPerItem(true)}
          onByParticipantPress={() => setShowDataPerItem(false)}
        />

        {/* Orders aggregated by item (uses same endpoint data). Toggle between item/participant */}
        {showDataPerItem ? (
          <OrdersByItem cartSummary={cartState?.cartSummary} />
        ) : (
          <OrderList
            orders={cartState?.cartSummary?.users! ?? []}
            cartID={cartState?.cartSummary?.cartId!}
          />
        )}
        {/* Inputs for Host when lock */}
        {isLocked && isHost && (
          <DeliveryPaymentSection
            deliveryFee={deliveryFee}
            setDeliveryFee={setDeliveryFee}
            setPaymentInstapay={setPaymentInstapay}
            membersCount={cartState?.cartSummary?.users?.length ?? 0}
          />
        )}

        {/* Order total fee */}
        <OrderTotals deliveryFee={deliveryFee} subtotal={subtotal} />

        {/* Hint to participant */}
        {!isHost && !isSpectator && (
          <CustomHint
            message={
              !isLocked
                ? "Waiting for Host to lock order..."
                : "Host is finalizing the order..."
            }
          />
        )}

        {/* Actoins Buttons */}
        <OrderActions
          isLocked={isLocked}
          isHost={isHost}
          onPlaceOrder={onPlaceOrder}
          onAddItem={onAddItem}
          onLockCart={() => {
            onLockCart();
          }}
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

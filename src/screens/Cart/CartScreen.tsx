import CustomButton from "@/src/components/common/CustomButton";
import CustomText from "@/src/components/common/CustomText";
import { Colors } from "@/src/constants/colors";
import { selectCartItems, selectCartRestaurant, selectCartTotalItems, selectCartTotalPrice } from "@/src/store/slices/cartSlice";
import { useRouter } from "expo-router";
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { CartItem } from "./CartItem";
import { EmptyCart } from "./EmptyCart";

const CartScreen: React.FC = () => {
  const router = useRouter();
  const cartItems = useSelector(selectCartItems);
  const totalItems = useSelector(selectCartTotalItems);
  const totalPrice = useSelector(selectCartTotalPrice);
  const restaurant = useSelector(selectCartRestaurant);


  const handleCheckout = () => {
    // TODO: Navigate to checkout screen
    console.log('Navigate to checkout');
  };

  const handleAddMoreItems = () => {
    if (restaurant?.id) {
      router.push({
        pathname: '/(app)/(home)/Menu',
        params: { restaurantId: restaurant.id.toString() }
      });
    } else {
      router.back();
    }
  };

  const renderFooter = () => (
    <View style={styles.footer}>
      <View style={styles.summaryRow}>
        <CustomText text={`Subtotal (${totalItems} items)`} textStyle={styles.summaryLabel} />
        <CustomText text={`$${totalPrice.toFixed(2)}`} textStyle={styles.summaryPrice} />
      </View>

      <View style={styles.buttonContainer}>
        <CustomButton
          title="Add More Items"
          onPress={handleAddMoreItems}
          btnStyle={styles.cartButton}
        />
        <CustomButton
          title="Checkout"
          onPress={handleCheckout}
          btnStyle={styles.cartButton}
        />
      </View>
    </View>
  );

  if (totalItems === 0) {
    return <EmptyCart onAddItems={handleAddMoreItems} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.itemID.toString()}
        renderItem={({ item }) => <CartItem item={item} />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={renderFooter}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  clearText: {
    color: Colors.red,
  },
  listContent: {
    padding: 20,
  },
  footer: {
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 24,
    marginTop: 12,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  summaryLabel: {
    color: Colors.textSecondary,
    fontSize: 16,
    fontFamily: 'SenMedium',
  },
  summaryPrice: {
    color: Colors.red,
    fontSize: 24,
    fontFamily: 'SenBold',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  cartButton: {
    flex: 1,
    height: 40,
  }
});

export default CartScreen;

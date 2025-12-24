import { useGetCartStateMutation } from "@/src/services/api/endpoints/cartEndpoints";
import { usePlaceOrderMutation } from "@/src/services/api/endpoints/orderEndpoints";
import { CartStateResponse } from "@/src/types/cart.type";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useMemo, useRef, useState } from "react";
import Toast from "react-native-toast-message";

export function useCartDetailsLogic() {
  const { cartId, restaurantShortCode } = useLocalSearchParams<{
    cartId: string;
    restaurantShortCode: string;
  }>();

  const [cartState, setCartState] = useState<CartStateResponse | null>(null);
  const [getCartState] = useGetCartStateMutation();
  const [placeOrder] = usePlaceOrderMutation();
  const [hostOverride, setHostOverride] = useState<boolean | null>(null); // debug toggle

  // fetch + poll
  const mounted = useRef(true);
  useEffect(() => {
    if (!restaurantShortCode || !cartId) return;

    mounted.current = true;

    const fetchCartState = async () => {
      try {
        const res = await getCartState({
          cartId: cartId ?? null,
          restaurantShortCode: restaurantShortCode,
        }).unwrap();

        if (!mounted.current) return;
        setCartState(res);
      } catch {
        if (!mounted.current) return;
        setCartState(null);
      }
    };

    // initial fetch
    fetchCartState();

    // poll
    const intervalId = setInterval(() => {
      fetchCartState();
    }, 50000);

    return () => {
      mounted.current = false;
      clearInterval(intervalId);
    };
  }, [restaurantShortCode, cartId, getCartState]);

  // status
  const [status, setStatus] = useState<string>("Open");
  useEffect(() => {
    if (!cartState?.cartSummary) return;
    setStatus(cartState.cartSummary.isLocked ? "Locked" : "Open");
  }, [cartState]);

  // local UI state
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [paymentInstapay, setPaymentInstapay] = useState("");
  const [showDataPerItem, setShowDataPerItem] = useState(false);

  // roles
  const derivedIsHost = cartState?.mode === "HOST";
  const derivedIsInspector = cartState?.mode === "SPECTOR";
  const isHost = hostOverride ?? derivedIsHost;
  const isInspector = derivedIsInspector;

  const subtotal = useMemo(() => {
    if (!cartState?.cartSummary) return 0;
    const summary = cartState.cartSummary;

    if (summary.users?.length) {
      return summary.users.reduce(
        (s, u) =>
          s +
          (u.subtotal ??
            u.items.reduce(
              (si: number, it: any) => si + it.price * (it.qty ?? 1),
              0
            )),
        0
      );
    }

    return (
      summary.items?.reduce((s, it: any) => s + it.price * (it.qty ?? 1), 0) ??
      0
    );
  }, [cartState]);

  const isLocked = status === "Locked";
  const router = useRouter();

  const onPlaceOrder = async () => {
    try {
      const res = await placeOrder({
        cartId: cartState?.cartSummary?.cartId!,
        paymentInstructions: paymentInstapay,
        deliveryFee: deliveryFee,
      }).unwrap();
      router.replace({
        pathname: "/(app)/(home)/OrderPlaced",
        params: { orderId: res.id, status: res.status },
      });
    } catch {
      Toast.show({
        type: "error",
        text1: "Error placing order",
        text2: "Please try again",
      });
    }
  };

  const onAddItem = () => {
    router.push({
      pathname: "/(app)/(home)/Menu",
      params: {
        cartId: cartState?.cartSummary?.cartId,
        restaurantShortCode: cartState?.cartSummary?.restaurantShortCode,
      },
    });
  };

  return {
    cartState,
    hostOverride,
    setHostOverride,
    status,
    setStatus,
    deliveryFee,
    setDeliveryFee,
    paymentInstapay,
    setPaymentInstapay,
    showDataPerItem,
    setShowDataPerItem,
    isHost,
    isInspector,
    subtotal,
    isLocked,
    onPlaceOrder,
    onAddItem,
  } as const;
}

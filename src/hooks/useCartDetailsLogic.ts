import {
  useGetCartStateMutation,
  useLockCartMutation,
} from "@/src/services/api/endpoints/cartEndpoints";
import { usePlaceOrderMutation } from "@/src/services/api/endpoints/orderEndpoints";
import { useAppDispatch } from "@/src/store/hooks";
import { CartStateResponse } from "@/src/types/cart.type";
import { onCartRefresh } from "@/src/utils/cartStateRefresh";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useMemo, useRef, useState } from "react";
import Toast from "react-native-toast-message";
import { toggleCartState } from "../store/slices/cartSlice";

export function useCartDetailsLogic() {
  const { cartId, restaurantShortCode } = useLocalSearchParams<{
    cartId: string;
    restaurantShortCode: string;
  }>();

  const [cartState, setCartState] = useState<CartStateResponse | null>(null);
  const [getCartState] = useGetCartStateMutation();
  const [placeOrder] = usePlaceOrderMutation();
  const [lockCart] = useLockCartMutation();

  // fetch + poll
  const mounted = useRef(true);
  const initialFetchDone = useRef(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    if (!restaurantShortCode || !cartId) return;

    mounted.current = true;

    const fetchCartState = async () => {
      // show skeleton only for the very first fetch
      if (!initialFetchDone.current) setIsInitialLoading(true);

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
      } finally {
        if (!initialFetchDone.current) {
          initialFetchDone.current = true;
          setIsInitialLoading(false);
        }
      }
    };

    // initial fetch
    fetchCartState();

    // poll (every 10s)
    const intervalId = setInterval(() => {
      fetchCartState();
    }, 10000);

    // listen to manual refresh events
    const unsub = onCartRefresh(() => {
      // best-effort immediate refresh
      (async () => {
        try {
          const res = await getCartState({
            cartId: cartId ?? null,
            restaurantShortCode: restaurantShortCode,
          }).unwrap();

          if (!mounted.current) return;
          setCartState(res);
        } catch {
          // ignore – polling will sync later
        }
      })();
    });

    return () => {
      mounted.current = false;
      clearInterval(intervalId);
      unsub();
    };
  }, [restaurantShortCode, cartId, getCartState]);

  const router = useRouter();
  const dispatch = useAppDispatch();

  // status
  useEffect(() => {
    if (!cartState?.cartSummary) return;
    dispatch(toggleCartState(cartState.cartSummary.isLocked));
  }, [cartState, dispatch]);

  // local UI state
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [paymentInstapay, setPaymentInstapay] = useState("");
  const [showDataPerItem, setShowDataPerItem] = useState(false);

  // roles
  const derivedIsHost = cartState?.mode === "HOST";
  const derivedisSpectator = cartState?.mode === "SPECTATOR";
  const isHost = derivedIsHost;
  const isSpectator = derivedisSpectator;

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

  const onLockCart = async () => {
    try {
      await lockCart(cartState?.cartSummary?.cartId!).unwrap();

      // update local cart lock
      dispatch(toggleCartState(true));

      Toast.show({
        type: "success",
        text1: "You locked the cart",
      });
    } catch {
      Toast.show({
        type: "error",
        text1: "Error locking cart",
        text2: "Please try again",
      });
    }
  };
  const onPlaceOrder = async () => {
    try {
      const res = await placeOrder({
        cartId: cartState?.cartSummary?.cartId!,
        paymentInstructions: paymentInstapay,
        deliveryFee: deliveryFee,
      }).unwrap();
      router.replace({
        pathname: "/(app)/(home)/OrderPlaced",
        params: {
          orderId: res.orderId,
          participantCount: res.participantCount,
          totalAmount: res.totalAmount,
          restaurantName: res.restaurantName,
        },
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
    deliveryFee,
    setDeliveryFee,
    paymentInstapay,
    setPaymentInstapay,
    showDataPerItem,
    setShowDataPerItem,
    isHost,
    isSpectator,
    subtotal,
    onPlaceOrder,
    onAddItem,
    onLockCart,
    isInitialLoading,
  } as const;
}

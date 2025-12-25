import { useAppDispatch, useAppSelector } from "@/src/store/hooks";
import { clearLocalCart, lockLocalCart, setLocalCart, unlockLocalCart } from "@/src/store/slices/cartSlice";

export const useLocalCart = () => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((s) => s.cart);

  return {
    cart,
    setLocalCart: (payload: { cartState: { isLocked: boolean }; cartId: string; restaurantShortCode: string }) =>
      dispatch(setLocalCart(payload)),
    clearLocalCart: () => dispatch(clearLocalCart()),
    lockLocalCart: () => dispatch(lockLocalCart()),
    unlockLocalCart: () => dispatch(unlockLocalCart()),
  };
};

export default useLocalCart;

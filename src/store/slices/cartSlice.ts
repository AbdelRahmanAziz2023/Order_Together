import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CartState = {
  isLocked: boolean;
  cartId: string | null;
  restaurantShortCode: string | null;
  cartState: { isLocked: boolean } | null;
};

const initialState: CartState = {
  isLocked: true,
  cartId: null,
  restaurantShortCode: null,
  cartState: { isLocked: true },
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    toggleCartState: (state, action: PayloadAction<boolean>) => {
      state.isLocked = action.payload;
      if (state.cartState) state.cartState.isLocked = action.payload;
    },
    setLocalCart: (
      state,
      action: PayloadAction<{ cartState: { isLocked: boolean }; cartId: string; restaurantShortCode: string }>
    ) => {
      state.cartState = action.payload.cartState;
      state.cartId = action.payload.cartId;
      state.restaurantShortCode = action.payload.restaurantShortCode;
      state.isLocked = action.payload.cartState.isLocked;
    },
    clearLocalCart: (state) => {
      state.cartId = null;
      state.restaurantShortCode = null;
      state.cartState = { isLocked: true };
      state.isLocked = true;
    },
    lockLocalCart: (state) => {
      state.isLocked = true;
      if (state.cartState) state.cartState.isLocked = true;
    },
    unlockLocalCart: (state) => {
      state.isLocked = false;
      if (state.cartState) state.cartState.isLocked = false;
    },
  },
});

export const { toggleCartState, setLocalCart, clearLocalCart, lockLocalCart, unlockLocalCart } = cartSlice.actions;
export default cartSlice.reducer;

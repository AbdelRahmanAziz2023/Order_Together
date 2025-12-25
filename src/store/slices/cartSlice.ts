import { createSlice, PayloadAction } from "@reduxjs/toolkit";



const initialState: {isLocked: boolean}= {isLocked: true};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    toggleCartState: (state, action: PayloadAction<boolean>) => {
      state.isLocked = action.payload;
    },
  },
});

export const { toggleCartState } = cartSlice.actions;
export default cartSlice.reducer;

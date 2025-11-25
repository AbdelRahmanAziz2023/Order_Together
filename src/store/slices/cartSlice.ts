import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export interface CartItem {
  itemID: number;
  name: string;
  price: number;
  quantity: number;
  customizationNote?: string;
  allowCustomization: boolean;
}

interface CartState {
  restaurantId: number | null;
  restaurantName: string | null;
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

const initialState: CartState = {
  restaurantId: null,
  restaurantName: null,
  items: [],
  totalItems: 0,
  totalPrice: 0,
};

const calculateTotals = (items: CartItem[]) => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return { totalItems, totalPrice };
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setRestaurant: (state, action: PayloadAction<{ id: number; name: string }>) => {
      state.restaurantId = action.payload.id;
      state.restaurantName = action.payload.name;
    },
    addItem: (state, action: PayloadAction<Omit<CartItem, 'quantity'> & { quantity?: number }>) => {
      const existingItem = state.items.find((item) => item.itemID === action.payload.itemID);
      
      if (existingItem) {
        existingItem.quantity += action.payload.quantity || 1;
        if (action.payload.customizationNote !== undefined) {
          existingItem.customizationNote = action.payload.customizationNote;
        }
      } else {
        state.items.push({
          ...action.payload,
          quantity: action.payload.quantity || 1,
        });
      }
      
      const totals = calculateTotals(state.items);
      state.totalItems = totals.totalItems;
      state.totalPrice = totals.totalPrice;
    },
    updateItemQuantity: (state, action: PayloadAction<{ itemID: number; quantity: number }>) => {
      const item = state.items.find((item) => item.itemID === action.payload.itemID);
      
      if (item) {
        if (action.payload.quantity <= 0) {
          state.items = state.items.filter((item) => item.itemID !== action.payload.itemID);
        } else {
          item.quantity = action.payload.quantity;
        }
        
        const totals = calculateTotals(state.items);
        state.totalItems = totals.totalItems;
        state.totalPrice = totals.totalPrice;
      }
    },
    updateItemNote: (state, action: PayloadAction<{ itemID: number; note: string }>) => {
      const item = state.items.find((item) => item.itemID === action.payload.itemID);
      if (item) {
        item.customizationNote = action.payload.note;
      }
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.itemID !== action.payload);
      
      const totals = calculateTotals(state.items);
      state.totalItems = totals.totalItems;
      state.totalPrice = totals.totalPrice;
    },
    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.totalPrice = 0;
      state.restaurantId = null;
      state.restaurantName = null;
    },
  },
});

export const {
  setRestaurant,
  addItem,
  updateItemQuantity,
  updateItemNote,
  removeItem,
  clearCart,
} = cartSlice.actions;

export const selectCart = (state: RootState) => state.cart;
export const selectCartItems = (state: RootState) => state.cart.items;
export const selectCartTotalItems = (state: RootState) => state.cart.totalItems;
export const selectCartTotalPrice = (state: RootState) => state.cart.totalPrice;
export const selectCartRestaurant = (state: RootState) => ({
  id: state.cart.restaurantId,
  name: state.cart.restaurantName,
});

export default cartSlice.reducer;

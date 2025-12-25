import AsyncStorage from "@react-native-async-storage/async-storage";
import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import { baseApi } from "../services/api/baseApi";
import cartReducer from "./slices/cartSlice";
import userReducer from "./slices/userSlice";

const persistConfigUser = {
  key: "user",
  storage: AsyncStorage,
  whitelist: ["user"], // persisted user slice
};

const persistConfigCart = {
  key: "cart",
  storage: AsyncStorage,
};

const persistedUserReducer = persistReducer(persistConfigUser, userReducer);
const persistedCartReducer = persistReducer(persistConfigCart, cartReducer);

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    user: persistedUserReducer,
    cart: persistedCartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch
export const persistor = persistStore(store);

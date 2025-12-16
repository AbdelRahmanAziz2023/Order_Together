import { User } from "@/src/types/auth.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: { user: User | null } = {
  user: null,
};

const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    updateUser(state, action: PayloadAction<Partial<User>>) {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
    clearUser(state) {
      state.user = null;
    },
  },
});

export const { setUser,updateUser , clearUser } = UserSlice.actions;

export default UserSlice.reducer;
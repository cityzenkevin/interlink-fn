import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { loginUser as login } from "../../services/auth.api";

interface InitialState {
  isLoading: boolean;
  error: string;
  isAuth: boolean;
  user: any;
  lastPage?: string;
}
const initialState: InitialState = {
  isLoading: false,
  error: "",
  isAuth: false,
  user: null,
};

export const authSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("auth_token");
      state.user = {};
    },
    setLastPage: (state, action: PayloadAction<string>) => {
      state.lastPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(login.fulfilled, (state, action: PayloadAction<any>) => {
      console.log(action.payload);
      localStorage.setItem("auth_token", action.payload.tokens.accessToken);
      state.isLoading = false;
      state.user = action.payload.user;
    });
    builder.addCase(login.rejected, (state, action: any) => {
      state.isLoading = false;
      state.error = action.payload.message;
    });
  },
});

export const { logout, setLastPage } = authSlice.actions;

export default { login: authSlice.reducer };

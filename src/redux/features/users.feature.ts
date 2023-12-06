import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import usersApi from "../../services/users.api";

interface InitialState {
  isLoading: boolean;
  error: string | null;
  users: User[];
  success: string | null;
}

const initialState: InitialState = {
  isLoading: false,
  error: null,
  users: [],
  success: null,
};

export const user = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(usersApi.getUsers.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.success = null;
    });
    builder.addCase(
      usersApi.getUsers.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.users = action.payload.users;
      }
    );
    builder.addCase(usersApi.getUsers.rejected, (state) => {
      state.isLoading = false;
      state.error = null;
    });
  },
});

export default user.reducer;

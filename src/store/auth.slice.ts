import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "./auth.api";
import { User } from "./types";
interface AuthState {
  user: User | null;
}

const initialState: AuthState = {
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.checkUser.matchFulfilled,
      (state, action) => {
        state.user = action.payload.data as User;
      }
    );
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, action) => {
        console.log(action);
        state.user = action.payload.data as User;
      }
    );
    builder.addMatcher(
      authApi.endpoints.register.matchFulfilled,
      (state, action) => {
        console.log(action);
        state.user = action.payload.data as User;
      }
    );
    builder.addMatcher(
      authApi.endpoints.logout.matchFulfilled,
      (state, action) => {
        console.log(action);
        state.user = null;
      }
    );
  },
});

export const authReducer = authSlice.reducer;

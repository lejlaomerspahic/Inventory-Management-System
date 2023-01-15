import { configureStore, createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { isLoggedIn: false, isLoggedInAdmin: false },
  reducers: {
    login(state) {
      state.isLoggedIn = true;
      state.isLoggedInAdmin = false;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.isLoggedInAdmin = false;
    },
    loginAdmin(state) {
      state.isLoggedInAdmin = true;
      state.isLoggedIn = true;
    },
    logoutAdmin(state) {
      state.isLoggedInAdmin = false;
      state.isLoggedIn = false;
    },
  },
});

export const authActions = authSlice.actions;

export const store = configureStore({
  reducer: authSlice.reducer,
});

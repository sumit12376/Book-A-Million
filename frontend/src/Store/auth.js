import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isloggedin: false,
    role: "user",
  },
  reducers: {
    login(state) {
      state.isloggedin = true;
    },
    logout(state) {
      state.isloggedin = false;
    },
    changeRole(state, action) {
      const role = action.payload;
      state.role = role;
    },
  },
});

export const { login, logout, changeRole } = authSlice.actions;
export default authSlice.reducer;

/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import { Cookies } from "react-cookie";

const cookie = new Cookies();

const authSlice = createSlice({
  name: "auth",
  initialState: {
    //トークンの有無で初期値のtrueとfalseを切り替える
    isSignIn: cookie.get("token") !== undefined,
  },
  reducers: {
    //サインイン用
    signIn: (state) => {
      state.isSignIn = true;
    },
    //サインアウト用
    signOut: (state) => {
      state.isSignIn = false;
    },
  },
});

//各アクションを送信
export const { signIn, signOut } = authSlice.actions;

export default authSlice.reducer;

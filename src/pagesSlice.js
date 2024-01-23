/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

const pagesSlice = createSlice({
  name: "pages",
  initialState: {//初期値の設定
    value: 0,
  },
  reducers: {
    //ページカウント加算用
    increment: (state) => {
      state.value += 1;
    },
    //ページカウント減算用
    decrement: (state) => {
      state.value -= 1;
    },
  },
});

//アクションの送信
export const { increment, decrement } = pagesSlice.actions;

//reducerの送信
export default pagesSlice.reducer;

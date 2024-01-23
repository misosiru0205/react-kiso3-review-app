/* eslint-disable import/prefer-default-export */
import { configureStore } from "@reduxjs/toolkit";
import pagesReducer from "./pagesSlice";
import authReducer from "./authSlice";

//ページネーションとログイン状態のSliceを結合
export const store = configureStore({
  reducer: {
    pages: pagesReducer,
    auth: authReducer,
  },
});

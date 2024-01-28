/* eslint-disable import/prefer-default-export */
import { configureStore } from "@reduxjs/toolkit";
import pagesReducer from "./pagesSlice";
import authReducer from "./authSlice";
import usernameReducer from "./usernameSlice";
import isLoadingReducer from "./loadingSlice"

//ページネーションとログイン状態のSliceを結合
export const store = configureStore({
  reducer: {
    pages: pagesReducer,
    auth: authReducer,
    username: usernameReducer,
    loadState : isLoadingReducer
  },
});

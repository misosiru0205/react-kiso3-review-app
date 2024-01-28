/* eslint-disable no-else-return */
/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Cookies } from "react-cookie";
import axios from "axios";
import { url } from "./const";

const cookie = new Cookies();

//createAsyncThunkでaxiosの定義 Header.jsxでdispatchにて呼び出す
export const name = createAsyncThunk("data/name", async () => {
  if (!cookie.get("token")) {
    return null;
  }
  else{
  const response = await axios.get(`${url}/users`, {
    headers: { Authorization: `Bearer ${cookie.get("token")}` },
  });
  return response.data.name;}
});

const usernameSlice = createSlice({
  name: "username",
  initialState: {
    setName: null,
  },
  reducers: {
    setUsername: (state, actions) => {
      state.setName = actions.payload;
    },
    resetUsername: (state) => {
      state.setName = undefined;
    },
  },
  extraReducers: (builder) => {
    // リクエストが成功したときの処理
    builder.addCase(name.fulfilled, (state, actions) => {
      state.setName = actions.payload;
    });
    // リクエストが失敗したときの処理
    builder.addCase(name.rejected, (state) => {
      state.setName = "取得に失敗しました";
    });
  },
});

//アクションの送信
export const { setUsername, resetUsername } = usernameSlice.actions;

//reducerの送信
export default usernameSlice.reducer;

/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

const isLoadingSlice = createSlice({
    name:"loadState",
    initialState:{
        isLoading:false},
    reducers:{
        loadStart:(state)=>{
            state.isLoading = true
        },
        loadEnd:(state)=>{
            state.isLoading = false
        },
    }
})

export const {loadStart,loadEnd} = isLoadingSlice.actions

export default isLoadingSlice.reducer

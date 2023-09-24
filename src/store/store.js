import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../slices/authSlice";
import  watchListSlice from "../slices/watchListSlice";
import modalSlice from "../slices/modalSlice";



export const store = configureStore({
    reducer: {
        auth: authSlice,
        watchList: watchListSlice,
        modal: modalSlice
    }
})
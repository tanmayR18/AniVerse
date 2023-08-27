import { createSlice } from "@reduxjs/toolkit";
const userdata = localStorage.getItem("token") ? localStorage.getItem("token") : null

export const authSlice = createSlice({
    name: "auth",
    initialState: JSON.parse(userdata),
    reducers:{
        logIn: (state, value) => {
            localStorage.setItem("token", JSON.stringify(value.payload))
            state = value.payload
            return value.payload
        },
        logOut: (state, value) => {
            state = null
            localStorage.removeItem("token")
            localStorage.removeItem("_grecaptcha")
            return null
            
        },
    },
})

export const {logIn, logOut} = authSlice.actions
export default authSlice.reducer
import { createSlice } from "@reduxjs/toolkit";
const userdata = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null

export const authSlice = createSlice({
    name: "auth",
    initialState: userdata,
    reducers:{
        logIn: (state, value) => {
            localStorage.setItem("token", JSON.stringify(value.payload))
            state = value.payload
            return value.payload
        },
        logOut: (state, value) => {
            state = null
            localStorage.clear("token")
            return null
        },
    },
})

export const {logIn, logOut} = authSlice.actions
export default authSlice.reducer
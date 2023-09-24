import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
    name: "auth",
    initialState: null,
    reducers:{
        addModal: (state, value) => {
            state = value.payload
            return value.payload
        },
        removeModal: (state, value) => {
            state = null
            return null
            
        },
    },
})

export const {addModal, removeModal} = modalSlice.actions
export default modalSlice.reducer
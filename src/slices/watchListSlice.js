import { createSlice } from "@reduxjs/toolkit"

const userFavAnime = localStorage.getItem("favAnime") ? JSON.parse(localStorage.getItem("toWatchAnime")) : []

export const watchListSlice = createSlice({
    name: "watchList",
    initialState: userFavAnime,
    reducers: {
        add: (state, value) => {
            state.push(value.payload)
            localStorage.setItem("toWatchAnime", JSON.stringify(value.payload))
            // return value.payload
        },
        remove: (state, value) => {
            // console.log("Data received", value.payload)
            // const filteredList = state.filter( (item) => (
            //     item.mal_id !== value.payload.mal_id
            // ))
            // console.log("Current state", filteredList)
            // localStorage.setItem("toWatchAnime", JSON.stringify(state))
            // return value.payload

            return 
        }
    }
})

export const {remove, add} = watchListSlice.actions
export default watchListSlice.reducer
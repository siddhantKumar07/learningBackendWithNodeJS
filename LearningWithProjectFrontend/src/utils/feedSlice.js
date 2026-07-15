import { createSlice } from "@reduxjs/toolkit";

const FeedSlice = createSlice({
    name:"feed",
    initialState:[],
    reducers:{
        addFeed:(state,action)=>{
            return action.payload
        }
    }
})
export const {addFeed} = FeedSlice.actions
export default FeedSlice.reducer

import { createSlice } from "@reduxjs/toolkit";

const FeedSlice = createSlice({
    name:"feed",
    initialState:[],
    reducers:{
        addFeed:(state,action)=>{
            return action.payload
        },
        removeFeedUser: (state, action) => {
            return state.filter((user) => user._id !== action.payload);
        }
    }
})
export const {addFeed, removeFeedUser} = FeedSlice.actions
export default FeedSlice.reducer

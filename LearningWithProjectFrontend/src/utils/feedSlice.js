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
        },
        clearFeed: () => {
            return [];
        }
    }
})
export const {addFeed, removeFeedUser,clearFeed} = FeedSlice.actions
export default FeedSlice.reducer

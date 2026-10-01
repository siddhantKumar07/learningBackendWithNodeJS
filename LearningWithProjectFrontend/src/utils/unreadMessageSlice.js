import { createSlice } from "@reduxjs/toolkit";

const unreadSlice = createSlice({
  name: "unread",
  initialState: {},
  reducers: {
    addUnreadMessage: (state, action) => {
      const senderId = String(action.payload.senderId);
      state[senderId] = (state[senderId] || 0) + 1;
    },

    markChatRead: (state, action) => {
      delete state[String(action.payload)];
    },
  },
});

export const { addUnreadMessage, markChatRead } = unreadSlice.actions;
export default unreadSlice.reducer;
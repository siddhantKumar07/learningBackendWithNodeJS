import { createSlice } from "@reduxjs/toolkit";

const chatPreviewSlice = createSlice({
  name: "chatPreview",
  initialState: {},
  reducers: {
    updateChatPreview: (state, action) => {
      const { senderId, message, attachment, timestamp } = action.payload;

      state[String(senderId)] = {
        message,
        attachment,
        timestamp,
      };
    },
  },
});

export const { updateChatPreview } = chatPreviewSlice.actions;
export default chatPreviewSlice.reducer;
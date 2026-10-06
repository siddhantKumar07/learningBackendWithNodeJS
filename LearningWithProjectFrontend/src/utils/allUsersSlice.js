import { createSlice } from "@reduxjs/toolkit";

const allUsersSlice = createSlice({
  name: "allUsers",
  initialState: [],
  reducers: {
    setAllUsers: (_, action) => action.payload,
    updateUserConnectionStatus: (state, action) => {
      const user = state.find((item) => item._id === action.payload.userId);
      if (user) user.connectionStatus = action.payload.status;
    },
    clearAllUsers: () => [],
  },
});

export const {
  setAllUsers,
  updateUserConnectionStatus,
  clearAllUsers,
} = allUsersSlice.actions;
export default allUsersSlice.reducer;

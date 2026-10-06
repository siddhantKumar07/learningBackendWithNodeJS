import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice.js'
import feedReducer from './feedSlice.js'
import unreadReducer from "./unreadMessageSlice.js";
import connectionReducer from './connectionSlice.js'
import chatPreviewReducer from "./chatPreviewSlice.js";
import allUsersReducer from "./allUsersSlice.js";

export const store = configureStore({
  reducer: {
    user:userReducer,
    allUsers: allUsersReducer,
    feed:feedReducer,
    connection:connectionReducer,
     unread: unreadReducer,
    chatPreview: chatPreviewReducer,
  },
})

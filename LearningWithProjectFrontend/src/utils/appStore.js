import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import feedReducer from './feedSlice'
import unreadReducer from "./unreadMessageSlice";
import connectionReducer from './connectionSlice'
import chatPreviewReducer from "./chatPreviewSlice";

export const store = configureStore({
  reducer: {
    user:userReducer,
    feed:feedReducer,
    connection:connectionReducer,
     unread: unreadReducer,
    chatPreview: chatPreviewReducer,
  },
})


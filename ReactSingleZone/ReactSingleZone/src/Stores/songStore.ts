// src/Stores/songStore.ts
import { configureStore } from '@reduxjs/toolkit';
import songReducer from '../Slices/SongSlice';  // תיקנתי את הנתיב לפי מבנה התיקיות שלך
import actionSongReducer from '../Slices/actionSongSlice'
import playlistReducer from '../Slices/playlistSlice'
import authReducer from '../Slices/authSlice '
import chatReducer from '../Slices/sendChatMessage '
const songStore = configureStore({
  reducer: {
    songs: songReducer,
    actionSongs: actionSongReducer,
    playlists: playlistReducer,
    auth: authReducer,
    chat:chatReducer,


  },
});

export type RootStore = ReturnType<typeof songStore.getState>
export type AppDispatch = typeof songStore.dispatch;
export default songStore;

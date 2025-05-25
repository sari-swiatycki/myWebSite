// import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
// import axios from "axios";
// import playlist from "../types/playlist";

// interface PlaylistState {
//   playlists: playlist[];
//   playlistSongs: any[];  // כאן נשמור את השירים של הפלייליסט
//   loading: boolean;
//   error: string | null;
// }

// // מצב התחלתי
// const initialState: PlaylistState = {
//   playlists: [],
//   playlistSongs: [],  // התחלנו עם רשימה ריקה של שירים
//   loading: false,
//   error: null,
// };

// // פונקציה אסינכרונית לשליפת פלייליסטים של משתמש מסוים
// export const fetchUserPlaylists = createAsyncThunk(
//   "playlists/fetchUserPlaylists",
//   async (userId: number, { rejectWithValue }) => {
//     try {
//       const response = await axios.get<playlist[]>(`http://localhost:5120/api/PlayList/user/1`);
//       return response.data;
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data || "Failed to fetch playlists");
//     }
//   }
// );

// // פונקציה אסינכרונית לשליפת שירים לפי playlistId
// export const fetchPlaylistSongs = createAsyncThunk(
//   "playlists/fetchPlaylistSongs",
//   async (playlistId: number, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(`http://localhost:5120/api/PlayListSong/get-songs/${playlistId}`);
//       return response.data;  // יוחזרו השירים של הפלייליסט
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data || "Failed to fetch playlist songs");
//     }
//   }
// );

// const playlistSlice = createSlice({
//   name: "playlists",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       // טיפול עבור שליפת פלייליסטים
//       .addCase(fetchUserPlaylists.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchUserPlaylists.fulfilled, (state, action: PayloadAction<playlist[]>) => {
//         state.loading = false;
//         state.playlists = action.payload;
//       })
//       .addCase(fetchUserPlaylists.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       })
      
//       // טיפול עבור שליפת השירים של פלייליסט מסוים
//       .addCase(fetchPlaylistSongs.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchPlaylistSongs.fulfilled, (state, action: PayloadAction<any[]>) => {
//         state.loading = false;
//         state.playlistSongs = action.payload;  // נשמור את השירים של הפלייליסט
//       })
//       .addCase(fetchPlaylistSongs.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       });
//   },
// });

// export default playlistSlice.reducer;


















// import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
// import axios from "axios";
// import playlist from "../types/playlist";

// interface PlaylistState {
//   playlists: playlist[];
//   playlistSongs: any[];  // כאן נשמור את השירים של הפלייליסט
//   loading: boolean;
//   error: string | null;
// }

// // מצב התחלתי
// const initialState: PlaylistState = {
//   playlists: [],
//   playlistSongs: [],  // התחלנו עם רשימה ריקה של שירים
//   loading: false,
//   error: null,
// };

// // פונקציה אסינכרונית לשליפת פלייליסטים של משתמש מסוים
// export const fetchUserPlaylists = createAsyncThunk(
//   "playlists/fetchUserPlaylists",
//   async (userId: number, { rejectWithValue }) => {
//     // try {
//      console.log(userId);
     

//       const response = await axios.get<playlist[]>(`http://localhost:5120/api/PlayList/user/${userId}`);
//       return response.data;
//     // } catch (error: any) {
//     //   return rejectWithValue(error.response?.data || "Failed to fetch playlists");
//     // }
//   }
// );

// // פונקציה אסינכרונית לשליפת שירים לפי playlistId
// export const fetchPlaylistSongs = createAsyncThunk(
//   "playlists/fetchPlaylistSongs",
//   async (playlistId: number, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(`http://localhost:5120/api/PlayListSong/get-songs/${playlistId}`);
//       return response.data;  // יוחזרו השירים של הפלייליסט
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data || "Failed to fetch playlist songs");
//     }
//   }
// );

// // פונקציה אסינכרונית להוספת פלייליסט חדש
// export const addPlaylist = createAsyncThunk(
//   "playlists/addPlaylist",
//   async ({ name, userId }: { name: string; userId: number }, { rejectWithValue }) => {
//     try {
//       const response = await axios.post("http://localhost:5120/api/PlayList", {
//         name,
//         userId,
//       });
//       return response.data;
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data || "Failed to add playlist");
//     }
//   }
// );

// const playlistSlice = createSlice({
//   name: "playlists",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       // טיפול עבור שליפת פלייליסטים
//       .addCase(fetchUserPlaylists.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchUserPlaylists.fulfilled, (state, action: PayloadAction<playlist[]>) => {
//         state.loading = false;
//         state.playlists = action.payload;
//       })
//       .addCase(fetchUserPlaylists.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       })
      
//       // טיפול עבור שליפת השירים של פלייליסט מסוים
//       .addCase(fetchPlaylistSongs.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchPlaylistSongs.fulfilled, (state, action: PayloadAction<any[]>) => {
//         state.loading = false;
//         state.playlistSongs = action.payload;  // נשמור את השירים של הפלייליסט
//       })
//       .addCase(fetchPlaylistSongs.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       })
      
//       // טיפול עבור הוספת פלייליסט חדש
//       .addCase(addPlaylist.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(addPlaylist.fulfilled, (state, action: PayloadAction<playlist>) => {
//         state.loading = false;
//         state.playlists.push(action.payload);
//       })
//       .addCase(addPlaylist.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       });
//   },
// });

// export default playlistSlice.reducer;

























// import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
// import axios from "axios";
// import playlist from "../types/playlist";

// interface PlaylistState {
//   playlists: playlist[];
//   playlistSongs: any[];
//   loading: boolean;
//   error: string | null;
// }

// const initialState: PlaylistState = {
//   playlists: [],
//   playlistSongs: [],
//   loading: false,
//   error: null,
// };

// // פונקציה אסינכרונית לשליפת פלייליסטים של משתמש מסוים
// export const fetchUserPlaylists = createAsyncThunk(
//   "playlists/fetchUserPlaylists",
//   async (userId: number, { rejectWithValue }) => {
//     console.log(userId);
//     const response = await axios.get<playlist[]>(`http://localhost:5120/api/PlayList/user/${userId}`);
//     return response.data;
//   }
// );

// // פונקציה אסינכרונית לשליפת שירים לפי playlistId
// export const fetchPlaylistSongs = createAsyncThunk(
//   "playlists/fetchPlaylistSongs",
//   async (playlistId: number, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(`http://localhost:5120/api/PlayListSong/get-songs/${playlistId}`);
//       return response.data;
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data || "Failed to fetch playlist songs");
//     }
//   }
// );

// // פונקציה אסינכרונית להוספת פלייליסט חדש
// export const addPlaylist = createAsyncThunk(
//   "playlists/addPlaylist",
//   async ({ name, userId }: { name: string; userId: number }, { rejectWithValue }) => {
//     try {
//       const response = await axios.post("http://localhost:5120/api/PlayList", {
//         name,
//         userId,
//       });
//       return response.data;
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data || "Failed to add playlist");
//     }
//   }
// );

// // פונקציה אסינכרונית להוספת שיר לפלייליסט
// export const addSongToPlaylist = createAsyncThunk(
//   "playlists/addSongToPlaylist",
//   async ({ playlistId, songId }: { playlistId: number; songId: number }, { rejectWithValue }) => {
//     try {
//       const response = await axios.post("http://localhost:5120/api/PlayListSong/add-song", {
//         playListId: playlistId,
//         songId: songId,
//       });
//       return response.data;
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data || "Failed to add song to playlist");
//     }
//   }
// );

// const playlistSlice = createSlice({
//   name: "playlists",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       // טיפול עבור שליפת פלייליסטים
//       .addCase(fetchUserPlaylists.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchUserPlaylists.fulfilled, (state, action: PayloadAction<playlist[]>) => {
//         state.loading = false;
//         state.playlists = action.payload;
//       })
//       .addCase(fetchUserPlaylists.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       })

//       // טיפול עבור שליפת השירים של פלייליסט מסוים
//       .addCase(fetchPlaylistSongs.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchPlaylistSongs.fulfilled, (state, action: PayloadAction<any[]>) => {
//         state.loading = false;
//         state.playlistSongs = action.payload;
//       })
//       .addCase(fetchPlaylistSongs.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       })

//       // טיפול עבור הוספת פלייליסט חדש
//       .addCase(addPlaylist.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(addPlaylist.fulfilled, (state, action: PayloadAction<playlist>) => {
//         state.loading = false;
//         state.playlists.push(action.payload);
//       })
//       .addCase(addPlaylist.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       })

//       // טיפול עבור הוספת שיר לפלייליסט
//       .addCase(addSongToPlaylist.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(addSongToPlaylist.fulfilled, (state) => {
//         state.loading = false;
        
//       })
//       .addCase(addSongToPlaylist.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       });
//   },
// });

// export default playlistSlice.reducer;
























import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import playlist from "../types/playlist";
import api from "../components/api";

interface PlaylistState {
  playlists: playlist[];
  playlistSongs: any[];
  loading: boolean;
  error: string | null;
}

const initialState: PlaylistState = {
  playlists: [],
  playlistSongs: [],
  loading: false,
  error: null,
};

// שליפת פלייליסטים של משתמש מסוים
export const fetchUserPlaylists = createAsyncThunk(
  "playlists/fetchUserPlaylists",
  async (userId: number, { rejectWithValue }) => {
    try {
      const response = await api.get<playlist[]>(`api/PlayList/user/${userId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to fetch user playlists");
    }
  }
);

// שליפת שירים לפי playlistId
export const fetchPlaylistSongs = createAsyncThunk(
  "playlists/fetchPlaylistSongs",
  async (playlistId: number, { rejectWithValue }) => {
    try {
      const response = await api.get(`api/PlayListSong/get-songs/${playlistId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to fetch playlist songs");
    }
  }
);

// הוספת פלייליסט חדש
export const addPlaylist = createAsyncThunk(
  "playlists/addPlaylist",
  async ({ name, userId }: { name: string; userId: number }, { rejectWithValue }) => {
    try {
      console.log({ name, userId });
      const response = await api.post("api/PlayList", { name, userId });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to add playlist");
    }
  }
);

// הוספת שיר לפלייליסט
export const addSongToPlaylist = createAsyncThunk(
  "playlists/addSongToPlaylist",
  async ({ playlistId, songId }: { playlistId: number; songId: number }, { rejectWithValue }) => {
    try {
    
      const response = await api.post("api/PlayListSong/add-song", {
        playListId: playlistId,
        songId: songId,

      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to add song to playlist");
    }
  }
);

// מחיקת שיר מפלייליסט
export const removeSongFromPlaylist = createAsyncThunk(
  "playlists/removeSongFromPlaylist",
  async ({ playlistId, songId }: { playlistId: number; songId: number }, { rejectWithValue }) => {
    try {
      await api.delete(
        `api/PlayListSong/remove-song?playListId=${playlistId}&songId=${songId}`
      );
      return { playlistId, songId };
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to remove song from playlist");
    }
  }
);

const playlistSlice = createSlice({
  name: "playlists",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // שליפת פלייליסטים
      .addCase(fetchUserPlaylists.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserPlaylists.fulfilled, (state, action: PayloadAction<playlist[]>) => {
        state.loading = false;
        state.playlists = action.payload;
      })
      .addCase(fetchUserPlaylists.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // שליפת השירים של פלייליסט מסוים
      .addCase(fetchPlaylistSongs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPlaylistSongs.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.loading = false;
        state.playlistSongs = action.payload;
      })
      .addCase(fetchPlaylistSongs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // הוספת פלייליסט חדש
      .addCase(addPlaylist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addPlaylist.fulfilled, (state, action: PayloadAction<playlist>) => {

        state.loading = false;
        state.playlists.push(action.payload);
      })
      .addCase(addPlaylist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // הוספת שיר לפלייליסט
      .addCase(addSongToPlaylist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addSongToPlaylist.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addSongToPlaylist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // מחיקת שיר מפלייליסט
      .addCase(removeSongFromPlaylist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeSongFromPlaylist.fulfilled, (state, action) => {
        state.loading = false;
        state.playlistSongs = state.playlistSongs.filter(
          (song) => song.id !== action.payload.songId
        );
      })
      .addCase(removeSongFromPlaylist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default playlistSlice.reducer;


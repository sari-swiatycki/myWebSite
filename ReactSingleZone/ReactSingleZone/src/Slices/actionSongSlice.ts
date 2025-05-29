
// import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
// import axios from 'axios';
// import song from '../types/song';

// const API_URL = 'http://localhost:5120';  // כתובת ה-API שלך

// // הגדרת סוגי הנתונים עבור ה-State
// interface SongState {
//   songs: song[];
//   searchResults: song[]; // הוספנו את השדה הזה
//   loading: boolean;
//   error: string | null;
// }



// export const addRating = createAsyncThunk(
//     'drawings/addRating',
//     async ({ drawingId, value }: { drawingId: number, value: number }) => {
//       const response = await axios.post(`https://localhost:7004/api/Drawing/Rate/${drawingId}`, value, {
//         headers: { 'Content-Type': 'application/json' }
//       });
//       return response.data;
//     }
//   );

// export const fetchRating = createAsyncThunk(
//     'drawings/fetchRating',
//     async (drawingId: number) => {
//       const response = await axios.get(`https://localhost:7004/api/Drawing/${drawingId}`);
//       return response.data.avgRating;
//     }
//   );
// // קריאת API לחיפוש חכם לפי מילת חיפוש
// export const searchSongs = createAsyncThunk<song[], string>(
//   'actionSongs/searchSongs', // שם הפעולה
//   async (query: string) => {
//     const response = await axios.get(`${API_URL}/api/Songs/search/${query}`);
//     return response.data; // החזרת תוצאות החיפוש
//   }
// );

// // קריאת API להורדת שירים לפי קטגוריה
// export const fetchSongsByCategory = createAsyncThunk<song[], number>(
//   'actionSongs/fetchSongsByCategory',  
//   async (categoryId: number) => {
//     const response = await axios.get(`${API_URL}/api/Songs/ByCategory/${categoryId}`);
//     return response.data.worksheets;
//   }
// );

// // יצירת ה-Slice
// const actionSongSlice = createSlice({
//   name: 'actionSongs',  
//   initialState: {
//     songs: [] as song[],
//     searchResults: [] as song[], // הגדרת searchResults
//     loading: false,
//     error: null as string | null,
//   } as SongState,
//   reducers: {
//     // אפשר להוסיף reducers נוספים אם צריך
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchSongsByCategory.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchSongsByCategory.fulfilled, (state, action: PayloadAction<song[]>) => {
//         state.loading = false;
//         state.songs = action.payload;
//       })
//       .addCase(fetchSongsByCategory.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message ?? 'Failed to load songs';
//       })
//       // תוצאות החיפוש
//       .addCase(searchSongs.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(searchSongs.fulfilled, (state, action: PayloadAction<song[]>) => {
//         state.loading = false;
//         state.searchResults = action.payload;  // עדכון תוצאות החיפוש
//       })
//       .addCase(searchSongs.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message ?? 'Failed to search songs';
//       })
//       // הוספת דירוג לשיר
//       .addCase(addRating.fulfilled, (state, action) => {
//         const updatedSong= action.payload;
//         const index = state.songs.findIndex(d => d.id === updatedSong.id);
//         if (index !== -1) {
//           state.songs[index] = updatedSong;
//         }
//       })
//       .addCase(addRating.rejected, (state, action) => {
//         state.error = action.payload as string || action.error.message || 'Failed to add rating';
//       })
//       // קבלת דירוג לציור
//       .addCase(fetchRating.fulfilled, (state, action) => {
//         const { drawingId, avgRating } = action.payload;
//         const drawing = state.songs.find(d => d.id === drawingId);
//         if (drawing) {
//           drawing.avgRating = avgRating;
//         }
//       })
//       .addCase(fetchRating.rejected, (state, action) => {
//         state.error = action.payload as string || action.error.message || 'Failed to fetch rating';
//       });
//   },
// });

// export default actionSongSlice.reducer;








// import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
// import axios from 'axios';
// import song from '../types/song';

// const API_URL = 'http://localhost:5120';

// interface SongState {
//   songs: song[];
//   searchResults: song[];
//   loading: boolean;
//   error: string | null;
// }

// export const addRating = createAsyncThunk(
//   'drawings/addRating',
//   async ({ drawingId, value }: { drawingId: number, value: number }) => {
//     const response = await axios.post(`https://localhost:7004/api/Drawing/Rate/${drawingId}`, value, {
//       headers: { 'Content-Type': 'application/json' }
//     });
//     return response.data;
//   }
// );

// export const fetchRating = createAsyncThunk(
//   'drawings/fetchRating',
//   async (drawingId: number) => {
//     const response = await axios.get(`https://localhost:7004/api/Drawing/${drawingId}`);
//     return response.data.avgRating;
//   }
// );

// export const searchSongs = createAsyncThunk<song[], string>(
//   'actionSongs/searchSongs',
//   async (query: string) => {
//     const response = await axios.get(`${API_URL}/api/Songs/search/${query}`);
//     return response.data;
//   }
// );

// export const fetchSongsByCategory = createAsyncThunk<song[], number>(
//   'actionSongs/fetchSongsByCategory',
//   async (categoryId: number) => {
//     const response = await axios.get(`${API_URL}/api/Songs/ByCategory/${categoryId}`);
//     return response.data.worksheets;
//   }
// );

// const actionSongSlice = createSlice({
//   name: 'actionSongs',
//   initialState: {
//     songs: [] as song[],
//     searchResults: [] as song[],
//     loading: false,
//     error: null as string | null,
//   } as SongState,
//   reducers: {
//     clearSongs: (state) => {
//       state.songs = [];
//     },
//     clearSearchResults: (state) => {
//       state.searchResults = [];
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchSongsByCategory.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchSongsByCategory.fulfilled, (state, action: PayloadAction<song[]>) => {
//         state.loading = false;
//         state.songs = action.payload;
//       })
//       .addCase(fetchSongsByCategory.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message ?? 'Failed to load songs';
//       })
//       .addCase(searchSongs.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(searchSongs.fulfilled, (state, action: PayloadAction<song[]>) => {
//         state.loading = false;
//         state.searchResults = action.payload;
//       })
//       .addCase(searchSongs.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message ?? 'Failed to search songs';
//       })
//       .addCase(addRating.fulfilled, (state, action) => {
//         const updatedSong = action.payload;
//         const index = state.songs.findIndex(d => d.id === updatedSong.id);
//         if (index !== -1) {
//           state.songs[index] = updatedSong;
//         }
//       })
//       .addCase(addRating.rejected, (state, action) => {
//         state.error = action.payload as string || action.error.message || 'Failed to add rating';
//       })
//       .addCase(fetchRating.fulfilled, (state, action) => {
//         const { drawingId, avgRating } = action.payload;
//         const drawing = state.songs.find(d => d.id === drawingId);
//         if (drawing) {
//           drawing.avgRating = avgRating;
//         }
//       })
//       .addCase(fetchRating.rejected, (state, action) => {
//         state.error = action.payload as string || action.error.message || 'Failed to fetch rating';
//       });
//   },
// });

// export const { clearSongs, clearSearchResults } = actionSongSlice.actions;
// export default actionSongSlice.reducer;

























///עובדדדדדדדדדדדדד

// import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
// import axios from "axios";
// import song from "../types/song";

// const API_URL = "http://localhost:5120";

// interface SongState {
//   songs: song[];
//   filteredSongs: song[]; // מערך אחיד לכל התוצאות
//   loading: boolean;
//   error: string | null;
// }

// // חיפוש שירים לפי מילה
// export const searchSongs = createAsyncThunk<song[], string>(
//   "actionSongs/searchSongs",
//   async (query: string) => {
//     const response = await axios.get(`${API_URL}/api/Songs/search/${query}`);
//     return response.data;
//   }
// );

// // חיפוש שירים לפי קטגוריה
// export const fetchSongsByCategory = createAsyncThunk<song[], number>(
//   "actionSongs/fetchSongsByCategory",
//   async (categoryId: number) => {
//     const response = await axios.get(`${API_URL}/api/Songs/ByCategory/${categoryId}`);
//     return response.data.worksheets;
//   }
// );

// const actionSongSlice = createSlice({
//   name: "actionSongs",
//   initialState: {
//     songs: [] as song[],
//     filteredSongs: [] as song[], 
//     loading: false,
//     error: null as string | null,
//   } as SongState,
//   reducers: {
//     setSongs: (state, action: PayloadAction<song[]>) => {
//       state.filteredSongs = action.payload;
//     },
//     clearSongs: (state) => {
//       state.filteredSongs = [];
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchSongsByCategory.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchSongsByCategory.fulfilled, (state, action: PayloadAction<song[]>) => {
//         state.loading = false;
//         state.filteredSongs = action.payload;
//       })
//       .addCase(fetchSongsByCategory.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message ?? "Failed to load songs";
//       })
//       .addCase(searchSongs.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(searchSongs.fulfilled, (state, action: PayloadAction<song[]>) => {
//         state.loading = false;
//         state.filteredSongs = action.payload;
//       })
//       .addCase(searchSongs.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message ?? "Failed to search songs";
//       });
//   },
// });

// export const { setSongs, clearSongs } = actionSongSlice.actions;
// export default actionSongSlice.reducer;

































import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import song from "../types/song";

const API_URL = "https://singlezone-net.onrender.com"
interface SongState {
  songs: song[];  // מערך של כל השירים
  filteredSongs: song[];  // מערך אחיד לכל התוצאות (סינון/חיפוש)
  loading: boolean;
  error: string | null;
}

// חיפוש של כל השירים
export const fetchAllSongs = createAsyncThunk<song[], void>(
  "actionSongs/fetchAllSongs",
  async () => {
    const response = await axios.get(`${API_URL}/api/Songs`);
    console.log("API Response:", response.data); // בדוק את התגובה מה-API
    return response.data;
  }
);

// חיפוש שירים לפי מילה
export const searchSongs = createAsyncThunk<song[], string>(
  "actionSongs/searchSongs",
  async (query: string) => {
    const response = await axios.get(`${API_URL}/api/Songs/search/${query}`);

    return response.data;
  }
);

// חיפוש שירים לפי קטגוריה
export const fetchSongsByCategory = createAsyncThunk<song[], number>(
  "actionSongs/fetchSongsByCategory",
  async (categoryId: number) => {
    const response = await axios.get(`${API_URL}/api/Songs/ByCategory/${categoryId}`);
    return response.data.worksheets;
  }
);

// חיפוש של השירים הכי חדשים
export const fetchLatestSongs = createAsyncThunk<song[], void>(
  "actionSongs/fetchLatestSongs",
  async () => {
    const response = await axios.get(`${API_URL}/api/Songs/latest`);
    return response.data;
  }
);



// Async thunk להוספת דירוג לציור
export const addRating = createAsyncThunk(
  'drawings/addRating',
  async ({ songId, value }: { songId: number, value: number }) => {
    const response = await axios.post(
      `https://singlezone-net.onrender.com/api/Songs/Rate/${songId}`,
      value,  // שלח רק את הדירוג כערך מספרי ולא כ-object
      {
        headers: {
          'Content-Type': 'application/json',  // לא לשכוח להוסיף את הכותרת
        },
      }
    );
    return response.data;
  }
);


const actionSongSlice = createSlice({
  name: "actionSongs",
  initialState: {
    songs: [] as song[],  // כל השירים
    filteredSongs: [] as song[],  // שירים לפי חיפוש או סינון
    loading: false,
    error: null as string | null,
  } as SongState,
  reducers: {
    setSongs: (state, action: PayloadAction<song[]>) => {
      state.filteredSongs = action.payload;
    },
    clearSongs: (state) => {
      state.filteredSongs = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllSongs.pending, (state) => {
        state.loading = true;
      })
     

      .addCase(fetchAllSongs.fulfilled, (state, action: PayloadAction<song[]>) => {
        console.log("Fetched Songs:", action.payload); // בדוק את הנתונים שנשמרים
        state.loading = false;
        
        state.songs = action.payload;  // עדכון כל השירים
      })
      .addCase(fetchAllSongs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to load all songs";
      })
      .addCase(fetchSongsByCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSongsByCategory.fulfilled, (state, action: PayloadAction<song[]>) => {
        state.loading = false;
        state.filteredSongs = action.payload;
      })
      .addCase(fetchSongsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to load songs by category";
      })
      .addCase(searchSongs.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchSongs.fulfilled, (state, action: PayloadAction<song[]>) => {
        state.loading = false;
        state.filteredSongs = action.payload;
      })
      .addCase(searchSongs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to search songs";
      });
  },
});

export const { setSongs, clearSongs } = actionSongSlice.actions;
export default actionSongSlice.reducer;




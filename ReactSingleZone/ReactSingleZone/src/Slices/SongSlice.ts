import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';  // הוספתי את הייבוא של axios
import Category from '../types/Category';
import category from '../types/Category';
import { RootStore } from '../Stores/songStore';

const API_URL = 'https://singlezone-net.onrender.com';

// interface Song {
//   Id: number;
//   Title: string;
//   Artist: string;
// }

// interface SongState {
//   categories: Category[];
//   songs: Song[];
//   loading: boolean;
//   error: string | null;
// }

// קריאת API להורדת קטגוריות

export const fetchCategories = createAsyncThunk<Category[]>(
  'songs/fetchCategories',
  async () => {
    const response = await axios.get(`${API_URL}/categories`); // שינוי ל-axios.get
    return response.data; // axios מחזיר את הנתונים בתוך response.data
  }
);

// קריאת API להורדת שירים לפי קטגוריה


// יצירת ה-slice
const songSlice = createSlice({
  name: 'songs',
  initialState: {
    categories: [] as category[],
    songs: [],
    loading: false,
    error: null as string | null ,
  } ,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action: PayloadAction<Category[]>) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to load categories';
      })
      
  },
});
export const selectCategories = (state: RootStore) => state.songs
export default songSlice.reducer;

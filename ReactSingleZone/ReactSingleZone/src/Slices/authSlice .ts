import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'; // הוספת axios
const storedUser = sessionStorage.getItem("user");
const storedToken = sessionStorage.getItem("token");
interface UserData {
  UserName: string;
  email: string;
  password: string;
  roleName: string;
}

interface LoginData {
  Id:number;
  UserName: string;
  password: string;
}


// const baseURL= import.meta.env.VITE_API_URL
// פעולה אסינכרונית לשליחת הנתונים לשרת (Register)
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData: UserData, { rejectWithValue }) => {  
    try {
      console.log("userData", userData);      
      const response = await axios.post(`https://singlezone-net.onrender.com/api/Auth/register`, userData, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
        sessionStorage.setItem("userRole", userData.roleName);
        console.log("userdata" ,userData.roleName);
             
      return response.data; // מחזיר את התשובה מהשרת
    } catch (error: any) {  
      console.log("hi");
      
      // טיפול בשגיאה במקרה של טעות בקישור או שגיאה אחרת
      return rejectWithValue(error.response?.data?.message || 'Registration failed');
    }
  }
);

// פעולה אסינכרונית לשליחת הנתונים לשרת (Login)
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (loginData: LoginData, { rejectWithValue }) => {  
    try {
      console.log("loginData", loginData);
     
      const response = await axios.post(`https://singlezone-net.onrender.com/api/Auth/login`, loginData, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
       
      return response.data; // מחזיר את התשובה מהשרת (ה-token)
    } catch (error: any) {  
      // טיפול בשגיאה במקרה של טעות בקישור או שגיאה אחרת
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

// יצירת ה-slice
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user:  storedUser ? JSON.parse(storedUser) : null,
    token: storedToken,
    isLoading: false,
    error: null as string | null, 
  },
  reducers: {},
  extraReducers: (builder) => {
    // עבור Register
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        
        state.token = action.payload.token;
        sessionStorage.setItem("user", JSON.stringify(action.payload.user));
        sessionStorage.setItem("token", action.payload.token);
    
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // עבור Login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.token;
        state.user= action.payload.user// לשמור את ה-token שהתקבל
        sessionStorage.setItem("user", JSON.stringify(action.payload.user));
        sessionStorage.setItem("token", action.payload.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default authSlice.reducer;

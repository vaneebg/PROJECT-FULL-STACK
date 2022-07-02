import authService from "./authService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};


export const register = createAsyncThunk("auth/register", async (user,thunkAPI) => {
  try {
    return await authService.register(user);
  } catch (error) {
    const message = error.response.data;
    return thunkAPI.rejectWithValue(message);
  }
});
export const login = createAsyncThunk("auth/login", async (user,thunkAPI) => {
  try {
  return await authService.login(user);
  } catch (error) {
    const message = error.response.data;
  return thunkAPI.rejectWithValue(message);
  }
  });
  export const logout = createAsyncThunk("auth/logout", async (thunkAPI) => {
    try {
      return await authService.logout();
    } catch (error) {
      const message = error.response.data;
      return thunkAPI.rejectWithValue(message);
    }
  });
  export const myInfo = createAsyncThunk("auth/miInfo", async (thunkAPI) => {

    try {
      return await authService.myInfo(user);
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  });



export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
   },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isSuccess = true;
        state.message = action.payload.message;
      })
      .addCase(login.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(logout.fulfilled, (state,action) => {
        console.log(action.payload)
        state.user = null;
        state.message =action.payload.message;
      })
      .addCase(register.fulfilled, (state, action) => {
        console.log(action.payload)
        state.isSuccess = true;
        state.message = action.payload.message;
      })
      .addCase(register.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(myInfo.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading=false;
      })
      .addCase(myInfo.pending, (state) => {
        state.isLoading = true;
      })
      
  },
})

 
export const { reset } = authSlice.actions;


export default authSlice.reducer;
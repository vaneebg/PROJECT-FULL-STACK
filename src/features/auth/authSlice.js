import authService from "./authService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  messageLogout:"",
  isLoading: false,
  message: "",
  users:[]
};


export const register = createAsyncThunk("auth/register", async (userReg,thunkAPI) => {
  try {
    return await authService.register(userReg);
  } catch (error) {
    console.error(error);
    const message = error.response.data;
    return thunkAPI.rejectWithValue(message);
  }
});
export const login = createAsyncThunk("auth/login", async (user,thunkAPI) => {
  try {
  return await authService.login(user);
  } catch (error) {
    console.error(error);
    const message = error.response.data;
  return thunkAPI.rejectWithValue(message);
  }
  });
  export const logout = createAsyncThunk("auth/logout", async (thunkAPI) => {
    try {
      console.log('2')
      return await authService.logout();
    } catch (error) {
      console.error(error);
      const message = error.response.data;
      return thunkAPI.rejectWithValue(message);
    }
  });
  export const myInfo = createAsyncThunk("auth/miInfo", async (thunkAPI) => {

    try {
      return await authService.myInfo(user);
    } catch (error) {
      console.error(error);
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  });
  export const allUsers = createAsyncThunk("auth/allUsers", async () => {
    try {
      return await authService.allUsers(user);
    } catch (error) {
      console.error(error);
    }
  });



export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.messageLogout="";
      state.isSuccess = false;
      state.isSuccessLogout=false;
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
        state.user = null;
        state.messageLogout =action.payload.message;
      })
      .addCase(register.fulfilled, (state, action) => {
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
      .addCase(allUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      
  },
})

 
export const { reset } = authSlice.actions;


export default authSlice.reducer;
import authService from "./authService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user ? user : null,
  userProfile: null,
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
  export const editUser = createAsyncThunk("auth/editUser", async (userDataEdit,thunkAPI) => {
    try {
      return await authService.editUser(userDataEdit);
    } catch (error) {
      console.error(error);
      const message = error.response.data;
      return thunkAPI.rejectWithValue(message);
    }
  });
  export const follow=createAsyncThunk("auth/follow", async(_id,thunkAPI)=>{
    try {
      return await authService.follow(_id);
    } catch (error) {
      console.error(error);
      const message = error.response.data;
      return thunkAPI.rejectWithValue(message);
    }
  });
  export const unfollow=createAsyncThunk("auth/unfollow", async(_id,thunkAPI)=>{
    try {
      return await authService.unfollow(_id);
    } catch (error) {
      console.error(error);
      const message = error.response.data;
      return thunkAPI.rejectWithValue(message);
    }
  });
  export const getUserById = createAsyncThunk("auth/getUserById", async (_id) => {
    try {
    return await authService.getUserById(_id);
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
      .addCase(editUser.fulfilled, (state, action) => {
        state.user=action.payload;
        state.isSuccess = true;
        state.message = action.payload.message;
      })
      
      .addCase(follow.fulfilled, (state, action) => {
        const users = state.users.map((user) => {
          if (user._id === action.payload.user._id) {
            user = action.payload.user;
          }
          return user;
        });
        state.users = users;
        state.isSuccess = true;
        state.message = action.payload.message;

      })
      .addCase(follow.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload.message;

      })
      .addCase(unfollow.fulfilled, (state, action) => {
        const users = state.users.map((user) => {
          if (user._id === action.payload.user._id) {
            user = action.payload.user;
          }
          return user;
        });
        state.users = users;
        state.isSuccess = true;
        state.message = action.payload.message;
        state.isSuccess = true;
        state.message = action.payload.message;
      })
      .addCase(unfollow.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload.message;

      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.userProfile = action.payload;
        state.isLoading=false;

        })
        .addCase(getUserById.pending, (state) => {
          state.isLoading = true;
        })
      
  },
})

 
export const { reset } = authSlice.actions;



export default authSlice.reducer;
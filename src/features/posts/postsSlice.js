import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import postsService from "./postsService";

const initialState = {
  posts: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const getAll = createAsyncThunk("posts/getAll", async () => {
  try {
    return await postsService.getAll();
  } catch (error) {
    console.error(error);
  }
});

export const like = createAsyncThunk("posts/like", async (_id,thunkAPI) => {
  try {
    return await postsService.like(_id);
  } catch (error) {
    console.error(error);
    const message = error.response.data;
    return thunkAPI.rejectWithValue(message);
  }
});

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAll.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.isSuccess = true;
      state.isLoading=false;
      state.message = action.payload.message;
      // console.log('aquiii',state.posts)

    })
      .addCase(getAll.pending, (state) => {
        state.isLoading = true;
      })
      
      .addCase(like.fulfilled, (state, action) => {
        const posts = state.posts.posts.map((post) => {
          if (post._id === action.payload._id) {
            post = action.payload;
          }
          return post;
        });
        state.posts.posts = posts;
      })
      .addCase(like.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
  },
});

export const { reset } = postsSlice.actions;

export default postsSlice.reducer;
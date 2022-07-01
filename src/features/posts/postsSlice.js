import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import postsService from "./postsService";

const initialState = {
  posts: [],
  post:{},
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

export const getPostById = createAsyncThunk("posts/getPostById", async (_id) => {
  try {
  return await postsService.getPostById(_id);
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
export const dislike = createAsyncThunk("posts/dislike", async (_id,thunkAPI) => {
  try {
    return await postsService.dislike(_id);
  } catch (error) {
    console.error(error);
    const message = error.response.data;
    return thunkAPI.rejectWithValue(message);
  }
});
export const addNewPost = createAsyncThunk("posts/addNewPost", async(post)=>{
  try {
    return await postsService.addNewPost(post)
  } catch (error) {
    console.error(error);
  }
})

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
      builder.addCase(getPostById.fulfilled, (state, action) => {
        state.post = action.payload;
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

      .addCase(dislike.fulfilled, (state, action) => {
        const posts = state.posts.posts.map((post) => {
          if (post._id === action.payload._id) {
            post = action.payload;
          }
          return post;
        });
        state.posts.posts = posts;
      })
      
      .addCase(dislike.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(addNewPost.fulfilled, (state, action) => {
        state.post = action.payload;
        state.isSuccess = true;
        state.isLoading=false;
  
      })
  },
});

export const { reset } = postsSlice.actions;

export default postsSlice.reducer;
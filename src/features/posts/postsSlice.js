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
  

export const like = createAsyncThunk("posts/like", async (_id) => {
  try {
    return await postsService.like(_id);
  } catch (error) {
    console.error(error);
 
  }
});
export const dislike = createAsyncThunk("posts/dislike", async (_id) => {
  try {
    return await postsService.dislike(_id);
  } catch (error) {
    console.error(error);
  
  }
});
export const addNewPost = createAsyncThunk("posts/addNewPost", async(post,thunkAPI)=>{
  try {
    return await postsService.addNewPost(post)
  } catch (error) {
    console.error(error);
    const message = error.response.data;
    return thunkAPI.rejectWithValue(message);

  }
})
export const editPost = createAsyncThunk("posts/editPost", async(post)=>{
  try {
    return await postsService.editPost(post)
  } catch (error) {
    console.error(error);
   

  }
})
export const getPostByName = createAsyncThunk("posts/getPostByName", async (postName) => {
  try {
  return await postsService.getPostByName(postName);
  } catch (error) {
  console.error(error);
  }
  });

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.message = "";

    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAll.fulfilled, (state, action) => {
      state.posts = action.payload;
    })
      .addCase(getAll.pending, (state) => {
        state.isLoading = true;
      })
      builder.addCase(getPostById.fulfilled, (state, action) => {
        state.post = action.payload;
        })
        
      .addCase(like.fulfilled, (state, action) => {
        const posts = state.posts.map((post) => {
          if (post._id === action.payload._id) {
            post = action.payload;
          }
          return post;
        });
        state.posts = posts;
      })

      .addCase(dislike.fulfilled, (state, action) => {
        const posts = state.posts.map((post) => {
          if (post._id === action.payload._id) {
            post = action.payload;
          }
          return post;
        });
        state.posts = posts;
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        state.posts =[action.payload,...state.posts]
      })
      .addCase(editPost.fulfilled, (state, action) => {
        state.post =action.payload
      })
      .addCase(getPostByName.fulfilled, (state, action) => {
        console.log(action.payload)
        state.posts = action.payload;
        });
    
  },
});

export const { reset } = postsSlice.actions;

export default postsSlice.reducer;
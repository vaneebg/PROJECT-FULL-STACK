import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import postsService from "./postsService";

const initialState = {
  posts: [],
  numberPosts:0,
  post:{},
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const getAll = createAsyncThunk("posts/getAll", async (page) => {
  try {
    return await postsService.getAll(page);
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
export const editPost = createAsyncThunk("posts/editPost", async(post,thunkAPI)=>{
  try {
    return await postsService.editPost(post)
  } catch (error) {
    console.error(error);
    const message = error.response.data;
    return thunkAPI.rejectWithValue(message);
   

  }
})
export const getPostByName = createAsyncThunk("posts/getPostByName", async (postName,thunkAPI) => {
  try {
  return await postsService.getPostByName(postName);
  } catch (error) {
    console.error(error);
    const message = error.response.data;
    return thunkAPI.rejectWithValue(message);

  }
  });
export const deletePost = createAsyncThunk("posts/deletePost", async (_id,thunkAPI) => {
    try {
    return await postsService.deletePost(_id);
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
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.message = "";

    },
    resetPost: (state) => {
     state.post={}

    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAll.fulfilled, (state, action) => {
      state.numberPosts=action.payload.numberPosts;
      state.isSuccess = true;
      state.posts = action.payload.posts;
      state.isLoading=false
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
        const post = action.payload;
        state.post = post;
      })
      

      .addCase(dislike.fulfilled, (state, action) => {
        const posts = state.posts.map((post) => {
          if (post._id === action.payload._id) {
            post = action.payload;
          }
          return post;
        });
        state.posts = posts;
        const post = action.payload;
        state.post = post;
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        state.numberPosts=action.payload.numberPosts;
        state.posts =[action.payload.postCreated[0],...state.posts]
        state.isSuccess = true;
        state.message = action.payload.message;
      })
      .addCase(editPost.fulfilled, (state, action) => {
        state.post =action.payload.post
        state.isSuccess = true;
        state.message = action.payload.message;
      })
      .addCase(editPost.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload.message;
      })
      .addCase(getPostByName.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.posts = action.payload;
        })
      .addCase(getPostByName.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
        state.posts=[]
          })
        
      .addCase(deletePost.fulfilled, (state,action) => {
        state.posts=state.posts.filter(post=>post._id!==action.payload.post._id)
        state.isSuccess = true;
          state.message = action.payload.message;
          })
      .addCase(deletePost.rejected, (state,action) => {
            state.isError = true;
            state.message = action.payload.message;
            })
          
      
    
  },
});

export const { reset,resetPost } = postsSlice.actions;

export default postsSlice.reducer;
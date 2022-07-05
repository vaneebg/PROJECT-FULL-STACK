import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import commentsService from "./commentsService";

const initialState = {
  comment:{},
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};



export const addNewComment = createAsyncThunk("comments/addNewComment", async(comment,thunkAPI)=>{
  try {
    return await commentsService.addNewComment(comment)
  } catch (error) {
    console.error(error);
    const message = error.response.data;
    return thunkAPI.rejectWithValue(message);
  }
})
export const likeComment = createAsyncThunk("comments/likeComment", async (_id) => {
  try {
    return await commentsService.likeComment(_id);
  } catch (error) {
    console.error(error);
 
  }
});
export const dislikeComment = createAsyncThunk("comments/dislikeComment", async (_id) => {
  try {
    return await commentsService.dislikeComment(_id);
  } catch (error) {
    console.error(error);
 
  }
});
export const editComment = createAsyncThunk("comments/editComment", async(comment,thunkAPI)=>{
  try {
    return await commentsService.editComment(comment)
  } catch (error) {
    console.error(error);
    const message = error.response.data;
    return thunkAPI.rejectWithValue(message);
  }
})
export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    resetC: (state) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.message = "";

    },
  },
  extraReducers: (builder) => {
        builder.addCase(addNewComment.fulfilled, (state, action) => {
        state.comment  = action.payload.comment;
        state.isSuccess = true;
        state.message = action.payload.message;
  
      })
      .addCase(addNewComment.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload.message;
      })
      .addCase(likeComment.fulfilled, (state, action) => {
        state.comment = action.payload;
      })
      .addCase(dislikeComment.fulfilled, (state, action) => {
        state.comment = action.payload;
      })
      .addCase(editComment.fulfilled,(state,action)=>{
        state.comment  = action.payload.comment;
        state.isSuccess = true;
        state.message = action.payload.message;

      })
      .addCase(editComment.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload.message;
      })
  },
});

export const { resetC } = commentsSlice.actions;

export default commentsSlice.reducer;
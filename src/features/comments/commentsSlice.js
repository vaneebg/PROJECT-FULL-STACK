import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import commentsService from "./commentsService";

const initialState = {
  comment:{},
};



export const addNewComment = createAsyncThunk("comments/addNewComment", async(comment)=>{
  try {
    return await commentsService.addNewComment(comment)
  } catch (error) {
    console.error(error);
  }
})

export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
        builder.addCase(addNewComment.fulfilled, (state, action) => {
        state.comment = action.payload;
  
      })
  },
});

export const { reset } = commentsSlice.actions;

export default commentsSlice.reducer;
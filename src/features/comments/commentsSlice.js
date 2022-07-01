import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import commentsService from "./commentsService";

const initialState = {
  comment:{},
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};



export const addNewComment = createAsyncThunk("comments/addNewComment", async(comment,_id)=>{
  try {
    return await commentsService.addNewComment(comment,_id)
  } catch (error) {
    console.error(error);
  }
})

export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
        builder.addCase(addNewComment.fulfilled, (state, action) => {
        state.comment = action.payload;
        state.isSuccess = true;
        state.isLoading=false;
  
      })
  },
});

export const { reset } = commentsSlice.actions;

export default commentsSlice.reducer;
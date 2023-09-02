import { createSlice } from "@reduxjs/toolkit";
import { fetchquizData, quizReducerName } from "../../";

const quizSlice = createSlice({
  name: quizReducerName,
  initialState: {
    loading: false,
    quiz: [],
    error: null,
  },
  extraReducers: {
    [fetchquizData.pending]: (state) => {
      state.loading = true;
    },
    [fetchquizData.fulfilled]: (state, action) => {
      state.loading = false;
      state.quiz = action.payload;
    },
    [fetchquizData.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
  },
});

export const { actions: quizActions, reducer: quizReducer} = quizSlice;

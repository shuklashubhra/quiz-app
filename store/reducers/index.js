import { combineReducers } from '@reduxjs/toolkit';
import { quizReducer } from '../slices';

export const rootReducer = combineReducers({
    // Add reducers here
    quiz: quizReducer,
});
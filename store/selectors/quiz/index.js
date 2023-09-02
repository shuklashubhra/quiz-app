import { createDraftSafeSelector } from '@reduxjs/toolkit';
import he from 'he';

import { quizReducerName } from '../../';

export const initialState = {};

// First select the relevant part from the state
const selectQuizDomain = (state) => state[quizReducerName] || initialState;

export const selectQuizTemplate = createDraftSafeSelector(
	[selectQuizDomain],
	(state) => state.quiz.results || [],
);

export const selectQuizData = createDraftSafeSelector(
	[selectQuizTemplate],
	(quizData) => quizData?.map((quizItem) => {
        // Concatenate the incorrect_answers and correct_answer arrays
        const concatAnswers = [...quizItem.incorrect_answers, quizItem.correct_answer];
        const decodedQuestion = he.decode(quizItem.question);
        const correctAnswerDecode = he.decode(quizItem.correct_answer);
        const answerOptions = concatAnswers.map((answer) => (
          he.decode(answer)
        ))
    
        return {
          ...quizItem,
          answerOptions,
          decodedQuestion,
          correctAnswerDecode,
        };
      }),
);

export const selectQuizLoading = createDraftSafeSelector(
	[selectQuizDomain],
	(state) => state.loading,
);

export const selectQuizError = createDraftSafeSelector(
	[selectQuizDomain],
	(state) => state.error,
);

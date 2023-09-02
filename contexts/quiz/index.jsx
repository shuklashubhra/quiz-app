import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectQuizData, selectQuizLoading, selectQuizTemplate, fetchquizData } from 'store';

// Create a context for your quiz-related states
const QuizContext = createContext();

// Create a custom hook to access the QuizContext
export const useQuizContext = () => {
  return useContext(QuizContext);
};

// Create a context provider component
export const QuizContextProvider = ({ children }) => {

  // Define your quiz-related states here
  const dispatch = useDispatch();
  const quizData = useSelector(selectQuizTemplate);
  const newQuizData = useSelector(selectQuizData);

  const [showResult, setShowResult] = useState(false);
  const [visited, setIsVisited] = useState(1);
  const [yourAnswer, setYourAnswer] = useState('')
  const [correctAnswer, setCorrectAnswer] = useState('')
  const [submittedAnswers, setSubmittedAnswers] = useState([])
  const [submittedQuestion, setSubmitteQuestion] = useState([])
  const [submittedCorrectAnswer, setSubmitteCorrectAnswer] = useState([{}])
  const [reportData, setReportData] = useState([{
    submittedAnswers:"",
    submittedQuestion:'',
    submittedCorrectAnswer:"",

  }])
  const [result, setResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });

  useEffect(() => {
    dispatch(fetchquizData())
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <QuizContext.Provider value={{submittedCorrectAnswer, setSubmitteCorrectAnswer, submittedQuestion, setSubmitteQuestion, reportData, setReportData, quizData, newQuizData, visited, setIsVisited, submittedAnswers, setSubmittedAnswers, correctAnswer, setCorrectAnswer, yourAnswer, setYourAnswer, showResult, setShowResult, result, setResult }}>
      {children}
    </QuizContext.Provider>
  );
};

export default QuizContext;

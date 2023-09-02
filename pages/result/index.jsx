import React from 'react'
import { useQuizContext } from 'contexts'

import styles from 'styles/Result.module.css'
import { ResultsNavbar } from 'components';

function Result() {
  const { quizData, newQuizData, result, submittedAnswers, } = useQuizContext()

  const quizDataMapped = quizData?.map((dataItem, index) => ({
    question: dataItem.question,
    correctAnswer: dataItem.correct_answer,
    userAnswer: submittedAnswers[index] || '', // Ensure there is a user answer for each question
  }));

  return (
    <div className={styles.bodyWrapper}>
      <ResultsNavbar 
        result={result || {}}
      />
      <div className={styles.questions}>
        {quizDataMapped.map((item, index) => (
          <div className={styles.reportWrapper} key={index}>
            <p className={styles.question}>{item.question}</p>
            <p className={styles.correctAnswer}>Correct answer: {item.correctAnswer}</p>
            <p className={styles.yourAnswer}>Your answer: {item.userAnswer}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Result
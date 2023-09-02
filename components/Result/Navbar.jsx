import React from "react"

import styles from 'styles/Result.module.css'

export const ResultsNavbar = ({
    result,
}) => {
    return <div className={styles.reportDetails}>
    <p className={styles.navDetail}>Correct answers :{result.correctAnswers}</p>
    <p className={styles.navDetail}>Wrong answers : {result.wrongAnswers}</p>
    <p className={styles.navDetail}>Total score :  {result.score}</p>
  </div>
}
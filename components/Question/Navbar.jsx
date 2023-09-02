import React from "react"

import { Timer } from "common";
import styles from 'styles/Home.module.css';

export const QuestionNavbar = ({
    visited,
    attemptedQuestions,
    unvisited,
    handleSubmit = () => {},
}) => {
    return <div className={styles.navbar}>
        <div className={styles.navDetail}>Questions visited: {visited}</div>
        <div className={styles.navDetail}>Questions attempted: {attemptedQuestions}</div>
        <div className={styles.navDetail}>Questions unvisited: {unvisited}</div>
        <button className={styles.submitButton} onClick={handleSubmit}>Submit</button>
        <div
            style={{
                width: '100px'
            }}
        >
            <Timer />
        </div>
    </div>
}
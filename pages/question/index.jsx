import he from 'he'
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';

import { useQuizContext } from 'contexts';

import { Loader} from 'common';
import { QuestionNavbar } from 'components';
import { selectQuizLoading } from 'store';
import styles from 'styles/Home.module.css';

export default function Questions() {
    const { newQuizData, visited, setIsVisited, submittedAnswers, setSubmittedAnswers, setCorrectAnswer, setYourAnswer, setResult, setReportData } = useQuizContext();

    const router = useRouter();
    const { name } = router.query;

    const loading = useSelector(selectQuizLoading);

    const [activeQuestion, setActiveQuestion] = useState(0);
    const [visitedIds, setVisitedIds] = useState([]);
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState("");
    const [attemptedQuestions, setAttemptedQuestions] = useState([]);
    const [selectedAnswers, setSelectedAnswers] = useState({});

    const { answerOptions = [], decodedQuestion, correctAnswerDecode, correct_answer } = newQuizData[activeQuestion] || {};

    const handleViewQuestion = (data, id) => {
        setSelectedAnswerIndex(null);
        setActiveQuestion(id);
        // Check if the ID has not been visited before
        if (!visitedIds.includes(id)) {
            // Update the active question and increment the visited count
            setVisitedIds((prevIds) => [...prevIds, id]);
            setIsVisited((prevCount) => prevCount + 1);

            // setVisitedOptions([]);
        }
    };

    const handleSubmit = useCallback(() => {
        router.push('/result')
    }, [router])

    const onAnswerSelected = (answer, idx) => {
        const decodedAnswer = he.decode(answer)
        if (!attemptedQuestions.includes(activeQuestion)) {
            setAttemptedQuestions((prevQuestions) => [
                ...prevQuestions,
                activeQuestion,
            ]);


            setReportData([{submittedAnswers:answer, submittedCorrectAnswer:correctAnswerDecode, submittedQuestion:decodedQuestion}])
        }
        setSelectedAnswers((prevSelectedAnswers) => ({
            ...prevSelectedAnswers,
            [activeQuestion]: answer,
        }));
        setSelectedAnswerIndex(idx);
        setYourAnswer(answer);
        setCorrectAnswer(correct_answer);
        setSubmittedAnswers([...submittedAnswers, decodedAnswer]);
        if (answer === correct_answer) {
            setSelectedAnswer(true);
        } else {
            setSelectedAnswer(false);
        }

        setResult((prev) =>
            selectedAnswer
                ? {
                    ...prev,
                    score: prev.score + 1,
                    correctAnswers: prev.correctAnswers + 1,

                }
                : {
                    ...prev,
                    wrongAnswers: prev.wrongAnswers + 1,
                }
        );

    };

    

    return loading ? <Loader /> : (
        <div className={styles.bodywrapper}>
            <h1 style={{padding: 16, paddingLeft: 40}}>Welcome {name}, Submit at your pace!</h1>
            <QuestionNavbar
                visited={visited}
                attemptedQuestions={attemptedQuestions.length}
                handleSubmit={handleSubmit}
                unvisited={newQuizData?.length - visited}
            />

            <div className={styles.mainContainer}>
                <div className={styles.questionSection}>
                    Questions
                    {newQuizData?.map((dataItem, index) => (
                        <div
                            key={index}
                            className={`${styles.questionWrapper} ${index === activeQuestion ? styles.activeQuestion : visitedIds.includes(index) ? styles.visitedQuestion : ''}`}
                            onClick={() => handleViewQuestion(dataItem, index)}
                        >
                            <span>{index + 1}</span> <p className={styles.question}>{dataItem.decodedQuestion}</p>
                        </div>
                    ))}
                </div>
                <div className={styles.fullQuestionView}>
                    <div className={styles.selectedWrapper}>
                        <div>{activeQuestion + 1}</div>
                        <div className={styles.selectedQuestion}>{decodedQuestion}</div>
                    </div>
                    {answerOptions?.map((answer, idx) => (
                        <p
                            className={
                                selectedAnswerIndex === idx ||
                                    selectedAnswers[activeQuestion] === answer
                                    ? styles.selectedOptions
                                    : styles.options
                            }
                            key={idx}
                            onClick={() => onAnswerSelected(answer, idx)}
                        >
                            {answer}
                        </p>
                    ))}
                </div>
            </div>

        </div>
    );
}

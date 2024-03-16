import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import mcqData from '../assets/data/multiple_choices.json';
import '../assets/MultipleChoiceQuestions.css';

function MultipleChoiceQuestions({ questionNumber, userSessionId, imageId }) {
    const navigate = useNavigate();
    const mcqItem = mcqData.find(item => item.id === imageId);
    const [timeLeft, setTimeLeft] = useState(25);
    const [startTime, setStartTime] = useState(Date.now());

    const handleNavigationAfterAnswer = useCallback(() => {
        const nextQuestionNumber = questionNumber + 1;
        if (nextQuestionNumber <= mcqData.length) {
            navigate(`/mcq/${nextQuestionNumber}`);
        } else {
            navigate('/thank-you');
        }
    }, [navigate, questionNumber]);

    const handleChoice = useCallback(async (choice, isTimeUp = false) => {
        const endTime = Date.now();
        const responseTime = isTimeUp ? 25 * 1000 : endTime - startTime; // If time is up, use full duration as response time

        const isCorrect = mcqItem && choice === mcqItem.correctAnswer;
        const questionText = mcqItem ? mcqItem.questionText : '';

        const answerData = {
            userSessionId,
            questionText,
            choice: isTimeUp ? 'Time Up' : choice,
            isCorrect,
            responseTime
        };

        try {
            const response = await fetch('https://3.141.170.82/api/submit-answer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(answerData),
            });

            if (response.ok) {
                console.log('Answer submitted successfully');
                // Navigate to the next question or show a completion message
                handleNavigationAfterAnswer();
            } else {
                throw new Error('Failed to submit answer');
            }
        } catch (error) {
            console.error("Error submitting answer:", error);
        } finally {
            if (isTimeUp) {
                // Ensure navigation occurs even if time is up
                handleNavigationAfterAnswer();
            }
        }
    }, [mcqItem, startTime, userSessionId, handleNavigationAfterAnswer]);

    useEffect(() => {
        // Reset the timer and start time for each new question
        setTimeLeft(25);
        setStartTime(Date.now());

        // Set up the timer
        const timer = setInterval(() => {
            setTimeLeft(prevTimeLeft => {
                const newTimeLeft = prevTimeLeft - 1;
                if (newTimeLeft === 0) {
                    clearInterval(timer); // Clear the timer when it reaches 0
                    handleChoice('Time Up', true); // Indicate time is up and submit data, pass true to indicate it's a time-up submission
                }
                return newTimeLeft; // Decrease the timer
            });
        }, 1000); // Run every second

        // Clean up
        return () => clearInterval(timer);
    }, [questionNumber, handleChoice]);


    return (
        <div className="mcq-container">
            <div className="mcq-timer">
                Time left: {timeLeft} seconds
            </div>
            <h2 className="mcq-question">Question {questionNumber}</h2>
            <p className="mcq-question-text">{mcqItem ? mcqItem.questionText : 'Loading question...'}</p>
            <div className="mcq-choices">
                {mcqItem && mcqItem.choices.map((choice, index) => (
                    <button key={index} className="mcq-choice" onClick={() => handleChoice(choice)}>
                        {choice}
                    </button>
                ))}
                <button className="mcq-skip" onClick={() => handleChoice('Skip')}>Skip</button>
            </div>
        </div>
    );
}

export default MultipleChoiceQuestions;

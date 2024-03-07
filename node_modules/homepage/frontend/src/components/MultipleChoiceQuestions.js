import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import mcqData from '../assets/data/multiple_choices.json';
import '../assets/MultipleChoiceQuestions.css';

function MultipleChoiceQuestions({ questionNumber, userSessionId }) {
    const navigate = useNavigate();
    const mcqItem = mcqData.find(item => item.id === questionNumber);
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

    useEffect(() => {
        // Reset the timer and start time for each new question
        setTimeLeft(25);
        setStartTime(Date.now());

        // Set up the timer
        const timer = setInterval(() => {
            setTimeLeft((prevTimeLeft) => {
                if (prevTimeLeft === 1) {
                    clearInterval(timer); // Clear the timer when it reaches 0
                    handleNavigationAfterAnswer();
                }
                return prevTimeLeft - 1; // Decrease the timer
            });
        }, 1000); // Run every second

        // Clean up
        return () => clearInterval(timer);
    }, [questionNumber, handleNavigationAfterAnswer]);


    const handleChoice = async (choice) => {
        const endTime = Date.now();
        const responseTime = endTime - startTime;

        // Compare the user's choice with the correct answer
        const isCorrect = mcqItem && choice === mcqItem.correctAnswer;

        const questionText = mcqItem ? mcqItem.questionText : '';

        // Prepare the data to be sent to the backend
        const answerData = {
            userSessionId,
            questionText,
            choice,
            isCorrect,
            responseTime
        };

        try {
            const response = await fetch('http://localhost:3000/submit-answer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(answerData),
            });

            if (response.ok) {
                console.log('Answer submitted successfully');

                // Navigate to the next question or show a completion message
                const nextQuestionNumber = questionNumber + 1;
                if (nextQuestionNumber <= mcqData.length) {
                    navigate(`/mcq/${nextQuestionNumber}`);
                } else {
                    // Navigate to the "thank you" page
                    navigate('/thank-you');
                }
            } else {
                throw new Error('Failed to submit answer');
            }
        } catch (error) {
            console.error("Error submitting answer:", error);
        }
    };

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

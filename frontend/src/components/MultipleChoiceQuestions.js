import React from 'react';
import { useNavigate } from 'react-router-dom';
import mcqData from '../assets/data/multiple_choices.json';
import '../assets/MultipleChoiceQuestions.css';

function MultipleChoiceQuestions({ questionNumber, userSessionId, submitAnswer }) {
    const navigate = useNavigate();
    const mcqItem = mcqData.find(item => item.id === questionNumber);

    const handleChoice = async (choice) => {
        // Compare the user's choice with the correct answer
        const isCorrect = mcqItem && choice === mcqItem.correctAnswer;

        // Prepare the data to be sent to the backend
        const answerData = {
            userSessionId,
            questionNumber,
            choice,
            isCorrect,
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
                    // Navigate to the demographic survey page or completion page
                    navigate('/demographic-survey');
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
            <h2 className="mcq-question">Question {questionNumber}</h2>
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
